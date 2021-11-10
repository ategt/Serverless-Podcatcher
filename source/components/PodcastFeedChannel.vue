<template>
  <div class="feed-panel">
    <div class="feed-image-panel">
      <img class="feed-image" v-bind:src="channel.image.url" >
    </div>
    <div>
      <div class="title" v-on:click="deleteClick()">{{ channel.title }}</div>
      <div class="description" v-html="channel.description"></div>
      <div class="media-panel">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "podcast-feed-channel",
  props: ['channel'],
  data () {
    return {
      maxHeight: this.contentHeight ? `${this.contentHeight}px` : "200px",
      contentHeight: -7,
      contentPane: null,
    };
  },
  methods: {
    panelViewInit (context) {
      context.contentPane = context.$el.getElementsByClassName("content-pane-id")[0];

      if (contentPane && context.contentHeight === -7) {
        contentPane.classList.remove("collapsed");
        context.contentHeight = contentPane.offsetHeight;
        contentPane.$el.classList.add("collapsed");
      }
    },
    deleteClick () {
      this.contentPane.style["max-height"] = this.contentHeight ? `${this.contentHeight}px` : "200px";
      const localFunction = this.panelViewInit;
      const contentPane = this.contentPane;
      const context = this;
      this.contentPane.addEventListener("transitionend", function(event) {
        if (event.target === contentPane) {
          localFunction(context);
        }
      });
    },
  },
  mounted () {
    this.panelViewInit(this);
  } 
};
</script>