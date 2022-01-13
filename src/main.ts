import { createApp } from 'vue';

import App from './App.vue'
import BaseCard from './components/ui/BaseCard.vue';
import i18n from './i18n';
import router from './router';
import { key, store } from './store';
import './index.css'

const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(store, key);

app.component('BaseCard', BaseCard);

app.mount('#app')
