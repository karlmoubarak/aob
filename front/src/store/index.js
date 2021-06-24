import { createStore } from 'vuex'

export default createStore({

  strict: process.env.NODE_ENV !== 'production',

  state: {
    isMobile   : false,
    resources  : [],
    tags       : [],
    artworks   : [],
    selectedTag: {},
    query      : null,
  },

  mutations: {
    setMobile    : (state, mobile)    => state.isMobile  = mobile,
    setResources : (state, resources) => state.resources = resources,
    setTags      : (state, tags)      => state.tags      = tags,
    setArtworks  : (state, artworks)  => state.artworks  = artworks,
    selectTag    : (state, tag)       => state.selectedTag = tag,
    setQuery     : (state, query)     => state.query     = query,
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
      )) : state.resources
    
    )
  }

})
