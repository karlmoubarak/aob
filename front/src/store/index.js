import { createStore } from 'vuex'
import { sortAlphabetically } from '../utils'
// import api from '../api'


export default createStore({

  strict: process.env.NODE_ENV !== 'production',

  state: {
    isMobile         : false,
    tags             : [],
    locations        : [],
    resources        : [],
    artworks         : [],
    collections      : [],
    selectedTag      : {},
    selectedLocation : {},
    query            : null,
    myCollection     : {
      Title: 'Your Collection',
      slug: 'my-collection',
      Author: 'Anonymous',
      Description: 'No Description',
      items: [],
    },
  },

  mutations: {
    setMobile      : (state, mobile)      => state.isMobile    = mobile,
    setTags        : (state, tags)        => state.tags        = tags,
    setLocations   : (state, locations)   => state.locations   = locations,
    setResources   : (state, resources)   => state.resources   = resources,
    setArtworks    : (state, artworks)    => state.artworks    = artworks,
    setCollections : (state, collections) => state.collections = collections,
    selectTag      : (state, tag)         => state.selectedTag = tag,
    selectLocation : (state, location)    => state.selectedLocation = location,
    setQuery       : (state, query)       => state.query       = query,
    addToCollection: (state, item) => state.myCollection.items.push(item),
    rmFromCollection: (state, item) => {
      state.myCollection.items.splice(state.myCollection.items.indexOf(item), 1)
    },
  },

  actions: {
  
    getCollection: async ({ state, getters }, slug)  => {
      console.log(state, slug)
      return (
        getters
        .collectionBySlug(slug)
        // || 
        // await api
        // .collections
        // .get(slug)
        // .then(result => result)
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
    )
    ,
      
    resourceBySlug: state => slug => (
      state
      .resources
      .find(c => c.slug == slug)
    ),
    
    artworkBySlug: state => slug => (
      state
      .artworks
      .find(c => c.slug == slug)
    ),
  
    filteredResources: state => ( 
      state.resources.length > 0 && state.selectedTag ? 
      state.resources 
      .filter(r => (
        r.tags
        .map(r => r.slug)
        .includes(state.selectedTag.slug)
      )) :
      state.resources.length > 0 && state.selectedLocation ? 
      state.resources 
      .filter(r => (
        r.locations
        .map(r => r.slug)
        .includes(state.selectedLocation.slug)  
      )) :
      state.resources.length > 0 && state.query ? 
      state.resources 
      .filter(r => (
        r.Organisation
        .includes(state.query) ||
        r.Description
        .includes(state.query) ||
        r.Contact && r.Contact
        .includes(state.query) ||
        r.Link && r.Link
        .includes(state.query) ||
        r.tags && r.tags.length > 0 && r.tags
        .map(r => r.Name.toLowerCase())
        .find(n => n.includes(state.query)) ||
        r.locations && r.locations.length > 0 && r.locations
        .map(r => r.Name.toLowerCase())
        .find(n => n.includes(state.query))
      )) : state.resources
    ),
    
    filteredArtworks: state => ( 
      state.artworks.length > 0 && state.selectedTag ? 
      state.artworks 
      .filter(a => (
        a.tags
        .map(a => a.slug)
        .includes(state.selectedTag.slug)
      )) :
      state.artworks.length > 0 && state.selectedLocation ?  
      state.artworks 
      .filter(a => (
        a.location
        .map(a => a.slug)
        .includes(state.selectedLocation.slug)  
      ||
        a.hometown
        .map(a => a.slug)
        .includes(state.selectedLocation.slug)  
      )) :
      state.artworks.length > 0 && state.query ? 
      state.artworks 
      .filter(a => (
        a.Title
        .includes(state.query) ||
        a.Description
        .includes(state.query) ||
        a.ArtistName
        .includes(state.query) ||
        a.ArtistWebsite && a.ArtistWebsite
        .includes(state.query) ||
        a.Contact && a.Contact
        .includes(state.query) ||
        a.Link && a.Link
        .includes(state.query) ||
        a.tags && a.tags.length > 0 && a.tags
        .map(a => a.Name.toLowerCase())
        .find(n => n.includes(state.query)) ||
        a.location && a.location.length > 0 && a.location
        .map(r => r.Name.toLowerCase())
        .find(n => n.includes(state.query)) ||
        a.hometown && a.hometown.length > 0 && a.hometown
        .map(r => r.Name.toLowerCase())
        .find(n => n.includes(state.query))
      )) : state.artworks
    ),
    
    mainCollection: (state, getters) => (
      sortAlphabetically(
        state.resources.length > 0 &&
        state.artworks.length > 0 &&
        [
          ...getters.filteredResources, 
          ...getters.filteredArtworks
        ], 
        'slug'
      )
    )
    
    
  }

})
