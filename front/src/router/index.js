import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home'
import Resources from '../views/Resources'
import Artworks from '../views/Artworks'
import Collections from '../views/Collections'
import Collection from '../views/Collection'
import About from '../views/About'
import Contact from '../views/Contact'

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
    },
    {
      path: '/collections',
      name: 'Collections',
      component: Collections,
    },
    {
      path: '/collections/:slug',
      name: 'Collection',
      props: true,
      component: Collection
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/Contact',
      name: 'Contact',
      component: Contact,
    },
  ],
})


