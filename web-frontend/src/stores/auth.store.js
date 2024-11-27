import {defineStore} from "pinia";
import {jwtDecode} from 'jwt-decode'
import axios from "axios";
import router from "@/router";
import VueCookies from 'vue-cookies';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const expiredToken = (token) => {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const currentDate = Date.now() / 1000;
    return decodedToken.exp < currentDate;
};

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: VueCookies.get('USER_TOKEN') || null,
    }),
    getters: {
        authenticated: (state) => !!state.token && !expiredToken(state.token),
    },
    actions: {
        async login(username, password, rememberUser) {
            try {
                let email = username
                const response = await axios.post(`${BASE_URL}/auth/login`, {
                    email, password
                });
                const token = response.data.auth.token;
                VueCookies.set('USER_TOKEN', token, rememberUser ? '1d' : '');
                this.token = token;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },

        signOut() {
            VueCookies.remove('USER_TOKEN');
            this.token = null;
            router.push({name: 'login'});
        },

        verifyToken(token) {
            if (!this.token || expiredToken(this.token)) {
                this.signOut();
            }
        },
    }
});