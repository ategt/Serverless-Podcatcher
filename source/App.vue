<template>
  <div class="inner-app">
    <div v-if="podcastFeedsList.length | podcastErrorsList.length">
      <div v-for="(podcast, index) in podcastFeedsList"
                  v-bind:index="index"
                  v-bind:key="podcast.cast_url">
                  <podcast v-bind:channel="podcast"></podcast>
      </div>
    </div>
    <div class="nothing-yet" v-else>
      <p>Cool loading screen...</p>
    </div>
    <div class="regular-issue-panel">
      <div class="regular-issue-panel-spacer">
      </div>
      <div class="issue-list" v-if="podcastErrorsList.length">
        <div v-for="(problem, index) in podcastErrorsList"
            v-bind:index="index"
            v-bind:key="problem.id">
                <problem v-bind:issue="problem"></problem>
        </div>
      </div>
    </div>
    <div class="add-feed-panel">
      <div class="add-feed-form-spacer"></div>
      <add-podcast-feed-url></add-podcast-feed-url>
    </div>
  </div>
</template>
<script>
import AddPodcastFeedUrl from './components/AddPodcastFeedUrl.vue';
import Problem from './components/Problem.vue';
import Podcast from './components/Podcast.vue';

export default {
  name: 'app',
  components: {
    'add-podcast-feed-url': AddPodcastFeedUrl,
    'problem': Problem,
    'podcast': Podcast,
  },
};
</script>
<style src="./styles/index.css"></style>