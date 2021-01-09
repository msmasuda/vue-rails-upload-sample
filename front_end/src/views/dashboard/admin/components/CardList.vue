<template>
  <div>
    <el-row>
      <el-col class="column">
        <!-- <el-button class="add-btn" @click="handleCreate()">+</el-button> -->
        <el-button class="add-btn" @click="reset(); dialogFormVisible = true">+</el-button>
        <el-dialog title="新規プロジェクトの作成" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="プロジェクト名">
              <el-input v-model="name" autocomplete="off" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">キャンセル</el-button>
            <el-button type="primary" @click="handleCreate(name); dialogFormVisible = false">作成</el-button>
          </span>
        </el-dialog>
      </el-col>
      <el-col v-for="(data) in project" :key="data.id" class="column">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <template v-if="!data.input_mode">
              <span>{{ data.name }}</span>
            </template>
            <template v-if="data.input_mode === 1">
              <el-input v-model="data.name" @blur="handleUpdate(data)" />
            </template>
            <el-button class="edit-btn" icon="el-icon-edit" @click="handleChangeMode(data.id)" />
            <el-button class="edit-btn" icon="el-icon-delete" @click="handleDelete(data.id)" />
          </div>
          <div class="text item">
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleOpenDocuments(data.id)">動画一覧</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      dialogFormVisible: false,
      name: ''
    }
  },
  computed: {
    ...mapGetters({
      project: 'project/data',
      input_mode: 'project/input_mode'
    })
  },
  methods: {
    handleCreate(name) {
      this.$emit('handleCreate', name)
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
    handleOpenDocuments(project_id) {
      this.$router.push({ path: '/documents/' + project_id })
      // console.log(project_id)
    },
    reset() {
      this.name = ''
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
</style>
