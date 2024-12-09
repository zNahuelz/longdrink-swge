import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import SidebarComponent from "@/components/shared/SidebarComponent.vue";
import TestPage from "@/components/shared/TestPage.vue";
import AddTeacherView from "@/views/admin/teacher_section/AddTeacherView.vue";
import TeacherListView from "@/views/admin/teacher_section/TeacherListView.vue";
import {useAuthStore} from "@/stores/auth.store.js";
import AddScheduleView from "@/views/admin/schedule_section/AddScheduleView.vue";
import ScheduleListView from "@/views/admin/schedule_section/ScheduleListView.vue";
import ResourcesListView from "@/views/admin/resources_section/ResourcesListView.vue";
import AddResourceView from "@/views/admin/resources_section/AddResourceView.vue";

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
                    component: TestPage,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'add-teacher',
                    name: 'add-teacher',
                    component: AddTeacherView,
                    meta: { requiresAuth: true },

                },
                {
                    path: 'teacher-list',
                    name: 'teacher-list',
                    component: TeacherListView,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'add-schedule',
                    name: 'add-schedule',
                    component: AddScheduleView,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'schedule-list',
                    name: 'schedule-list',
                    component: ScheduleListView,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'resources-list',
                    name: 'resources-list',
                    component: ResourcesListView,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'add-resource',
                    name: 'add-resource',
                    component: AddResourceView,
                    meta: { requiresAuth: true },
                }
            ]
        }
    ],
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const authenticated = authStore.authenticated;
    if(authenticated){
        if(to.name === 'login'){
            next({name: 'test'})
        }
        else{ next(); }
    }
    else{
        if(to.matched.some((record) => record.meta.requiresAuth)){
            next({name: 'login'})
        }
        else{ next(); }
    }
});

export default router
