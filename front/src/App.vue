<template>
  <div id="app" :class="{ mobile: isMobile }">
  
    <div class="side">
      <Nav />
    </div>

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
import Nav from './components/Nav'
// import Tags from './components/Tags'

import api from './api'

export default {
  name: 'App',
  components: { 
    Header,
    Nav,
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

    this.getResources()
    this.getTags()

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

    getResources() {
      api
      .resources
      .getAll()
      .then(response => 
        this.$store.commit('setResources', response.data)
      )
      .catch(error => console.log(error))
    },
    
    getTags() {
      api
      .tags
      .getAll()
      .then(response => 
        this.$store.commit('setTags', response.data)
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
}

#app {
  height: 100%; width: 100%;
  display: flex;
  font-size: 11pt;
  /* flex-direction: column; */
}


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
}

</style>
