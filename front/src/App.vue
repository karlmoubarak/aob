<template>
  <div id="app" :class="{ mobile: isMobile }">
  
    <!-- <div class="side">
      <Nav />
    </div> -->

    <main>
      <Header />
      <!-- <Tags /> -->
      <router-view v-slot="{ Component }">
        <transition name="component-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

  </div>
</template>

<script>
import { mapState } from 'vuex'

import Header from './components/Header'
// import Nav from './components/Nav'
// import Tags from './components/Tags'

import api from './api'

export default {
  name: 'App',
  components: { 
    Header,
    // Nav,
    // Tags,
  },
  computed: {
    ...mapState([
      'isMobile',
      'tags'
    ])
  },
  created() {

    this.$store.commit('setMobile', this.checkIfMobile())
    window.addEventListener('resize', () => {
      this.$store.commit('setMobile', this.checkIfMobile())
    })

    this.getTags()
    this.getResources()
    this.getArtworks()

    this.$router.afterEach(to => {
      if (to.query.tag) {
        this.$store.commit('selectTag', 
          this.tags
          .find(
            t => t.slug == to.query.tag
          )
        )
      } else if (to.query.search) {
        this.$store.commit('setQuery', 
          to.query.search
        )
      } else {
        this.$store.commit('selectTag', null)
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

  }
}
</script>

<style>

:root {
  --back: white;
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
  display: flex;
  font-size: 10pt;
  /* flex-direction: column; */
  font-family: 'Courier New', Courier, monospace;
}

p {
  margin: 0;
}

a {
  color: rgb(247, 167, 48);
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-thickness: 0.001em;
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
color: #f79544;
}
/* a:visited {
  color: #8e9463;
  
} */

.highlight {
  /* position: relative; */
  border-radius: 0.2em;
  /* background: rgba(153, 102, 255, 0.694);
  box-shadow: 0 0px 8px 2px rgb(153, 102, 255); */
  background: rgba(247, 255, 102, 0.694);
  box-shadow: 0 0px 8px 2px rgb(255, 255, 102);
  text-decoration: underline;
  text-decoration-color: rgb(153, 50, 255);
  text-decoration-style: wavy;
  text-decoration-thickness: 0.08em;
}

.side {
  flex-shrink: 0;
}

main {
  margin: 0.75em;
  width: 100%;
}

td.id {
  width: 1.5em;
}
td.tags {
  width: 5em;
}
td.organization {
  width: 12em;
}
td.description { 
  min-width: 25em;
  min-width: 30em;
}
td.source {
  width: 7.5em;
}
td.contact {
  width: 7.5em;
}
td.updated {
  width: 8em;
}
</style>
