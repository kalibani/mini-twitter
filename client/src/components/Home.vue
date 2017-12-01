<template lang="html">
  <div class="container">
    <appHeader :user="user"/>
	  <div class="row">
      <div class="col-lg-12">
		    <div class="well well-lg">
          <div class="media1">
            <a class="pull-left" href="#">
            <img class="media-object img-circle" width="80px" src="http://icons.iconarchive.com/icons/sicons/basic-round-social/512/twitter-icon.png">
            </a>
            <div class="media-body">
              <div class="form-group" style="padding:12px;">
                <textarea class="form-control animated" v-model="twitter.twit" v-on:keydown.enter="onSubmit" placeholder="Update your status"></textarea>
                <button class="btn btn-info pull-right" style="margin-top:10px" v-on:click="onSubmit" type="button">Share</button>
              </div>
            </div>
          </div>
        </div>
	    </div>
    </div>
    <appBody :twitss="twitss"/>
    <appTwitByMe :twitby="twitby"/>
  </div>
</template>

<script>

  import Header from '@/components/Header'
  import Body from '@/components/Body'
  import TwitByMe from '@/components/TwitByMe'
  export default {

    components:{
      appHeader : Header,
      appBody : Body,
      appTwitByMe: TwitByMe
    },

    data(){
      return {
        twitter: { twit:'' },
        datatwitss:[],
        user:[],
        profile:[],
        twitby:[],
        twitss:[]
      }
    },

    beforeMount(){
      this.getAllTwitt()
    },
    // this.findById()

    created(){
      this.getProfile()
    },

    methods:{
      getAllTwitt(){
        var self = this
        this.$http.get('/twitter/home').then((response) => {
          this.datatwitss = response.data
          for (var i = 0; i < this.datatwitss.length; i++) {
            if (this.datatwitss[i].posted_by._id == this.user._id) {
              this.twitby.push(this.datatwitss[i])
            }else {
              this.twitss.push(this.datatwitss[i])
            }
          }
        }).catch((err) => {
          console.log(err);
        })
      },

      getAll(){
        this.$http.get('/users/user').then((response) => {
          console.log('ininih', response.data);
          this.User = response.data
          }).catch((err) => {
          console.log(err);
        })
      },

      getProfile(){
        this.$http.get('/users/profile').then((response) => {
          this.user = response.data
        }).catch((err) => {
          console.log(err);
        })
      },

      onSubmit(){
        this.$http.post('/twitter/post',this.twitter)
        .then((response) => {
          location.reload()
          console.log('Succesfully add');
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }
</script>

<style lang="css">
  .animated {
    -webkit-transition: height 0.2s;
    -moz-transition: height 0.2s;
    transition: height 0.2s;
  }

</style>
