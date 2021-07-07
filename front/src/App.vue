<template>
  <div 
    id="app" 
    dir="ltr"
    :class="{ 
      mobile: isMobile,
      landing: landing
    }" 
  >
    
    <Header />
    <Nav />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from './api'

import Header from './components/Header'
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: { 
    Nav,
    Header
    // Nav,
    // Tags,
  },
  computed: {
    ...mapState([
      'isMobile',
      'tags',
      'locations'
    ]),
    landing() { return this.$route.fullPath == '/'}
    
  },
  created() {

    this.$store.commit('setMobile', this.checkIfMobile())
    window.addEventListener('resize', () => {
      this.$store.commit('setMobile', this.checkIfMobile())
    })

    this.getTags()
    this.getLocations()
    this.getResources()
    this.getArtworks()
    this.getCollections()

    this.$router.afterEach(to => {
      if (to.query.tag) {
        this.$store.commit('selectTag', 
          this.tags
          .find(
            t => t.slug == to.query.tag
          )
        )
      } else if (to.query.location) {
        this.$store.commit('selectLocation', 
          this.locations
          .find(
            l => l.slug == to.query.location
          )
        )
      } else if (to.query.search) {
        this.$store.commit('setQuery', 
          to.query.search
        )
      } else {
        this.$store.commit('selectTag', null)
        this.$store.commit('selectLocation', null)
        this.$store.commit('setQuery', null)
      }
    })
  },


  methods: {

    checkIfMobile: () => window.innerWidth < 700,
    
    getTags() {
      api
      .tags
      .getAll()
      .then(data => 
        this.$store.commit('setTags', data)
      )
      .catch(error => console.log(error))
    },
    
    getLocations() {
      api
      .locations
      .getAll()
      .then(data => 
        this.$store.commit('setLocations', data)
      )
      .catch(error => console.log(error))
    },
    
    getResources() {
      api
      .resources
      .getAll()
      .then(data => 
        this.$store.commit('setResources', data)
      )
      .catch(error => console.log(error))
    },

    getArtworks() {
      api
      .artworks
      .getAll()
      .then(data => 
        this.$store.commit('setArtworks', data)
      )
      .catch(error => console.log(error))
    },
    
    getCollections() {
      api
      .collections
      .getAll()
      .then(data => 
        this.$store.commit('setCollections', data)
      )
      .catch(error => console.log(error))
    },

  }
}
</script>

<style>

@font-face {
  font-family: Montserrat;
  src: url(./assets/Montserrat.otf);
  font-weight: normal;
  font-style: normal;
}

:root {
  --black: rgb(119, 119, 119);
  --orange: #FF740A;
  --lightorange: #FFF7DE;
  --lightestorange: #FEFBF1;
  --lightblue: #F2F5FB;
  --landing: 2s;
  --green: #e1ec90;
  --lightgreen: #eaf0be;
  --brightgreen: #00b35f;
}

html,
body,
#app {
  height: 100%; width: 100%;
  padding: 0; margin: 0;
  background: var(--back);
  background-color: #F2F5FB;
}

#app {
  height: 100%; width: 100%;
  font-size: 10pt;
  font-family: 'Courier New', Courier, monospace;
  color: rgb(119, 119, 119);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
}

main {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  max-height: 100vh;
  overflow: scroll;
  padding-top: 11em;
  transition: all var(--landing) ease;
}

.landing main {
  flex-shrink: 1;
  max-height: 0;
  overflow: hidden;
}


a {
  color: var(--orange);
  text-decoration: underline;
  text-decoration-thickness: 0.001em;
  /* text-decoration-skip: edges; */
  /* text-decoration-skip:40em; */
}
a:hover {
  color: #737a3b;
  text-decoration: line-through;  
  text-decoration-style: wavy;
  text-decoration-thickness: 0.02em;
  /* box-shadow: 0 0px 8px 2px rgb(255, 255, 102); */
}
a:active {
color: var(--orange);
}

.highlight {
  border-radius: 0.2em;
  background: rgba(247, 255, 102, 0.694);
  box-shadow: 0 0px 8px 2px rgb(255, 255, 102);
  text-decoration-color: rgb(153, 50, 255);
  text-decoration-thickness: 0.08em;
}


td.id {
  min-width: 1.5em;
  max-width: 1.5em;
}
td.tags {
  min-width: 5em;
  max-width: 5em;
}
td.organization {
  min-width: 12em;
  max-width: 12em;
}
td.description { 
  min-width: 15em;
  min-width: 20em;
}
td.source {
  /* min-width: 7.5em;
  max-width: 7.5em; */
  min-width: 1.5em;
  max-width: 1.5em;
}
td.contact {
  min-width: 7.5em;
  max-width: 7.5em;
}
td.updated {
  min-width: 8em;
  max-width: 8em;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-leave-to,
.fade-leave-from {
  transition: all 0.2s ease;
  
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(5em);
  opacity: 0;
}



</style>
