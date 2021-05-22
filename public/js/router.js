const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: "/", component: Home },
        { path: "/board/:owner/:title", component: Board},
        { path: "/project", component: Project },
        { path: "/404", component: NotFound },
        { path: "*", redirect: "/404" }
    ]
})