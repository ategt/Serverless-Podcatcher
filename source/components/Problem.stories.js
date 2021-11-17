import { action } from '@storybook/addon-actions';
import Problem from './Problem.vue';
import yeast from "yeast";

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    podcasts: {
      namespaced: true,
      state: {},
      getters: {},
      actions: {
        refresh ( _, url ) {
          console.log("refresh");
        },
        removePodcastURL ( _, url ) {
          console.log("Remove URL");
        },
      },
      mutations: {
        removeError ( _state, id ) {
          console.log("Remove Error");
        },
      },
    },
  },
  strict: debug,
  plugins: []
});

export default {
  title: 'Problem',
    //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  component: Problem,
  argTypes: {},
};

export const actionsData = {
  'podcasts-refresh': action("podcasts-refresh"),
  'podcasts-remove-url': action("podcasts-remove-url"),
  'podcasts-remove-error': action("podcasts-remove-error"),
};

const Template = args => ({
  components: { "problem": Problem, },
  store,
  data () {
      return { 
      	issue: args.issue,
        eventListeners: args.actionsData,
      };
  },
  mounted () {},
  //<button style="width:225px;font-size:xx-large;padding:0.5rem;border-radius:11px;" v-on:click="bill">Click Me</button>
  template: `<problem v-bind:issue=issue v-on="eventListeners"></problem>`,
});

export const SimpleError = Template.bind({});
SimpleError.args = {
  actionsData,
  issue: {
  	id: yeast(),
  	url: "http://www.com/some-feed-url",
  	error: {
  		message: "The Error Message Is Here.",
  	},
  },
};