import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import BaseButton from '@atoms/BaseButton.vue';
import BaseCard from '@atoms/BaseCard.vue';
import BaseDialog from '@molecules/BaseDialog.vue';
import BaseInput from '@molecules/BaseInput.vue';
import BaseLabel from '@atoms/BaseLabel.vue';
import BaseSpinner from '@atoms/BaseSpinner.vue';
import LogoutIcon from '@atoms/LogoutIcon.vue';
import OptionsIcon from '@atoms/OptionsIcon.vue';
import TranslateIcon from '@atoms/TranslateIcon.vue';
import DropdownItem from '@atoms/DropdownItem.vue';
import FloatButton from '@components/ui/FloatButton.vue';
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
app.component('BaseInput', BaseInput);
app.component('BaseLabel', BaseLabel);
app.component('BaseSpinner', BaseSpinner);
app.component('DropdownItem', DropdownItem);
app.component('FloatButton', FloatButton);
app.component('LogoutIcon', LogoutIcon);
app.component('OptionsIcon', OptionsIcon);
app.component('TranslateIcon', TranslateIcon);

app.mount('#app');
