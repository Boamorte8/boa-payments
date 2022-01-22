import { createApp } from 'vue';

import { createPinia } from 'pinia';
import App from './App.vue'
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import i18n from './i18n';
import router from './router';
// import store, { key } from './store';
import './index.css'

const app = createApp(App);

app.use(i18n);
app.use(router);
// app.use(store, key);
app.use(createPinia());

app.component('BaseButton', BaseButton);
app.component('BaseCard', BaseCard);

app.mount('#app')
