import { action } from '@storybook/addon-actions';
import Problem from './Problem.vue';
import yeast from "yeast";

import Vue from 'vue';
import Vuex from 'vuex';
//import podcasts from './modules/podcasts';


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
          action("refresh");
          action("refreshed");
        },
      },
      mutations: {},
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
  argTypes: {
    onRefresh: {},
    onArchiveTask: {},
    onPinTask: {},
    onCase: {},
    handleClick: {
      action: "refresh",
    }
  },
  parameters: {
    actions: {
      handles: ['click', 'refresh'],
    },
  },
};

export const actionsData = {
  onPinTask: action('pin-task'),
  onArchiveTask: action('archive-task'),
  onRefresh: action('refresh'),
  refresh: action("refreshed"),
  onCase: action("case"),
};

const Template = args => ({
  components: { "problem": Problem, },
  store,
  data () {
      return { 
      	issue: args.issue,
      };
  },
  mounted () {},
  template: `<problem v-bind:issue=issue></problem>`,
});

export const SimpleError = Template.bind({});
SimpleError.args = {
  issue: {
  	id: yeast(),
  	url: "http://www.com/some-feed-url",
  	error: {
  		message: "The Error Message Is Here.",
  	},
  },
};