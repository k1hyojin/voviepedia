import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import store from './store/store';



const myApp = createApp(App);
myApp.use(router);
myApp.use(store);
myApp.mount("#app")
myApp.config.globalProperties.$axios = axios;
