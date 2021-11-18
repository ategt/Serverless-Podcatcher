<template>
  <div class="add-url-form">
    <div class="add-url-form-subpanel">
      <div class="add-url-form-input-div">
        <input class="add-url-form-input" v-model="newFeedUrl" v-on:keydown="submitForm($event)" placeholder="Feed URL To Be Added"></input>
      </div>
      <div class="add-podcast-feed-button" v-on:click="addFeed">
        Add Podcast
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'add-podcast-feed-url',
  data () {
    return {
      newFeedUrl: '',
    };
  },
  methods: {
    addFeed () {
      this.$emit("add-podcast-url", this.newFeedUrl);
    },
    submitForm (event) {
      if (event.key === "Enter") {
        this.addFeed();
      }
    },
  },
};
</script>
<style src="../styles/index.css" scoped></style>
<style src="../styles/main.css" scoped></style>