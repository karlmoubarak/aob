<template>
  <div id="app" :class="{ mobile: isMobile }">
  
    <div class="side">
      <Header />
      <Nav />
    </div>

    <main>
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

import api from './api'

export default {
  name: 'App',
  components: { 
    Header,
    Nav 
  },
  computed: {
    ...mapState([
      'isMobile',
    ])
  },
  created() {

    this.$store.commit('setMobile', this.checkIfMobile())
    window.addEventListener('resize', () => {
      this.$store.commit('setMobile', this.checkIfMobile())
    })

    this.getResources()


  },


  methods: {

    checkIfMobile: () => window.innerWidth < 700,

    getResources() {
      
      api
      .resources
      .getAll()
      .then(response => {
        this.$store.commit('setResources', response.data)
      })
      .catch(error => {
        console.log(error)
      })

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

.side {
  flex-shrink: 0;
}

main {
  margin: 1em;
}

</style>
