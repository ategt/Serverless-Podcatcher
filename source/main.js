import Vue from 'vue';
import store from './store';
import App from './App.vue';

Vue.config.productionTip = false;

window.addEventListener("load", function (event) {
  new Vue({
    store,
    render: h => h(App)
  }).$mount('#app');
});