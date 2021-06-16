import { createStore } from 'vuex'

export default createStore({

  strict: process.env.NODE_ENV !== 'production',

  state: {
    isMobile  : false,
    resources : {},
    artworks : {},
  },

  mutations: {
    setMobile    : (state, mobile)    => state.isMobile  = mobile,
    setResources : (state, resources) => state.resources = resources,
    setArtworks  : (state, artworks)  => state.artworks  = artworks,
  },

  actions: {
  },

  getters: {
  }

})
