import Problem from './Problem.vue';
import yeast from "yeast";

export default {
  title: 'Problem',
  component: Problem,
};

const Template = args => ({
  components: { "problem": Problem, },
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