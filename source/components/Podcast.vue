<template>
  <div class="feed-panel">
    <div class="feed-image-panel">
      <div class="feed-image-container" v-if="channel.image">
        <img class="feed-image" v-bind:src="channel.image.url" ></img>
      </div>
      <div class="feed-info-container">
        <div v-if="channel.info">
          {{ channel.info }}
        </div>
      </div>
    </div>
    <div>
      <div class="title-bar">
        <div class="title-correcting-div"></div>
        <div class="title">{{ channel.title }}</div>
        <div class="button-correcting-div">
          <span class="delete-button" v-on:click="deleteClick">X</span>
          <expanding-info-field v-bind:show="confirmDelete" v-bind:channel="channel"></expanding-info-field>
        </div>
      </div>
      <div class="description" v-html="channel.description"></div>
      <div class="media-panel" v-bind:class="{ 'feed-stale': channel.stale }" v-if="channel.media.length">
        <podcast-feed-item 
                        v-for="(item, index) in channel.media"
                        v-bind:item="item"
                        v-bind:index="index"
                        v-bind:key="item.guid"
                        v-on:item-download="downloadItem"
                         ></podcast-feed-item>
      </div>
      <div class="media-panel media-panel-empty" v-bind:class="{ 'feed-stale': channel.stale }" v-else>
        <span>- No Media -</span>
      </div>
    </div>
  </div>
</template>
<script>
import ExpandingInfoField from './ExpandingInfoField.vue';
import PodcastFeedItem from './PodcastFeedItem.vue';

export default {
  name: "podcast",
  components: {
    'expanding-info-field': ExpandingInfoField,
    'podcast-feed-item': PodcastFeedItem,
  },
  props: ['channel'],
  data () {
    return {
      contentHeight: undefined,
      confirmDelete: false,
      //maxHeight: this.contentHeight ? `${this.contentHeight}px` : "200px",
      //contentPane: this.$el,
    };
  },
  mounted () {
    this.panelViewInit(this);
  },
  methods: {
    downloadItem ( item ) {
      this.$store.dispatch("podcasts/download", item);
    },
    panelViewInit (context) {
      context.contentPane = context.$el.getElementsByClassName("content-pane-id")[0];

      if (context.contentPane && context.contentHeight === undefined) {
        context.contentPane.classList.remove("collapsed");
        context.contentHeight = context.contentPane.offsetHeight;
        context.contentPane.classList.add("collapsed");
      }
    },
    deleteClick () {
      this.confirmDelete = true;
    },
  },
};
</script>
<style src="../styles/index.css" scoped></style>
<style src="../styles/main.css" scoped></style>