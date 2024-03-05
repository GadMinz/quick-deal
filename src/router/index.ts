import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import TodosView from "@/views/TodosView.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "main",
            component: MainView,
        },
        {
            path: "/todos",
            name: "posts",
            component: TodosView,
        }
    ],
});

export default router;