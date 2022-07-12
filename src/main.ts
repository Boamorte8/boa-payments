import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import BaseButton from '@atoms/BaseButton.vue';
import BaseCard from '@atoms/BaseCard.vue';
import BaseDialog from '@molecules/BaseDialog.vue';
import BaseInput from '@molecules/BaseInput.vue';
import BaseLabel from '@atoms/BaseLabel.vue';
import BaseLoader from '@molecules/BaseLoader.vue';
import BaseSpinner from '@atoms/BaseSpinner.vue';
import EmptyImage from '@atoms/EmptyImage.vue';
import EmptyMessage from '@molecules/EmptyMessage.vue';
import ErrorMessage from '@molecules/ErrorMessage.vue';
import LogoutIcon from '@atoms/LogoutIcon.vue';
import OptionsIcon from '@atoms/OptionsIcon.vue';
import PlusIcon from '@atoms/PlusIcon.vue';
import TranslateIcon from '@atoms/TranslateIcon.vue';
import DropdownItem from '@atoms/DropdownItem.vue';
import FloatButton from '@atoms/FloatButton.vue';
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
app.component('BaseLoader', BaseLoader);
app.component('BaseSpinner', BaseSpinner);
app.component('EmptyImage', EmptyImage);
app.component('EmptyMessage', EmptyMessage);
app.component('ErrorMessage', ErrorMessage);
app.component('DropdownItem', DropdownItem);
app.component('FloatButton', FloatButton);
app.component('LogoutIcon', LogoutIcon);
app.component('OptionsIcon', OptionsIcon);
app.component('PlusIcon', PlusIcon);
app.component('TranslateIcon', TranslateIcon);

app.mount('#app');
