import { createRouter, createWebHistory } from 'vue-router'

import Archive        from '../views/Archive'
import Resources      from '../views/Resources'
import Artworks       from '../views/Artworks'
import Collections    from '../views/Collections'
import Exhibition     from '../views/Exhibition'

import Info           from '../views/Info'
import Collection     from '../views/Collection'
import ItemPage       from '../views/ItemPage'

import NotFound       from '../views/NotFound'
import Error          from '../views/Error'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {  
      path: '/',
      name: 'Home',
      component: Archive,
    },
    {
      path: '/archive',
      name: 'Archive',
      component: Archive,
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
    {
      path: '/error',
      name: 'Error',
      component: Error,
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFound,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: {
        name: 'not-found'
      }
    },
  ],
})

// This function produces arrays of paramters passed into 
// the URL in case they are not and returns the new query

router.beforeEach(({ path, query }) => {
  const newQuery = {}
  if (query.tag && !Array.isArray(query.tag)) {
    newQuery.tag = [query.tag]
  }
  if (query.location && !Array.isArray(query.location)) {
    newQuery.location = [query.location]
  }
  if (newQuery.tag || newQuery.location) {
    return {
      path, 
      query: { ...query, ...newQuery }
    } 
  } 
})

export default router
