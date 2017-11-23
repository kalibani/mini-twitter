<template lang="html">
  <div class="well well-lg">
    <ul>
      <li class="clearfix"
      v-for="(val, key, index) in Twitss">
        <img style="float:left;"class="media-object img-circle" width="80px" src="https://8share-production-my.s3.amazonaws.com/campaigns/4898/photos/profile/thumb_copy.png?1397732185">
        <div class="legend-info" v-if="val.posted_by._id!==Users._id">
          <strong> {{ val.posted_by.email }}</strong>
          <p>Help share a cause and do good.</p>
        </div>
      </li>
      <br>
      <li class="clearfix" style="border-top: 1px solid #C0CAE3;">
        <br>
        <img style="float:right;" class="media-object img-circle" width="80px" src="https://8share-production-my.s3.amazonaws.com/campaigns/4898/photos/profile/thumb_copy.png?1397732185">
        <div class="legend-info" style="float:right;">
          <strong>Social Good</strong>
          <p>Help share a cause and do good</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        Twitss:[],
        Users:[]
      }
    },
    created(){
      this.getAllTwitt(),
      this.getProfile()
    },

    // computed: {
    //   filteredUsers() {
    //     var self = this
    //     for (var i = 0; i < self.Twitss.length; i++) {
    //       if (self.Users._id===self.Twitts[i]._id) {
    //
    //       }
    //     }
    //
    //   }
    // },

    methods:{
      getAllTwitt(){
        this.$http.get('/twitter/home',{
          headers:{
            Authorization : localStorage.getItem('token'),
            contentType : "application/x-www-form-urlencoded"
          }
        }).then((response) => {
          this.Twitss = response.data
          console.log(this.Twitss[0].posted_by._id);
        }).catch((err) => {
          console.log(err);
        })
      },
      getProfile(){
        this.$http.get('/users/profile',{
          headers:{
            Authorization : localStorage.getItem('token'),
            contentType : "application/x-www-form-urlencoded"
          }
        }).then((response) => {
          // console.log(response.data._id);
          this.Users = response.data
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }
</script>

<style lang="css">
  .well-lg {
  background: #f5f5f5;
  border: 1px solid #C0CAE3;
  margin-bottom: 20px;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  }

  .well-lg li {
  padding: 10px;
  overflow: hidden;
  }
  .well-lg li {
  list-style:none;
  }

  .clearfix {
  display: block;
  }
  .clearfix:after {
  content: " ";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
  overflow: hidden;
  }

  li {
  display: list-item;
  text-align: -webkit-match-parent;
  } ul {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  }
  ul {
  list-style: none;
  }

  .well-lg li em {
  display: block;
  height: 48px;
  width: 49px;
  float: left;
  }
  .well-lg li em.extra {
  background-position: -118px 0;
  }
  .well-lg li em.hot {
  background-position: -58px 0;
  }

  .well-lg li .legend-info {
  float: left;
  margin-left: 10px;
  width: 155px;
  }

  .well-lg strong {
  display: block;
  margin: 4px;
  }

  p {
    margin: 4px;
  }
  strong {
  font-weight: bold;
  }
</style>
