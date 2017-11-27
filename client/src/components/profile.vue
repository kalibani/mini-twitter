<template>
  <div class="container" style="padding-top: 10px;">
    <appHeader/>
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
      <form class="form-horizontal" role="form">
        <div class="form-group">
          <label class="col-lg-3 control-label">Username:</label>
          <div class="col-lg-8">
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
            <input type="password" class="form-control" v-model="password" placeholder="re-type your password">
            <br>
            <button class="btn btn-primary" @click.prevent="editProfile(Profile._id)" style="float:right;">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

</template>

<script>
  import swal from 'sweetalert'
  import Header from '@/components/Header'
  export default {
    components:{
      appHeader : Header
    },
    data(){
      return {
        Profile:[],
        image:'',
        password:'',
        Headers:{
          headers:{
            Authorization : localStorage.getItem('token'),
            contentType : "application/x-www-form-urlencoded"
          }
        },
        on: {
          "click": function($event) {
            $event.preventDefault()
          }
        }
      }
    },

    created(){
      this.getProfile()
    },

    methods:{
      getProfile(){
        this.$http.get('/users/profile', this.Headers).then((response) => {
          this.Profile = response.data
          this.image = response.data.image
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

      editProfile(_id){
        if (this.password.length>0) {
          this.$http.put('/users/updateProfile/' +_id, {
            name: this.Profile.name,
            email: this.Profile.email,
            password: this.password
          }, this.Headers)
          .then((response) => {
            swal({
              title: 'success',
              text: response.data.message,
              icon: 'success',
              button: 'Ok'
            })
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          swal({
            title: 'Ooops',
            text: `password can't be empty`,
            icon: 'error',
            button: 'What!?'
          })
        }

      }
    }
  }
</script>

<style lang="css">
</style>
