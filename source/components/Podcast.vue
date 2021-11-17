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
          <expanding-info-field></expanding-info-field>
        </div>
      </div>
      <div class="description" v-html="channel.description"></div>
      <div class="media-panel" v-bind:class="{ 'feed-stale': channel.stale }">
        <podcast-feed-item 
                        v-for="(item, index) in channel.media"
                        v-bind:item="item"
                        v-bind:index="index"
                        v-bind:key="item.guid"
                        v-on:item-download="downloadItem"
                         ></podcast-feed-item>
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
      this.contentPane.style["max-height"] = this.contentHeight ? `${this.contentHeight}px` : "200px";
      const context = this;

      const overlay = document.getElementById('background-overlay');
      overlay.style.display = 'block';
      overlay.addEventListener("click", function(event) {
        overlay.style.display = 'none';
        Array.from(context.$children).filter(child => child.$vnode.tag.includes("expanding-info-field")).forEach(item => item.$vnode.componentInstance.hideDeletePane());
      });

      const localFunction = this.panelViewInit;
      const contentPane = this.contentPane;
      this.contentPane.addEventListener("transitionend", function(event) {
        if (event.target === contentPane) {
          localFunction(context);
        }
      });
    },
  },
};
</script>