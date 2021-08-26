import { createApp } from 'vue'
import App from './App.vue'
require('bulma');
import store from './store/index.js';
import router from './router.js'
import axios from 'axios';

const token = localStorage.getItem('user.token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}



const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
