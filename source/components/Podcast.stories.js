import { action } from '@storybook/addon-actions';
import { result } from '../feed_fixture';
import Podcast from './Podcast.vue';

export default {
  title: 'Podcast/Feed Panel',
    //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  component: Podcast,
  argTypes: {},
};

export const actionsData = {
  'item-download': action("item-download"),
};

const Template = args => ({
  components: { 
    "podcast": Podcast,
  },
  data () {
      return {
        channel: args.channel,
        eventListeners: args.actionsData,
      };
  },
  template: `<podcast v-bind:channel="channel"></podcast>`,
});

// export const BaseView = Template.bind({});
// BaseView.args = {
//  actionsData,
//  channel: {
//    title: "Title",
//    description: "Description",
//    image: {
//      url: "http://www.com/image.jpg",
//    },
//  },
// };

export const RealWorld = Template.bind({});
RealWorld.args = {
 actionsData,
 channel: result,
};

export const BigRealWorld = Template.bind({});
BigRealWorld.args = {
 actionsData,
 channel: Object.assign({}, result, {media: (new Array(25)).fill(result.media[0])}),
};