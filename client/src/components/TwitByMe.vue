<template>
  <div class="well well-lg">
    <ul v-for="twitt in twitby" :key="twitt._id">
      <li class="clearfix">
        <img style="float:right;" class="media-object img-circle" width="80px" :src="twitt.posted_by.image">
        <div class="legend-info" style="float:right;">
          <strong> {{ twitt.posted_by.name }}</strong>
          <p style="width:90%;">{{ twitt.twit }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:['twitby']
}
</script>

<style lang="css">
  @import "../assets/style.css";
</style>
