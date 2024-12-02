import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/spacelab/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/@popperjs/core/dist/umd/popper.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../node_modules/notivue/dist/core/animations.css';
import '../node_modules/notivue/dist/Notifications/notifications.css';


import {createApp} from 'vue';
import {createPinia} from 'pinia';

import App from './App.vue';
import router from './router';
import VueCookies from 'vue-cookies';


const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(VueCookies)


app.mount('#app')
