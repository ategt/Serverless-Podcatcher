<template>
  <div class="issue-pane">
    <div class="issue-panel-retry-wrapper" v-on:click="refreshFeed">
      <div class="issue-panel" >
        <div class="issue-main">
          <span class="issue-explain">
            <span class="issue-text">Could not load </span>
            <span class="issue-url">{{ issue.url }}</span>
          </span>
        </div>
        <div class="issue-info">
          <div class="issue-refresh issue-info-item">
            Click to Retry
          </div>
          <div class="issue-message issue-info-item">
            {{ issue.error.message }} 
          </div>
        </div>
      </div>
    </div>
    <div class="issue-panel-remove-wrapper" v-on:click="removeFeed">
      <div class="issue-panel-remove-top">
      </div>
      <div class="issue-panel-remove-content">
        <span class="remove-feed-button issue-remove-feed-button">X</span>
      </div>
      <div class="issue-panel-remove-bottom">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "problem",
  props: ['issue'],
  methods: {
    refreshFeed () {
      this.$root.feedRefresher(this.issue.url);
    },
    removeFeed () {
      this.$root.removePodcastURL(this.issue.url);
      this.$root.podcastErrorsList = this.$root.podcastErrorsList.filter((item) => item.id !== this.issue.id);
    },
  },
};
</script>