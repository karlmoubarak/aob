<template>
  <div 
    id="app" 
    :dir="direction"
    :class="[ locale, { 
      mobile: isMobile,
      landing: landing,
    }]" 
  >
    
    <Header />
    <Nav :landing="landing"/>
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
import Nav from './components/Header/Nav'

export default {
  name: 'App',
  components: { 
    Nav,
    Header
  },
  computed: {
    ...mapState([
      'isMobile',
      'locale',
    ]),
    landing()   { return this.$route.name == 'Home' || false },
    direction() { return this.locale == 'ar' ? 'rtl' : 'ltr'}
    
  },
  async created() {

    this.$store.commit(
      'setLocale', 
      this.getLocale().includes('ar') ? 'ar' : 'en'
    )

    this.$store.commit(
      'setMobile', 
      this.checkIfMobile()
    )
    window.addEventListener('resize', () => {
      this.$store.commit(
        'setMobile', 
        this.checkIfMobile()
      )
    })
  
    this.$router.afterEach(to => {
      this.$store.commit('addToHistory',    to.path                )
      this.$store.commit('selectTags',      to.query.tag      || [])
      this.$store.commit('selectLocations', to.query.location || [])
      this.$store.commit('setQuery',        to.query.search   || '')
    })
    
    for (let key in api) {
      this.$store.commit(
        'set' + key[0].toUpperCase() + key.slice(1),
        await api[key].getAll()
      )
    }
  },

  methods: {

    checkIfMobile: () => window.innerWidth < 700,
    
    getLocale: () => (
      navigator.languages && 
      navigator.languages.length ? 
      navigator.languages[0] : 
      navigator.language
    ),
    

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
  --lighterorange: #f5eed4;
  --lightestorange: #FEFBF1;
  --lightblue: #EDF2F6;
  --lightblue: #f1f6fa;
  --green: #e1ec90;
  --lightgreen: #eaf0be;
  --brightgreen: #00b35f;
  --purple: #CBBEF0;
  --highlight: rgb(255, 255, 102);
   
  --veryfast: 0.1s;
  --fast: 0.2s;
  --slow: 0.5s;
  --veryslow: 0.8s;
  --landing: 1s;
}

html,
body,
#app {
  height: 100%; width: 100%;
  padding: 0; margin: 0;
  background-color: var(--lightblue);
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
  position: relative;
  /* top: 0; */
  height: 100%;
  width: 100%;
  max-height: 100vh;
  overflow: scroll;
  /* padding-top: 11em; */
  transition: all var(--landing) ease;
}

.landing main {
  flex-shrink: 1;
  max-height: 0;
  overflow: hidden;
}

.center {
  text-align: center;
}
main * {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
main::-webkit-scrollbar {
  display: none;
}


a {
  color: var(--orange);
  text-decoration: none;
  text-decoration-thickness: 0.001em;
  /* text-decoration-skip: edges; */
  /* text-decoration-skip:40em; */
}

a:hover {
  text-decoration: underline;
  /* box-shadow: 0 0px 8px 2px rgb(255, 255, 102); */
}
a:active {
color: var(--orange);
}

.highlight {
  border-radius: 0.2em;
  background:var(--highlight);
  box-shadow: 0 0px 8px 2px var(--highlight);
  text-decoration-color: var(--highlight);
  text-decoration-thickness: 0.08em;
}




.description img {
  max-width: 100%;
}



.fade-enter-active,
.fade-leave-active {
  transition: all var(--fast) ease;
}

.fade-leave-to,
.fade-leave-from {
  transition: all var(--fast) ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(5em);
  opacity: 0;
}

#app.mobile {
  font-size: 12pt;
  display: block;
}

#app.mobile.landing {
  overflow: scroll;
}

.mobile a:hover {
  color: initial;
}

.mobile main {
  position: relative;
  max-height: unset;
  padding-top: unset;
}

.mobile.landing main {
  position: relative;
  max-height: unset;
  height: unset;
}

@page {
  size: A4 landscape;
  margin: 0;
}

@media print {
  html,
  body,
  #app,
  main,
  #home,
  .table {
    height: auto !important;
    max-height: unset !important;
    overflow: scroll;
    /* transition: all 0s ease !important; */
  }
  html {
    zoom:75%;
  }
  header,
  nav,
  input,
  textarea {
    display: none !important;
  }
}

</style>
