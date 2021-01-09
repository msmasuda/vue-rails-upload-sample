<template>
  <div>
    <el-dialog title="新規ビデオの登録" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="ビデオ名">
          <el-input v-model="name" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <label for="input-video">{{ isLoading ? '読み込み中...' : '動画を選択' }}</label>
        </el-form-item>
        <input id="input-video" ref="upload_file" type="file" accept="video/mp4,video/x-m4v" @change="handleFileSelect">
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel(); dialogFormVisible = false">キャンセル</el-button>
        <el-button type="primary" @click="handleCreate(name); dialogFormVisible = false">作成</el-button>
      </span>
      <video v-if="src" controls>
        <source :src="src" type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">
      </video>
      <div class="thumbnail-list">
        <transition-group name="fade">
          <img
            v-for="(thumbnail, index) in thumbnails"
            :key="'thumbnail' + index"
            class="thumbnail"
            :src="thumbnail"
            :class="{ active: index === selected }"
            @click="selected = index"
          >
        </transition-group>
      </div>
    </el-dialog>
    <el-dialog title="ビデオの表示" :visible.sync="dialogViewerVisible">
      <video-viewer :path="currentData.video" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogViewerVisible = false">閉じる</el-button>
      </span>
    </el-dialog>
    <el-row>
      <el-col class="column">
        <el-button class="add-btn" @click="reset(); dialogFormVisible = true">+</el-button>
      </el-col>
      <el-col v-for="(data) in document" :key="data.id" class="column">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <template v-if="!data.input_mode">
              <span>{{ data.name }}</span>
            </template>
            <template v-if="data.input_mode === 1">
              <el-input v-model="data.name" @blur="handleUpdate(data)" />
            </template>
            <el-button class="edit-btn" icon="el-icon-delete" @click="handleDelete(data.id)" />
            <el-button class="edit-btn" icon="el-icon-edit" @click="handleChangeMode(data.id)" />
          </div>
          <el-image style="width: 150px; height: 120px" :src="data.thumbnail" @click="handleViewer(data.id); dialogViewerVisible = true" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VideoViewer from './VideoViewer.vue'

export default {
  components: { VideoViewer },
  data() {
    return {
      dialogFormVisible: false,
      dialogViewerVisible: false,
      name: '',
      src: null,
      thumbnails: [],
      selected: 0,
      isLoading: false,
      file: null
    }
  },
  computed: {
    ...mapGetters({
      document: 'document/data',
      input_mode: 'document/input_mode',
      currentData: 'document/currentData'
    })
  },
  methods: {
    handleCreate(name) {
      this.$refs.upload_file.value = ''
      const formData = new FormData()
      formData.append('video', this.file)
      formData.append('thumb', this.toBlob(this.thumbnails[this.selected]))
      formData.append('name', name)
      this.$emit('handleCreate', formData)
    },
    handleUpdate(data) {
      this.$emit('handleUpdate', data)
    },
    handleChangeMode(id) {
      this.$emit('handleChangeMode', id)
    },
    handleDelete(id) {
      this.$emit('handleDelete', id)
    },
    handleViewer(id) {
      this.$emit('handleViewer', id)
    },
    handleCancel() {
      this.$refs.upload_file.value = ''
    },
    reset() {
      this.name = ''
      this.src = null
      this.thumbnails = []
      this.selected = 0
      this.file = null
    },
    handleFileSelect(event) {
      // reset data
      this.src = null
      this.thumbnails = []
      this.selected = 0
      // varidate file
      const file = event.target.files[0]
      if (!file || !file.type.match('video/*')) return
      this.file = file
      // read file
      const reader = new FileReader()
      reader.onload = (evt) => {
        this.src = evt.target.result
        this.createThumbnails(this.src)
        this.isLoading = false
      }
      reader.readAsDataURL(file)
      this.isLoading = true
    },
    createThumbnails(src) {
      const video = document.createElement('video')
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      // set canvas
      video.onloadeddata = () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        video.currentTime = 0
      }
      // capture thumbnail
      video.onseeked = () => {
        if (video.currentTime < video.duration) {
          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
          this.thumbnails.push(canvas.toDataURL('image/jpeg'))
          video.currentTime += Math.ceil(video.duration / 4)
        } else {
          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
          this.thumbnails.push(canvas.toDataURL('image/jpeg'))
        }
      }
      // set video source
      video.src = src
      video.load()
    },
    toBlob(base64) {
      // Base64からバイナリへ変換
      const bin = atob(base64.replace(/^.*,/, ''))
      const buffer = new Uint8Array(bin.length)
      for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i)
      }
      // Blobを作成
      const blob = new Blob([buffer.buffer], { type: 'image/jpeg' })
      return blob
    }
  }
}

</script>

<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before, .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .add-btn {
    width: 100%;
    height: 100%;
    font-size: 70px;
  }
  .column {
    width: 240px;
    height: 240px;
    margin-top: 10px;
    margin-left: 10px;
  }
  .box-card {
    width: 240px;
    height: 240px;
    font-size: 20px;
  }
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
  .edit-btn{
    float: right;
    padding: 3px 3px;
    margin: 3px;
    margin-top: 15px;
  }

  body {
    background: #20262E;
    padding: 20px;
    min-height: 540px;
  }
  #app {
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    transition: all 0.2s;
  }
  input {
    display: none;
  }
  label {
    display: block;
    cursor: pointer;
    width: 100%;
    padding: 10px;
    text-align: center;
    color: #ccc;
    border: 2px dashed #ccc;
    background: #eee;
    box-sizing: border-box;
    transition: all 0.2s ease-out;
    &:hover {
      background: #fafafa;
      padding: 20px 10px;
    }
  }
  video {
    display: block;
    max-width: 100%;
    margin: 10px auto;
  }
  .thumbnail-list {
    .thumbnail {
      width: 20%;
      height: 20%;
      box-sizing: border-box;
      border: 4px solid transparent;
      transition: all 0.2s;
      &.active {
        border: 4px solid #06c;
      }
      &:not(.active):hover {
        cursor: pointer;
        opacity: 0.5;
      }
    }
  }
  .fade-enter-active {
    transition: all 0.4s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
