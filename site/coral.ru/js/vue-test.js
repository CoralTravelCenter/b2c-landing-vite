import {createApp} from 'vue';
import App from '../js/vue/App.vue';
import {hostReactAppReady} from "../../common/js/usefuls.js";


(async () => {
  await hostReactAppReady()
  const app = createApp(App);
  app.mount('#vue-app');
})()
