import {
  createRouter,
  createWebHistory
} from 'vue-router'

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

const routes = [{
    path: '/',
    name: 'index',
    component: () => import( /* webpackChunkName: "login" */ '../views/IndexView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "login" */ '../views/LoginView.vue'),
    requiresAuth: false
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( /* webpackChunkName: "login" */ '../views/RegisterView.vue'),
    requiresAuth: false
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.token) {
      next({
        path: '/login',
        params: {
          redirect: to.fullPath
        }
      })
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router
