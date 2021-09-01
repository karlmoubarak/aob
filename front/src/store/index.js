import { createStore } from 'vuex'
import { sortAlphabetically, sortByUpdate } from '../utils'
// import api from '../api'


export default createStore({

  strict: process.env.NODE_ENV !== 'production',

  state: {
    isMobile          : false,
    locale            : '',  
    history           : [],
    tags              : [],
    locations         : [],
    resources         : [],
    artworks          : [],
    collections       : [],
    selectedTags      : [],
    selectedLocations : [],
    query             : '',
    myCollection      : {
      slug: 'my-collection',
      // Title: {
      //   en: 'Your Collection',
      //   ar: 'مجموعتك'
      // },
      // Author: {
      //   en: 'Optionally add your name',
      //   ar: 'أضف اسمك اختياريًا'
      // },
      // Description: {
      //   en: 'Describe this collection.',
      //   ar: 'صِف هذه المجموعة',
      // },
      items: [],
    },
  },

  mutations: {
  
    setMobile        : (state, mobile)      => state.isMobile    = mobile,
    setLocale        : (state, locale)      => state.locale      = locale,
    addToHistory     : (state, path)        => state.history.unshift(path),
    setTags          : (state, tags)        => state.tags        = tags,
    setLocations     : (state, locations)   => state.locations   = locations,
    setResources     : (state, resources)   => state.resources   = resources,
    setArtworks      : (state, artworks)    => state.artworks    = artworks,
    setCollections   : (state, collections) => state.collections = collections,
    selectTags       : (state, tags)        => state.selectedTags = tags,
    selectLocations  : (state, locations)   => state.selectedLocations = locations,
    setQuery         : (state, query)       => state.query       = query,
    addToCollection  : (state, item)        => state.myCollection.items.push(item),
    rmFromCollection : (state, item) => {
      state.myCollection.items.splice(state.myCollection.items.indexOf(item), 1)
    },
    updateMyCollection : (state, data) => {
      state.myCollection = { ...state.myCollection, ...data }
    }
    
  },

  actions: {
  
    getCollection: async ({ state, getters }, slug)  => {
      console.log(state, slug)
      return (
        getters
        .collectionBySlug(slug)
      ) 
    },
    
    addToCollection: ({ commit, getters }, item) => {
      if (!getters.isInMyCollection(item.slug)) {
        commit('addToCollection', item)
      }
    },
    
    removeFromCollection: ({ commit, getters }, item) => {
      if (getters.isInMyCollection(item.slug)) {
        commit('rmFromCollection', item)
      }
    },
  },

  getters: {
  
    collectionBySlug: state => slug => (
      slug == state.myCollection.slug ? 
      state.myCollection :
      state
      .collections
      .find(c => c.slug == slug)
    ),
    
    isInMyCollection: state => slug => (
      state.myCollection.items
      .map(i => i.slug)
      .includes(slug)
    ),
    
    sortedCollections: state => (
      sortByUpdate([...state.collections])
      .filter(c => c.slug !== 'exhibition')
    ),
    
    exhibition: state => (
      state
      .collections
      .find(c => c.slug == 'exhibition') 
     || {
      Title: '',
      Description: '',
      items: [],
      
      
     }
    ),
      
    resourceBySlug: state => slug => (
      state.resources
      .find(c => c.slug == slug)
    ),
    
    artworkBySlug: state => slug => (
      state.artworks
      .find(c => c.slug == slug)
    ),
    
    // queries: state => [...state.query.split(' ')],
    queries: state => [state.query],
  
    filteredResources: (state, getters) => (
      state.resources.filter(r => (
        state.selectedTags
        .every(t => r.tags.map(r => r.slug).includes(t))
       && 
        state.selectedLocations
        .every(l => r.locations.map(r => r.slug).includes(l))
       &&
        getters.queries
        .every(q => [
          r.Organisation,
          r.Organisation_AR,
          r.Description,
          r.Description_AR,
          r.Contact,
          r.Link,
          r.tags.map(t => t.Name.toLowerCase()),
          r.tags.map(t =>  t.Name_AR && t.Name_AR.toLowerCase()),
          r.locations.map(l => l.Name.toLowerCase()),
          r.locations.map(l => l.Name_AR && l.Name_AR.toLowerCase()),
        ].flat().join(' ').includes(q))
      )) 
    ),
    
    filteredArtworks: (state, getters) => ( 
      state.artworks.filter(a => (
        state.selectedTags
        .every(t => a.tags.map(a => a.slug).includes(t))
       &&
        state.selectedLocations
        .every(l => (
          [...a.location, ...a.hometown]
          .map(a => a.slug)
          .includes(l)
        ))
       &&
        getters.queries
        .every(q => [
          a.Title,
          a.Description,
          a.Description_AR,
          a.ArtistName,
          a.ArtistWebsite,
          a.Contact,
          a.Link,
          a.tags.map(t => t.Name.toLowerCase()),
          a.location.map(l => l.Name.toLowerCase()),
          a.location.map(l => l.Name_AR && l.Name_AR.toLowerCase()),
          a.hometown.map(l => l.Name.toLowerCase()),
          a.hometown.map(l => l.Name_AR && l.Name_AR.toLowerCase()),
        ].flat().join(' ').includes(q))
      )) 
    ),
    
    mainCollection: (state, getters) => (
      sortAlphabetically([
        ...getters.filteredResources, 
        ...getters.filteredArtworks
      ], 'slug')
    )
    
    
  }

})
