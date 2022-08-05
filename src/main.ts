import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import BaseButton from '@atoms/BaseButton.vue';
import BaseCalendar from '@molecules/BaseCalendar.vue';
import BaseCard from '@atoms/BaseCard.vue';
import BaseDialog from '@molecules/BaseDialog.vue';
import BaseInput from '@molecules/BaseInput.vue';
import BaseLabel from '@atoms/BaseLabel.vue';
import BaseLoader from '@molecules/BaseLoader.vue';
import BaseSelect from '@molecules/BaseSelect.vue';
import BaseSpinner from '@atoms/BaseSpinner.vue';
import BaseToggleVue from '@molecules/BaseToggle.vue';
import CashIcon from '@atoms/CashIcon.vue';
import CheckIcon from '@atoms/CheckIcon.vue';
import CurrencyInput from '@molecules/CurrencyInput.vue';
import DisplayInfo from '@molecules/DisplayInfo.vue';
import DropdownItem from '@atoms/DropdownItem.vue';
import EmptyImage from '@atoms/EmptyImage.vue';
import EmptyMessage from '@molecules/EmptyMessage.vue';
import ErrorMessage from '@molecules/ErrorMessage.vue';
import FloatButton from '@atoms/FloatButton.vue';
import InfoIcon from '@atoms/InfoIcon.vue';
import LibraryIcon from '@atoms/LibraryIcon.vue';
import LogoutIcon from '@atoms/LogoutIcon.vue';
import OptionsIcon from '@atoms/OptionsIcon.vue';
import PaymentCard from '@organisms/PaymentCard.vue';
import PillList from '@molecules/PillList.vue';
import PlusIcon from '@atoms/PlusIcon.vue';
import SelectIcon from '@atoms/SelectIcon.vue';
import SettingsIcon from '@atoms/SettingsIcon.vue';
import TranslateIcon from '@atoms/TranslateIcon.vue';
import UserIcon from '@atoms/UserIcon.vue';
import WarningIcon from '@atoms/WarningIcon.vue';
import i18n from './i18n';
import router from './router';
import './styles/index.css';
// import { registerSW } from 'virtual:pwa-register';

// const updateSW = registerSW({
//   onRegisterError(error) {
//     console.log('registerSW - onRegisterError', error);
//   },
// });
const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);

app.component('BaseButton', BaseButton);
app.component('BaseCard', BaseCard);
app.component('BaseCalendar', BaseCalendar);
app.component('BaseDialog', BaseDialog);
app.component('BaseInput', BaseInput);
app.component('BaseLabel', BaseLabel);
app.component('BaseLoader', BaseLoader);
app.component('BaseSelect', BaseSelect);
app.component('BaseSpinner', BaseSpinner);
app.component('BaseToggle', BaseToggleVue);
app.component('CashIcon', CashIcon);
app.component('CheckIcon', CheckIcon);
app.component('CurrencyInput', CurrencyInput);
app.component('DisplayInfo', DisplayInfo);
app.component('DropdownItem', DropdownItem);
app.component('EmptyImage', EmptyImage);
app.component('EmptyMessage', EmptyMessage);
app.component('ErrorMessage', ErrorMessage);
app.component('FloatButton', FloatButton);
app.component('InfoIcon', InfoIcon);
app.component('LibraryIcon', LibraryIcon);
app.component('LogoutIcon', LogoutIcon);
app.component('OptionsIcon', OptionsIcon);
app.component('PaymentCard', PaymentCard);
app.component('PillList', PillList);
app.component('PlusIcon', PlusIcon);
app.component('SelectIcon', SelectIcon);
app.component('SettingsIcon', SettingsIcon);
app.component('TranslateIcon', TranslateIcon);
app.component('UserIcon', UserIcon);
app.component('WarningIcon', WarningIcon);

app.mount('#app');
