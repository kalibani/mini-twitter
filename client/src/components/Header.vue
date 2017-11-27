<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link to="/home" class="navbar-brand glyphicon glyphicon-home"></router-link>
        </div>
        <div class="navbar-header">
          <router-link to="/profile" class="navbar-brand">{{ Profile.name }}</router-link>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <router-link to="/" class="navbar-brand">
              <span @click="doLogout">Log out</span>
            </router-link>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data(){
    return {
      Profile : []
    }
  },
  created(){
    this.getProfile()
  },
  methods:{
    getProfile(){
      this.$http.get('/users/profile', {
        headers:{
          Authorization : localStorage.getItem('token'),
          contentType : "application/x-www-form-urlencoded"
        }
      }).then((response) => {
        this.Profile = response.data
      }).catch((err) => {
        console.log(err);
      })
    },
    doLogout(){
      localStorage.removeItem("token")
      setTimeout(function(){
        location.reload()
      }, 100);
    }
  }
}
</script>

<style lang="css">
</style>
