import '../source/styles/index.css';

import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

//👇 Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};