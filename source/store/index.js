import Vue from 'vue';
import Vuex from 'vuex';
import podcasts from './modules/podcasts';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
  	podcasts,
  },
  strict: debug,
  plugins: []
});