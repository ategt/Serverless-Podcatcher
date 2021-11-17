import { action } from '@storybook/addon-actions';
import Problem from './Problem.vue';
import yeast from "yeast";

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
  data () {
      return { 
      	issue: args.issue,
        eventListeners: args.actionsData,
      };
  },
  mounted () {},
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