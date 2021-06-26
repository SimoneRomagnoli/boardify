const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: "/", component: Home },
        { path: "/settings", component: Settings},
        { path: "/about", component: About},
        { path: "/notifications", component: Notifications},
        { path: "/board/:owner/:title", component: Board},
        { path: "/project", component: Project },
        { path: "/404", component: NotFound },
        { path: "*", redirect: "/404" }
    ]
})