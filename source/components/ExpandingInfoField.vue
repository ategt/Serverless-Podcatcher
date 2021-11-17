<template>
  <div class="delete-confirm-container content collapsed content-pane-id popup">
    <div class="delete-confirm-content content-hidden hidden content-hidden-id">
      <div class="delete-confirm-container-text delete-confirm-container-result custom-hidden">
        Removal Succeded
      </div>
      <div class="delete-confirm-container-text hidable">
        Please confirm to perminently delete
      </div>
      <div class="delete-button-container delete-button-sub-container">
        <div class="confirm-delete-button hidable" v-on:click="confirmDelete">
          Confirm
        </div>
        <div class="cancel-delete-button hidable" v-on:click="hideDeletePane">
          Cancel
        </div>
      </div>
    </div>
  </div> 
</template>
<script>
export default {
  name: "expanding-info-field",
  props: ['channel'],
  methods: {
    panelViewInit (context) {
      if (context.contentPane === undefined) {
        context.contentPane = context.$el;
      }

      if (context.contentPane && context.contentHeight === undefined) {
        context.contentPane.classList.remove("collapsed");
        context.contentHeight = context.contentPane.offsetHeight;
        context.contentPane.classList.add("collapsed");
      }
    },
    hideDeletePane () {
      const overlay = document.getElementById('background-overlay');
      overlay.style.display = 'none';

      if (this.contentPane) {
        this.panelViewInit(this);
        this.contentPane.style["max-height"] = "0px";
      }
    },
    confirmDelete () {
      this.$emit("remove-podcast-url", this.$parent.channel.cast_url);

      let parentDiv = this.$el.parentElement;

      while (!parentDiv.classList.contains("feed-panel") && parentDiv !== parentDiv.parentElement) {
        parentDiv = parentDiv.parentElement;
      }

      if ( parentDiv.classList.contains("feed-panel") ) {
        parentDiv.parentElement.style["max-height"] = parentDiv.parentElement.offsetHeight ? `${parentDiv.parentElement.offsetHeight}px` : "200px";
        parentDiv.parentElement.style.transition = "max-height 3.0s linear 0.0s";
        parentDiv.parentElement.style.overflow = "hidden";
  
        setInterval(function(){
          parentDiv.parentElement.style["max-height"] = "0px";
        }, 10);
      }

      console.log(`Did the delete thing with ${this.$parent.channel.cast_url}.`);
      const context = this;
      Array.from(this.$el.getElementsByClassName("delete-confirm-container-result")).forEach(item => item.classList.remove("custom-hidden"));
      Array.from(this.$el.getElementsByClassName("hidable")).forEach(item => item.classList.add("custom-hidden"));
      setInterval(function(){
        context.hideDeletePane();
      }, 600);
    },
  },
  mounted () {
    this.panelViewInit(this);
  },
};
</script>
<style type="text/css" src="../styles/index.css"></style>