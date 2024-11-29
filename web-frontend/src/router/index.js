import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import SidebarComponent from "@/components/shared/SidebarComponent.vue";
import TestPage from "@/components/shared/TestPage.vue";
import AddTeacherView from "@/views/admin/teacher_section/AddTeacherView.vue";
import TeacherListView from "@/views/admin/teacher_section/TeacherListView.vue";

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
                },
                {
                    path: 'add-teacher',
                    name: 'add-teacher',
                    component: AddTeacherView
                },
                {
                    path: 'teacher-list',
                    name: 'teacher-list',
                    component: TeacherListView
                }
            ]
        }
    ],
})

export default router
