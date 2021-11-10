<template>
  <div class="item" v-on:click="downloadMedia">
    <div class="download-button-holder">
        <span class="download-symbol download-button" />
    </div>
    <div class="item-title">
      {{ item.title }}
    </div>
    <div class="item-description" v-html="item.description"></div>
    <div class="item-enclosure">
      <a class="download-link" v-if="item.media" v-bind:href="item.media.url">link</a>
      <a class="no-download-link" v-else>No Media</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "podcast-feed-item",
  props: ['item'],
  template: "",
    methods: {
      downloadMedia () {
        if (this.item.media) {
          this.$root.itemDownloader(this.item);
        } else {
          alert("No Media");
        }
      }
    }
};
</script>