import { result as remoteResult, imageB64, localResult as result } from '../feed_fixture';
import Podcast from './Podcast.vue';
import yeast from 'yeast';
import Vuex from 'vuex';

const store = new Vuex.Store({
  modules: {
    podcasts: {
      namespaced: true,
      actions: {
        download ( _, item ) {
          console.log( "Item Mock Downloading...", item );
        },
      },
    },
  },
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
  data () {
    return {
      channel: args.channel,
    };
  },
  template: `<podcast v-bind:channel="channel"></podcast>`,
});

export const EmptyMedia = Template.bind({});
EmptyMedia.args = {
 channel: Object.assign({}, result, {media: new Array(0)}),
};

export const OneMediaItem = Template.bind({});
OneMediaItem.args = {
 channel: Object.assign({}, result, {media: (new Array(1)).fill(result.media[0]).map(item => Object.assign({}, item, {guid: yeast()}))}),
};

export const RealWorld = Template.bind({});
RealWorld.args = {
 channel: result,
};

export const BigRealWorld = Template.bind({});
BigRealWorld.args = {
 channel: Object.assign({}, result, {media: (new Array(25)).fill(result.media[0]).map(item => Object.assign({}, item, {guid: yeast()}))}),
};

export const StaleRealWorld = Template.bind({});
StaleRealWorld.args = {
 channel: Object.assign({}, result, {stale: true}),
};

export const StaleBigRealWorld = Template.bind({});
StaleBigRealWorld.args = {
 channel: Object.assign({}, 
                        result, 
                        {media: (new Array(25)).fill(result.media[0]).map(item => Object.assign({}, item, {guid: yeast()}))}, 
                        {stale: true},
                        {info: "Loading..."}),
};

export const ErrorBigRealWorld = Template.bind({});
ErrorBigRealWorld.args = {
 channel: Object.assign({}, 
                        result, 
                        {media: (new Array(25)).fill(result.media[0]).map(item => Object.assign({}, item, {guid: yeast()}))}, 
                        {stale: true},
                        {info: "Error - See Details At Bottom"}),
};