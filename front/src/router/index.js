import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home'
import Resources from '../views/Resources'
// import Resource from '../views/Resource'
import Artworks from '../views/Artworks'
// import Artwork from '../views/Artwork'
import Collections from '../views/Collections'
import Collection from '../views/Collection'
import About from '../views/About'
import Contact from '../views/Contact'
import ItemPage from '../views/ItemPage'

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
    // {
    //   path: '/resources/:slug',
    //   name: 'Resource',
    //   props: true,
    //   component: Resource,
    // },
    {
      path: '/resources/:slug',
      name: 'Resource',
      props: true,
      component: ItemPage,
    },
    {
      path: '/artworks',
      name: 'Artworks',
      component: Artworks,
    },
    // {
    //   path: '/artworks/:slug',
    //   name: 'Artwork',
    //   props: true,
    //   component: Artwork,
    // },
    {
      path: '/artworks/:slug',
      name: 'Artwork',
      props: true,
      component: ItemPage,
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


