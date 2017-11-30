<template lang="html">
  <div class="well well-lg">
    <div>
      <div v-for="val in Twitss">
        <ul>
          <li class="clearfix">
            <img style="float:left;"class="media-object img-circle" width="80px" :src="val.posted_by.image">
            <div class="legend-info" style="width: 90%;">
              <strong> {{ val.posted_by.name }}</strong>
              <p>{{ val.twit }}</p>
            </div>
          </li>
        </ul>
      </div>
      <br>
      <div  v-for="twit in TwitBy">
        <ul>
          <li class="clearfix">
            <img style="float:right;" class="media-object img-circle" width="80px" :src="twit.posted_by.image">
            <div class="legend-info" style="float:right;">
              <strong> {{ twit.posted_by.name }}</strong>
              <p style="width:90%;">{{ twit.twit }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        dataTwits:[],
        Users:[],
        TwitBy:[],
        Twitss:[]
      }
    },

    mounted(){
      this.getAllTwitt()
    },

    created(){
      this.getProfile()
    },

    methods:{
      getAllTwitt(){
        var self = this
        this.$http.get('/twitter/home').then((response) => {
          this.dataTwits = response.data
          for (var i = 0; i < this.dataTwits.length; i++) {
            if (this.dataTwits[i].posted_by._id == this.Users._id) {
              this.TwitBy.push(this.dataTwits[i])
            }else {
              this.Twitss.push(this.dataTwits[i])
            }
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      getProfile(){
        this.$http.get('/users/profile').then((response) => {
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
  }

  .well-lg strong {
  display: block;
  margin: 4px;
  }

  p {
    margin: 10px;
  }
  strong {
  font-weight: bold;
  }
</style>
