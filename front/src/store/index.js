import { createStore } from 'vuex'
import { sortAlphabetically, sortByUpdate } from '../utils'

export default createStore({

  strict: process.env.NODE_ENV !== 'production',

  state: {
  
    // App interface state: mobile, language, loading
    // status, and a custom history array.
  
    isMobile          : false,
    loading           : true,
    printing          : false,
    locale            : '',  
    history           : [],
    
    // API responses
    
    info              : {},
    tags              : [],
    locations         : [],
    resources         : [],
    artworks          : [],
    collections       : [],
    
    // Parameters and queries from routing are set here.
    
    selectedTags      : [],
    selectedLocations : [],
    query             : '',
    sort              : { prop: 'slug', order: 1 },
    
    // default my collection object in case of first visit.
    
    myCollection      : { slug: 'my-collection', items: [] },
    
  },

  mutations: {
  
    setMobile          : (state, mobile)      => state.isMobile                    = mobile,
    setLoading         : (state, loading)     => state.loading                     = loading,
    setPrinting        : (state, printing)    => state.printing                    = printing,
    setLocale          : (state, locale)      => state.locale                      = locale,
    addToHistory       : (state, path)        => state.history.unshift             ( path ),
    
    setInfos           : (state, info)        => state.info                        = info,
    setTags            : (state, tags)        => state.tags                        = tags,
    setLocations       : (state, locations)   => state.locations                   = locations,
    setResources       : (state, resources)   => state.resources                   = resources,
    setArtworks        : (state, artworks)    => state.artworks                    = artworks,
    setCollections     : (state, collections) => state.collections                 = collections,
    
    selectTags         : (state, tags)        => state.selectedTags                = tags,
    selectLocations    : (state, locations)   => state.selectedLocations           = locations,
    setQuery           : (state, query)       => state.query                       = query,
    setSort            : (state, sort)        => state.sort                        = sort,
    
    updateMyCollection : (state, data)        => state.myCollection                = { ...state.myCollection, ...data },
    addToCollection    : (state, item)        => state.myCollection.items.push     ( item ),
    rmFromCollection   : (state, index)       => state.myCollection.items.splice   ( index, 1 ),
    
  },

  actions: {
  
    selectLocale: ({ commit }, locale) => {
      commit('setLocale', locale)
    },
    
    getCollectionFromStore: ({ getters, commit }) => {
      const found = localStorage.myCollection && JSON.parse(localStorage.myCollection)
      if (found) {
        found.items = found.items
        .map(i => getters.resourceBySlug(i) || getters.artworkBySlug(i))
        .filter(i => i)
        commit('updateMyCollection', found)
      }
    },
    
    storeCollection: ({ state }) => {
      localStorage.myCollection = JSON.stringify({
        ...state.myCollection,
        ...{ 
          items: state.myCollection.items.map(i => i.slug)
        }
      })
    },
    
    addToCollection: ({ commit, getters, dispatch }, item) => {
      if (!getters.isInMyCollection(item.slug)) {
        commit('addToCollection', item)
        dispatch('storeCollection')
      }
    },
    
    removeFromCollection: ({ state, commit, getters, dispatch }, item) => {
      if (getters.isInMyCollection(item.slug)) {
        commit('rmFromCollection', state.myCollection.items.indexOf(item))
        dispatch('storeCollection')
      }
    },
    
    updateMyCollection: ({ commit, dispatch }, data) => {
      commit('updateMyCollection', data)
      dispatch('storeCollection')
    },
    
  },

  getters: {
    
    // Get's the last route in 'history' that is
    // not a sub-page
    
    parentRoute: state => ( 
      state
      .history
      .find(p => 
        p.split('/').length == 2 ||
        p.includes('collections')
      ) || '/archive'
    ),
    
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
  
    filteredResources: (state, getters) => (
      state.resources.filter(r => (
        state.selectedTags
        .every(t => r
          .tags
          .map(r => r.slug)
          .includes(t)
        )
       && 
        state.selectedLocations
        .every(l => r
          .locations
          .map(r => r.slug)
          .includes(l)
        )
       &&
        getters.queries
        .every(q => [
          r.organisation,
          r.organisation_AR,
          r.description,
          r.description_AR,
          r.contact,
          r.link,
          r.tags.map(t => t.Name),
          r.locations.map(l => l.Name),
          r.tags.map(t => t.Name_AR),
          r.locations.map(l => l.Name_AR),
        ].flat()
         .join(' ')
         .toLowerCase()
         .includes(q)
        )
      )) 
    ),
    
    filteredArtworks: (state, getters) => ( 
      state.artworks.filter(a => (
        state.selectedTags
        .every(t => a
          .tags
          .map(a => a.slug)
          .includes(t)
        )
       &&
        state.selectedLocations
        .every(l => (
          [...a.locations, ...a.hometown]
          .map(a => a.slug)
          .includes(l)
        ))
       &&
        getters.queries
        .every(q => [
          a.title,
          a.description,
          a.description_AR,
          a.artistName,
          a.artistWebsite,
          a.contact,
          a.link,
          a.tags.map(t => t.Name),
          a.locations.map(l => l.Name),
          a.hometown.map(l => l.Name),
          a.tags.map(t => t.Name_AR),
          a.locations.map(l => l.Name_AR),
          a.hometown.map(l => l.Name_AR),
        ].flat()
         .join(' ')
         .toLowerCase()
         .includes(q)
        )
      )) 
    ),
    
    mainCollection: (state, getters) => (
      state.sort.prop == 'id' && [
        ...getters.filteredResources, 
        ...getters.filteredArtworks
      ].sort((a, b) => (
        state.sort.order * (
          getters.isInMyCollection(b.slug) -
          getters.isInMyCollection(a.slug)
        )
      )) ||
      sortAlphabetically([
        ...getters.filteredResources, 
        ...getters.filteredArtworks
      ], state.sort.prop, state.sort.order)
    ),
  
    relatedItems: (state, getters) => (item, accurate) => {
      const
        hasInCommon = (type, i) => 
          state[type] && i[type]
          .map(t => t.slug)
          .every(n => 
            item[type]
            .map(t => t.slug)
            .indexOf(n) > -1
          ),
        operator = (a, b) => accurate ? a && b : a || b
      return item && getters.mainCollection
        .filter(i => 
          i.slug != item.slug && operator(
            hasInCommon('tags', i), 
            hasInCommon('locations', i)
          )
        )
    },
    
    collectionBySlug: state => slug => (
      slug == state.myCollection.slug && 
      state.myCollection ||
      state
      .collections
      .find(c => c.slug == slug)
    ),
    
    isInMyCollection: state => slug => (
      state.myCollection.items
      .map(i => i.slug)
      .includes(slug)
    ),
    
    parentCollections: (state, getters) => item => (
      getters
      .sortedCollections
      .filter(c => (
        c.items
        .map(i => i.slug)
        .includes(item.slug)
      ))
    ),
    
    sortedCollections: state => (
      sortByUpdate([...state.collections])
    ),
    
    exhibition: state => (
      state
      .collections
      .find(c => c.isCurrentExhibition) 
     || {
        Title: '',
        Description: '',
        items: [], 
      }
    ),  
    
    queries: state => [state.query],
  
  }

})
