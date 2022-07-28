const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: '/home',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/home.vue'),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/user.vue')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('../views/mall/mall.vue')
      },
      {
        path: '/other/pageOne',
        name: 'page1',
        component: () => import('../views/other/pageOne.vue')
      },
      {
        path: '/other/pageTwo',
        name: 'page2',
        component: () => import('../views/other/pageTwo.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/login.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../views/upload/upload.vue')
  }
]
export default routes