import { action } from '@storybook/addon-actions';
import { result } from '../feed_fixture';
import Podcast from './Podcast.vue';

import Vue from 'vue';
import Vuex from 'vuex';
//import podcasts from '../store/modules/podcasts';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const mockDownload = function ( item ) {
  //action("this-working");
  console.log( "Item Mock Downloading...", item );
};

const store = new Vuex.Store({
  modules: {
    podcasts: {
      //...podcasts,
      namespaced: true,
      actions: {
        download ( _, item ) {
          this._vm.$emit( "mock-item-download", item );
          mockDownload( item );
        },
      },
    },
  },
  strict: debug,
  plugins: []
});

export default {
  title: 'Podcast/Feed Panel',
  component: Podcast,
};

const Template = args => ({
  components: { 
    "podcast": Podcast,
  },
  store,
  methods: {
    onMockItemDownload: action('mock-item-download'),
  },
  data () {
    return {
      channel: args.channel,
    };
  },
  template: `<podcast v-bind:channel="channel" v-on:mock-item-download="onMockItemDownload"></podcast>`,
});

export const RealWorld = Template.bind({});
RealWorld.args = {
 channel: result,
};

export const BigRealWorld = Template.bind({});
BigRealWorld.args = {
 channel: Object.assign({}, result, {media: (new Array(25)).fill(result.media[0])}),
};