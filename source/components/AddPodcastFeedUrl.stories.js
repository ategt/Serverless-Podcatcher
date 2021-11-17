import { action } from '@storybook/addon-actions';
import AddPodcastFeedUrl from './AddPodcastFeedUrl.vue';

export default {
  title: 'Add Podcast Feed URL',
    //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  component: AddPodcastFeedUrl,
  argTypes: {},
};

export const actionsData = {
  'add-podcast-url': action("add-podcast-url"),
};

const Template = args => ({
  components: { 
    "add-podcast-feed-url": AddPodcastFeedUrl,
  },
  data () {
      return {
        eventListeners: args.actionsData,
      };
  },
  template: `<add-podcast-feed-url v-on="eventListeners"></add-podcast-feed-url>`,
});

export const BaseForm = Template.bind({});
BaseForm.args = { actionsData };