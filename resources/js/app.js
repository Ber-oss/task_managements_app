import './bootstrap';
import {createApp} from 'vue'

import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import VueSweetalert2 from 'vue-sweetalert2';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia()

createApp(App)
.use(router)
.use(pinia)
.use(VueSweetalert2)
.use(Toast)
.mount("#wrapper")