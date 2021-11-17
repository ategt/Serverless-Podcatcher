import { action } from '@storybook/addon-actions';
import PodcastFeedChannel from './PodcastFeedChannel.vue';

export default {
  title: 'Podcast Feed Channel',
    //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  component: PodcastFeedChannel,
  argTypes: {},
};

export const actionsData = {
  'item-download': action("item-download"),
};

const Template = args => ({
  components: { 
    "podcast-feed-channel": PodcastFeedChannel,
  },
  data () {
      return {
        channel: args.channel,
        eventListeners: args.actionsData,
      };
  },
  template: `<podcast-feed-channel v-bind:channel="channel"></podcast-feed-channel>`,
});

export const TextDescription = Template.bind({});
TextDescription.args = {
 actionsData,
 channel: {
   title: "Title",
   description: "Description",
   image: {
     url: "http://www.com/image.jpg",
   },
 },
};

export const WithHtml = Template.bind({});
WithHtml.args = {
 actionsData,
 channel: {
   title: "Title",
   description: "<h1>Description</h1>",
   image: {
     url: "http://www.com/image.jpg",
   },
 },
};