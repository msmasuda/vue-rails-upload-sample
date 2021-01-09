<template>
  <div class="dashboard-editor-container">
    <cardlist
      @handleCreate="handleCreate"
      @handleUpdate="handleUpdate"
      @handleChangeMode="handleChangeMode"
      @handleDelete="handleDelete"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cardlist from './components/CardList.vue'

export default {
  name: 'DashboardEditor',
  components: { Cardlist },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted() {
    const user_id = this.$store.getters.userInfo.id
    this.$store.dispatch('project/getProjectData', user_id)
  },
  methods: {
    handleCreate(name) {
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      this.loading = true
      const data = {
        user_id: this.$store.getters.userInfo.id,
        name: name
      }
      this.$store.dispatch('project/createProject', data)
        .then(() => {
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    handleUpdate(data) {
      this.loading = true
      this.$store.dispatch('project/updateProject', data)
        .then(() => {
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleChangeMode(id) {
      this.$store.dispatch('project/changeInputMode', id)
    },
    handleDelete(id) {
      this.loading = true
      this.$store.dispatch('project/deleteProject', id)
        .then(() => {
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
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
