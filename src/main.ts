import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import BaseButton from '@components/ui/BaseButton.vue';
import BaseCard from '@components/ui/BaseCard.vue';
import BaseDialog from '@components/ui/BaseDialog.vue';
import BaseSpinner from '@components/ui/BaseSpinner.vue';
import DropdownItem from '@components/ui/DropdownItem.vue';
import OptionsIcon from '@components/common/OptionsIcon.vue';
import TranslateIcon from '@components/common/TranslateIcon.vue';
import i18n from './i18n';
import router from './router';
import './styles/index.css';

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);

app.component('BaseButton', BaseButton);
app.component('BaseCard', BaseCard);
app.component('BaseDialog', BaseDialog);
app.component('BaseSpinner', BaseSpinner);
app.component('DropdownItem', DropdownItem);
app.component('OptionsIcon', OptionsIcon);
app.component('TranslateIcon', TranslateIcon);

app.mount('#app');
