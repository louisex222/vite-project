interface routerInter {
    path: string,
    name: string,
    component: any,
    children?: Array<routerInter>
}

const dynamicRouter: Array<routerInter> = [
    'home',
].map((name) => {
    return {
        path: name === 'home' ? '/' : `/${name}`,
        name: name,
        component: () => import(`@/views/${name}.vue`)
    }
})

const routes: Array<routerInter> = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/views/layout.vue'),
        children: dynamicRouter
    },
]
export default routes