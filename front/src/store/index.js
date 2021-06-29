import { createStore } from 'vuex'
import { sortAlphabetically } from '../utils'

export default createStore({

  strict: process.env.NODE_ENV !== 'production',

  state: {
    isMobile     : false,
    tags         : [],
    resources    : [],
    artworks     : [],
    selectedTag  : {},
    query        : null,
  },

  mutations: {
    setMobile    : (state, mobile)    => state.isMobile     = mobile,
    setTags      : (state, tags)      => state.tags         = tags,
    setResources : (state, resources) => state.resources    = resources,
    setArtworks  : (state, artworks)  => state.artworks     = artworks,
    selectTag    : (state, tag)       => state.selectedTag  = tag,
    setQuery     : (state, query)     => state.query        = query,
  },

  actions: {
  },

  getters: {
  
    // tagsArray: state => ( Array
      
    // ),
  
    filteredResources: state => ( 
      state.resources.length > 0 && state.selectedTag ? 
      state.resources 
      .filter(r => (
        r.tags
        .map(r => r.slug)
        .includes(state.selectedTag.slug)
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
        .includes(state.query) 
        // ||
        // r.tags && r.tags.length > 0 && r.tags
        // .map(r => r.Name)
        // .find(n => n.includes(state.query))
      )) : state.resources
    
    ),
    
    filteredArtworks: state => ( 
      state.artworks.length > 0 && state.selectedTag ? 
      state.artworks 
      .filter(r => (
        r.tags
        .map(r => r.slug)
        .includes(state.selectedTag.slug)
      )) :
      state.artworks.length > 0 && state.query ? 
      state.artworks 
      .filter(r => (
        r.Title
        .includes(state.query) ||
        r.Description
        .includes(state.query) ||
        r.ArtistName
        .includes(state.query) ||
        r.ArtistWebsite && r.ArtistWebsite
        .includes(state.query) ||
        r.Contact && r.Contact
        .includes(state.query) ||
        r.Link && r.Link
        .includes(state.query) 
        // ||
        // r.tags && r.tags.length > 0 && r.tags
        // .map(r => r.Name)
        // .find(n => n.includes(state.query))
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
      // .sort((a, b) => b.slug - a.slug)
      // ].sort(() => Math.random() - 0.2)
      
    )
    
    
  }

})
