import { action } from '@storybook/addon-actions';
import PodcastFeedItem from './PodcastFeedItem.vue';

export default {
  title: 'Podcast Feed Item',
    //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  component: PodcastFeedItem,
  argTypes: {},
};

export const actionsData = {
  'item-download': action("item-download"),
};

const Template = args => ({
  components: { 
    "podcast-feed-item": PodcastFeedItem,
  },
  data () {
      return {
        item: args.item,
        eventListeners: args.actionsData,
      };
  },
  template: `<podcast-feed-item v-bind:item="item"></podcast-feed-item>`,
});

export const NoMedia = Template.bind({});
NoMedia.args = {
 actionsData,
 item: {
   title: "Title",
   description: "Description",
 },
};

export const WithMedia = Template.bind({});
WithMedia.args = {
 actionsData,
 item: {
   title: "Title",
   description: "Description",
   media: {
     url: "http://www.com/this-is-a-feed-url.xml",
   },
 },
};