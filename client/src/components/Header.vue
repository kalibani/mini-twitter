<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link to="/home" class="navbar-brand glyphicon glyphicon-home"></router-link>
        </div>
        <div class="navbar-header">
          <router-link :to="{ name: 'profile', params: { id: user._id} }" class="navbar-brand glyphicon glyphicon-user">
          </router-link>
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
    props: ['user'],
    methods:{
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
