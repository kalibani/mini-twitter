<template>
  <div class="container" style="padding-top: 10px;">
    <appHeader :user="user"/>
  <h1 class="page-header">My Profile</h1>
  <div class="row">
    <!-- left column -->
    <div class="col-md-4 col-sm-6 col-xs-12">
      <div class="text-center">
        <div v-if="!image">
          <h2>Select an image</h2>
          <input type="file" class="text-center center-block well well-sm" @change="onFileChange">
        </div>
        <div v-else>
          <img class="avatar img-circle img-thumbnail" alt="avatar" :src="image"/>
          <br><br>
          <input type="file" class="text-center center-block well well-sm" @change="onFileChange">
        </div>
      </div>
    </div>
    <!-- edit form column -->
    <div class="col-md-8 col-sm-6 col-xs-12 personal-info">
      <h3>Personal info</h3>
      <form class="form-horizontal"role="form">
        <div class="form-group">
          <label class="col-lg-3 control-label">Username:</label>
          <div class="col-lg-8">
            <input class="form-control" v-model="Profile._id" type="hidden">
            <input class="form-control" v-model="Profile.name" type="text">
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Email:</label>
          <div class="col-lg-8">
            <input type="email" class="form-control" v-model="Profile.email">
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Password:</label>
          <div class="col-lg-8">
            <input type="password" class="form-control" v-model="password">
            <br>
            <button class="btn btn-primary" @click.prevent="editProfile(Profile._id)" style="float:right;">Update</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

</template>

<script>
  import Header from '@/components/Header'
  import Vue from 'vue'
  export default {
    components:{
      appHeader : Header
    },
    data(){
      return {
        Profile:[],
        user:[],
        image:'',
        password:'',
        on: {
          "click": function($event) {
            $event.preventDefault()
          }
        }
      }
    },

    beforeMount(){
      this.getProfile(),
      this.getAll()
    },

    computed: {
      Profiles(){
        return this.Profile;
      }
    },

    methods:{
      getProfile(){
        this.$http.get('/users/profile').then((response) => {
          this.Profile = response.data
          this.image = response.data.image
        }).catch((err) => {
          console.log(err);
        })
      },


      findById(){
        var self = this
        console.log('ini data',self.twitby.name);
        this.$http.get('/users/profile/' +this.User._id)
        .then((response) => {
          console.log('-->',response.data);
          this.profile = response.data
          }).catch((err) => {
          console.log(err);
        })
      },

      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var self = this;

        reader.onload = (e) => {
          self.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },

      editProfile(){
        var self = this
        this.$http.put('/users/updateProfile/' +this.Profile._id, {
          name: this.Profile.name,
          email: this.Profile.email,
          password: this.password
        })
        .then((response) => {
          console.log(response.data)
          // Vue.set(self.$data, 'Profile', response.data)
          this.$swal({
            title: 'success',
            text: response.data.message,
            icon: 'success',
            button: 'OK'
          }).then(() => {
            self.$router.push('/home')
          })
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
  }
</script>

<style lang="css">
</style>
