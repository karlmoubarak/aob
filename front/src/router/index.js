import { createRouter, createWebHistory } from 'vue-router'

import Home           from '../views/Home'
import Resources      from '../views/Resources'
import Artworks       from '../views/Artworks'
import Collections    from '../views/Collections'
import Collection     from '../views/Collection'
import Info           from '../views/Info'
import Exhibition     from '../views/Exhibition'
import ItemPage       from '../views/ItemPage'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/archive',
      name: 'Archive',
      component: Home,
    },
    {
      path: '/resources',
      name: 'Resources',
      component: Resources,
    },
    {
      path: '/resources/:slug',
      name: 'Resource',
      props: true,
      component: ItemPage,
    },
    {
      path: '/Exhibition',
      name: 'Exhibition',
      component: Exhibition,
    },
    {
      path: '/artworks',
      name: 'Artworks',
      component: Artworks,
    },
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
      path: '/info',
      name: 'Info',
      component: Info,
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Info,
    },
    {
      path: '/upload/resource',
      name: 'Upload Resource',
      component: Info,
    },
    {
      path: '/upload/artwork',
      name: 'Upload Artwork',
      component: Info,
    },
  ],
})

router.beforeEach(({ path, query }) => {
  const newQuery = {
    tag: query.tag 
      && !Array.isArray(query.tag) 
      && [query.tag],
    location: query.location 
      && !Array.isArray(query.location) 
      && [query.location]
  }
  if (newQuery.tag || newQuery.location) {
    return {
      path: path,
      query: newQuery
    }
  } 
})

export default router

