<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="panel panel-login">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-6">
                <a href="#" class="active" id="login-form-link">Login</a>
              </div>
              <div class="col-xs-6">
                <a href="#" id="register-form-link">Register</a>
              </div>
            </div>
            <hr>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-lg-12">
                <form id="login-form" v-on:submit.prevent="doLogin" role="form" style="display: block;">
                  <div class="form-group">
                    <input type="email" name="email" id="email" tabindex="1" class="form-control" v-model="login.email" placeholder="Email" required>
                  </div>
                  <div class="form-group">
                    <input type="password" name="password" id="password" tabindex="2" class="form-control" v-model="login.password" placeholder="Password" required>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-6 col-sm-offset-3">
                        <input type="submit" name="submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Login">
                      </div>
                    </div>
                  </div>
                </form>
                <form id="register-form" v-on:submit.prevent="doRegister" role="form" style="display: none;">
                  <div class="form-group">
                    <input type="email" name="email" id="email" tabindex="1" class="form-control" v-model="register.email" placeholder="email" required>
                  </div>
                  <div class="form-group">
                    <input type="password" name="password" id="password" tabindex="2" class="form-control" v-model="register.password" placeholder="Password">
                  </div>
                  <div class="form-group">
                    <input type="text" name="name" id="name" tabindex="1" class="form-control" v-model="register.name"placeholder="Name" required>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-6 col-sm-offset-3">
                        <input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now">
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
  import $ from 'jquery'

  export default {
    name: 'LoginRegister',
    data () {
      return {
        login: {
          email: '',
          password: ''
        },
        register: {
          email: '',
          password: '',
          name: ''
        }
      }
    },

    methods: {
      doLogin() {
        let self = this
        this.$http.post('/auth/login', this.login)
        .then((response) => {
          if(!response.data.token){
            this.$swal({
              title: 'Ooops',
              text: response.data,
              icon: 'error',
              button: 'OK'})
          }else{
            localStorage.setItem("token", response.data.token)
            this.$swal({
              icon: 'success',
              text: response.data.message,
              button: 'OK'
            }).then(() => {
              self.$router.push('/home')
              location.reload()
            })
          }
        }).catch((err) => {
          this.$swal(err);
        })

      },

      doRegister(){
        this.$http.post('/auth/register', this.register)
        .then((response) => {
          this.$swal({
            icon: 'success',
            text: response.data.message,
            button: 'OK!'
          })
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }

  // Jquery for login and register panel//
  $(function() {
    $('#login-form-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
      $("#register-form").delay(100).fadeIn(100);
      $("#login-form").fadeOut(100);
      $('#login-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });
  })

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
padding-top: 90px;
background-color: #DADADA;
}
.panel-login {
margin-top: 90px;
border-color: #ccc;
-webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
-moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
}
.panel-login>.panel-heading {
color: #00415d;
background-color: ##DADADA;
border-color: #fff;
text-align:center;
}
.panel-login>.panel-heading a{
text-decoration: none;
color: #666;
font-weight: bold;
font-size: 15px;
-webkit-transition: all 0.1s linear;
-moz-transition: all 0.1s linear;
transition: all 0.1s linear;
}
.panel-login>.panel-heading a.active{
color: #029f5b;
font-size: 18px;
}
.panel-login>.panel-heading hr{
margin-top: 10px;
margin-bottom: 0px;
clear: both;
border: 0;
height: 1px;
background-image: -webkit-linear-gradient(left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0));
background-image: -moz-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
background-image: -ms-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
background-image: -o-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
}
.panel-login input[type="text"],.panel-login input[type="email"],.panel-login input[type="password"] {
height: 45px;
border: 1px solid #ddd;
font-size: 16px;
-webkit-transition: all 0.1s linear;
-moz-transition: all 0.1s linear;
transition: all 0.1s linear;
}
.panel-login input:hover,
.panel-login input:focus {
outline:none;
-webkit-box-shadow: none;
-moz-box-shadow: none;
box-shadow: none;
border-color: #ccc;
}
.btn-login {
background-color: #59B2E0;
outline: none;
color: #fff;
font-size: 14px;
height: auto;
font-weight: normal;
padding: 14px 0;
text-transform: uppercase;
border-color: #59B2E6;
}
.btn-login:hover,
.btn-login:focus {
color: #fff;
background-color: #53A3CD;
border-color: #53A3CD;
}
.forgot-password {
text-decoration: underline;
color: #888;
}
.forgot-password:hover,
.forgot-password:focus {
text-decoration: underline;
color: #666;
}

.btn-register {
background-color: #1CB94E;
outline: none;
color: #fff;
font-size: 14px;
height: auto;
font-weight: normal;
padding: 14px 0;
text-transform: uppercase;
border-color: #1CB94A;
}
.btn-register:hover,
.btn-register:focus {
color: #fff;
background-color: #1CA347;
border-color: #1CA347;
}

</style>
