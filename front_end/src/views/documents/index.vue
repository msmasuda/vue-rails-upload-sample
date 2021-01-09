<template>
  <div class="dashboard-editor-container">
    <cardlist
      @handleCreate="handleCreate"
      @handleUpdate="handleUpdate"
      @handleChangeMode="handleChangeMode"
      @handleDelete="handleDelete"
      @handleViewer="handleViewer"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cardlist from './components/CardList.vue'

export default {
  name: 'DocumentEditor',
  components: { Cardlist },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
      src: null
    }
  },
  computed: {
    ...mapGetters({
      document: 'document/data'
    })
  },
  mounted() {
    const project_id = this.$route.params.project_id
    this.$store.dispatch('document/getDocumentData', project_id)
  },
  methods: {
    handleCreate(data) {
      this.loading = true
      const project_id = this.$route.params.project_id
      data.append('project_id', project_id)
      this.$store.dispatch('document/createDocument', data)
        .then(() => {
          this.$router.push({ path: this.redirect || '/documents/' + project_id })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleUpdate(data) {
      this.loading = true
      const document = {
        project_id: this.$store.getters.project_id
      }
      this.$store.dispatch('document/updateDocument', data)
        .then(() => {
          this.$router.push({ path: this.redirect || '/documents/' + document.project_id })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleChangeMode(id) {
      this.$store.dispatch('document/changeInputMode', id)
    },
    handleDelete(id) {
      this.loading = true
      const document = {
        project_id: this.$store.getters.project_id
      }
      this.$store.dispatch('document/deleteDocument', id)
        .then(() => {
          this.$router.push({ path: this.redirect || '/documents/' + document.project_id })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleViewer(id) {
      this.$store.dispatch('document/getDocument', id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }

</style>
