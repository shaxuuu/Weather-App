import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

// Style Prime Vue
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// Style Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';

// Własne style
import './assets/style.css';

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios)
app.use(PrimeVue);
app.use(ToastService);
app.mount('#app');
