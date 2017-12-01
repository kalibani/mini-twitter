<template lang="html">
  <div class="well well-lg">
    <ul v-for="twitt in twitss" :key="twitt._id">
      <li class="clearfix">
        <img style="float:left;"class="media-object img-circle" width="80px" :src="twitt.posted_by.image">
        <div class="legend-info" style="width: 90%;">
          <strong> {{ twitt.posted_by.name }}</strong>
          <p>{{ twitt.twit }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:['twitss']

  }
</script>

<style lang="css">
  @import "../assets/style.css";
</style>
