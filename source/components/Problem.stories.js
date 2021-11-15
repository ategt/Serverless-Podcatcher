import Problem from './Problem.vue';
import yeast from "yeast";

export default {
  title: 'Problem',
  component: Problem,
};

// const Template = args => ({
//   components: { Problem, },
//   setup() {
//     return { args, };
//   },
//   template: '<Problem v-bind="args" />',
// });

const Template = args => ({
  components: { "problem": Problem, },
  data () {
      return {
          ...args,
      };
  },
  mounted () {},
  template: `<div class="border">
               <problem v-bind=args></problem>
             </div>`,
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