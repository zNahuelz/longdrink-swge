import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import SidebarComponent from "@/components/shared/SidebarComponent.vue";
import TestPage from "@/components/shared/TestPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/a',
            component: SidebarComponent,
            children: [
                {
                    path: 'test',
                    name: 'test',
                    component: TestPage
                }
            ]
        }
    ],
})

export default router
