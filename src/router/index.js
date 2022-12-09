import { createRouter, createWebHistory } from 'vue-router'
import HomeSection from '../views/HomeSection.vue'
import DetailList from '../views/DetailList.vue'
import SearchSection from "../views/SearchSection.vue"
import MyList from "../views/MyList.vue"

const routes = [
  {
    path: '/',
    name: 'HomeSection',
    // component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    component: HomeSection

  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailList,
    props:true
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchSection   
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: MyList   
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
