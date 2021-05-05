import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';

import router from "@/router";
import store from "@/store";


import {
  applyPolyfills,
  defineCustomElements,
} from '@aws-amplify/ui-components/loader';

Amplify.configure(aws_exports);

Vue.config.productionTip = false


applyPolyfills().then(() => {
  defineCustomElements(window);
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
