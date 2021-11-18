import '@storybook/addon-console';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//👇 Configures Storybook to log actions.
export const parameters = {
  actions: { argTypesRegex: '^[A-Za-z].*' },
};