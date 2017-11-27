<template lang="html">
  <div class="container">
    <appHeader/>
	  <div class="row">
      <div class="col-lg-12">
		    <div class="well well-lg">
          <div class="media1">
            <a class="pull-left" href="#">
            <img class="media-object img-circle" width="80px" src="http://icons.iconarchive.com/icons/sicons/basic-round-social/512/twitter-icon.png">
            </a>
            <div class="media-body">
              <div class="form-group" style="padding:12px;">
                <textarea class="form-control animated" v-model="Twitt.twit" v-on:keydown.enter="onSubmit" placeholder="Update your status"></textarea>
                <button class="btn btn-info pull-right" style="margin-top:10px" v-on:click="onSubmit" type="button">Share</button>
              </div>
            </div>
          </div>
        </div>
	    </div>
    </div>
    <appBody/>
  </div>
</template>

<script>

  import Header from '@/components/Header'
  import Body from '@/components/Body'

  export default {
    components:{
      appHeader : Header,
      appBody : Body
    },
    data(){
      return {
        Twitt: { twit:'' },
        Headers:{
          headers:{
            Authorization : localStorage.getItem('token'),
            contentType : "application/x-www-form-urlencoded"
          }
        }
      }
    },
    methods:{
      onSubmit(){
        this.$http.post('/twitter/post',this.Twitt, this.Headers)
        .then((response) => {
          location.reload()
          console.log('Succesfully add todo');
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
