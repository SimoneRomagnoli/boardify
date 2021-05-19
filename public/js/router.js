const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: "/", component: Home },
        { path: "/users", component: Users },
        { path: "/project", component: BoardForm },
        { path: "/404", component: NotFound },
        { path: "*", redirect: "/404" }
    ]
})