import { createApp } from 'vue';

import App from './App.vue'
import BaseCard from './components/ui/BaseCard.vue';
import router from './router';
import './index.css'

const app = createApp(App);

app.use(router);

app.component('BaseCard', BaseCard);

app.mount('#app')
