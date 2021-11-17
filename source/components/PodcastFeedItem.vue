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
  methods: {
    downloadMedia () {
      if (this.item.media) {
        this.$emit("item-download", this.item);
      } else {
        alert("No Media");
      }
    },
  },
};
</script>
<style scoped>
.feed-image {
    width: 50px;
}
.feed-panel {
    display: flex;
    margin: 10px;
}
.feed-image-panel {
    display: flow-root;
}
.feed-image {
    width: 71px;
    align-content: center;
    align-self: center;
    padding: 10px;
    display: block;
}
.title {
    text-align: center;
    text-decoration: underline;
    font-size: x-large;
}
.description {
    padding: 3px;
}
.item {
    border: 1px gray solid;
    max-width: 15%;
    padding: 5px;
    display: block;
    margin: 5px;

    min-width: 10em;
    display: inline-grid;
    height: fit-content;
}
.item-description {
    height: 9.6em;
    overflow: hidden;
    margin: 5px 0px;
}
.item-enclosure {
    text-align-last: center;
    border: 1px lightgray solid;
    background-color: lightgrey;
}
.item-title {
    height: 2.3em;
    overflow: hidden;
}
.media-panel {
    display: flow-root;
    height: 26em;
    padding: 2px;
    overflow: overlay;
}
a {
    display: block;
    color: black;
    border: 1px darkgrey solid;
}
.issue-text {
  color: darkred;
  font-family: auto;
  font-weight: bold;
}
.issue-url {
  font-style: italic;
}
.issue-pane {
  border: 1px grey solid;
  padding: 2px;
  overflow: hidden;
  margin: 2px;
  display: flex;
}
.issue-panel {
  width: fit-content;
  text-align: center;
}
.issue-message {
  color: dimgrey;
  font-family: auto;
}
.issue-refresh {
  color: brown;
  font-family: inherit;
  font-weight: bold;
}
.issue-info {
  display: flex;
}
.issue-info-item {
  padding: 2px;
}
.issue-main {
  display: flex;
}
.issue-panel-remove-wrapper {
  width: 5em;
  background-color: aquamarine;
  text-align: center;
  vertical-align: middle;
}
.issue-panel-retry-wrapper {
  display: flex;
  width: -webkit-fill-available;
  cursor: pointer;
}
.issue-remove-feed-button {
  cursor: default; 
}
.issue-panel-remove-top {
  height: 0.15em;
}
.issue-panel-remove-content {
  display: block;
  font-size: xx-large;
}
.add-url-form {
  width: 100%;
  display: block;
  align-items: center;
  text-align: center;
  align-content: center;
}
.add-feed-panel {
  text-align: center;
  margin: 1.5em;
  display: flex;
  /*margin: 10px;*/
}
.add-url-form-input {
  border-radius: 3px;
  outline: none;
  border: 3px solid darkgrey;
  background-color: aliceblue;
  padding: 0.2em 0.5em;
  width: inherit;
  border-radius: 9px;
  height: inherit;
}
.add-podcast-feed-button {
  background-color: lightgrey;
  padding: 0.2em 2.5em;
  margin: 0em 1.5em;
  width: 11em;
  color: #646c73;
  border-radius: 9px;
  border: 1px solid #646c73;
}
.add-url-form-input-div {
  width: -webkit-fill-available;
  height: inherit;
}
.add-url-form-subpanel {
  display: flex;
  margin: 10px;
}
.feed-info-container {
  font-size: smaller;
  width: 71px;
  align-content: center;
  align-self: center;
  padding: 10px;
  display: block;
}
.feed-image-container {
}
.feed-stale {
  background-color: darkgrey;
}
.add-feed-form-spacer {
  width: 71px;
  padding: 10px;
  display: block;
}
.regular-issue-panel {
  text-align: center;
  margin: 1.5em;
  display: flex;
}
.regular-issue-panel-spacer {
  width: 71px;
  padding: 10px;
  display: block;
}
.issue-list {
  width: 100%;
}
</style>