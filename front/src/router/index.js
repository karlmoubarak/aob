import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home'
import Resources from '../views/Resources'
import Artworks from '../views/Artworks'

const path = '/' 

export default createRouter({
  history: createWebHistory(path),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/resources',
      name: 'Resources',
      component: Resources,
    },
    {
      path: '/artworks',
      name: 'Artworks',
      component: Artworks,
    
    }
  ],
})


