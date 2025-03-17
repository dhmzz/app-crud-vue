import { createRouter, createWebHistory } from "vue-router";
import Sidebar from "@/layouts/Sidebar.vue"
import Dashboard from "@/pages/Dashboard/Overview.vue";
import Menu from "@/pages/Master/Menu.vue";

const routes = [
    { 
        path: "/",
        component: Sidebar,
        redirect: "/master-menu",
        children: [
            {
                path: "dashboard", 
                component: Dashboard,
                name: 'Dashboard'
            },
            {
                path: "master-menu", 
                component: Menu,
                name: 'Master-Menu'
            }
        ]
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
