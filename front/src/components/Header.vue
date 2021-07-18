<template>
  <header>
    <li 
      :class="['aob', { expanded: expanded }]"
      @mouseover="hovered = true"
      @mouseleave="hovered = false"
    > 
      <router-link to="/">
        {{ title }} 
      </router-link>
    </li>
    <li 
      v-for="item in $locale.menuItems"
      :key="item.slug"
      :class="item.slug"  
    > 
      <router-link :to="item.slug">
        {{ item.name[locale] }} 
      </router-link>
    </li>
    <li 
      class="languageSwitcher"
      @click="toggleLocale"
    > 
      <a>{{ otherLocaleString }}</a>
    </li>
    <li :class="myCollection.slug"> 
      <router-link :to="'/collections/' + myCollection.slug">
        {{ myCollection.Title }} 
        <span>( {{ myCollectionCount }} )</span>
      </router-link>
      <router-link 
        v-for="item in myCollection.items"
        :key="item.slug"
        :to="{
        name: item.Title ? 'Artwork' : 'Resource',
        params: { slug: item.slug }
      }"
      >{{ item.Organisation || item.Title }}</router-link>
    </li>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      hovered: false,
    }
  },
  computed: {
    ...mapState([
      'myCollection',
      'locale'
    ]),
    otherLocale() {
      return this.locale == 'ar' ? 'en' : 'ar'
    },
    otherLocaleString() {
      return this.otherLocale == 'ar' ? 'العربية' : 'english'
    },
    expanded() {
      return ( 
        this.hovered || 
        this.$route.fullPath == '/' || 
        this.$store.state.isMobile
      )
    },
    title() {
      return this.expanded ? this.$locale.aob.name[this.locale] : this.$locale.aob.name.shorthand
    },
    myCollectionCount() {
      return this.myCollection.items.length
    },
  },
  methods: {
    toggleLocale() {
      this.$store.commit('setLocale', this.otherLocale)
    }
  }
}
</script>

<style scoped>

header {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  z-index: 3;
  text-transform: lowercase;
  text-align: center;
  font-family: montserrat;
  display: flex;
  height: 2em;
  overflow: visible;
}
header a {
  color: var(--lightblue);
  text-decoration: unset;
}
header li:not(.aob) a:hover {
  color: #737a3b;
}
header li {
  box-sizing: border-box;
  position: relative;
  list-style: none; 
  padding: 0.3em 1em;
  height: 100%;
  max-height: 2em;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
header li.aob {
  max-width: 4em;
  overflow: hidden;
}
header li.aob a {
  min-width: 10em;
  height: 100%;
  word-wrap: normal;
  overflow: hidden;
}

header li.aob.expanded {
  max-width: 60em;
}
header li:nth-of-type(1) {
  background-color: #ff6f00;
}
header li:nth-of-type(2) {
  background-color: #fd7915;
}
header li:nth-of-type(3) {
  background-color: #ff9341;
}
header li:nth-of-type(4) {
  background-color: #ffa25b;
}
header li:nth-of-type(5) {
  background-color: #ffb882;
}
header li:nth-of-type(6) {
  margin-left: 1em;
  min-width: 5em;
  background-color: #C4C4C4;
  border-radius: 90%;
} 


li.my-collection {
  margin-left: auto;
  background: var(--green);
  min-width: 13.1em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  height: 100%;
  /* max-height: 2em; */
} 

li.my-collection a {
  box-sizing: border-box;
  color: var(--brightgreen);
  color: unset;
  transition: all 0.2s ease;
}
li.my-collection a:first-of-type {
  height: 100%;
  padding: 0.3em 1em;
}
li.my-collection a {
  height: 0;
  overflow: hidden;
  flex-shrink: 0;
}

li.my-collection:hover {
  background: var(--green);
  box-shadow: 0 0 1.5em 0 var(--lightgreen);
  max-height: 10em;
  /* border-radius: 0.5em; */
}

li.my-collection:hover a  {
  border-radius: inherit;
  height: 2em;
  padding: 0.3em 1em;
  background: var(--lightgreen);
}

li.my-collection:hover a:hover  {
  height: 2em;
  background: var(--green);
}




.ar header li:nth-of-type(6) {
  margin-left: unset;
  margin-right: 1em;
}
.ar header li:last-of-type {
  margin-left: unset;
  margin-right: auto;
}


.mobile header {
  position: sticky;
  top: 0;
  display: block;
  flex-direction: column;
  max-height: 2em;
  overflow: hidden;
  /* max-height: 4em; */
  /* overflow: scroll; */
  transition: all 0.2s ease;
}
.mobile header a:hover {
  color: var(--lightblue);
}

.mobile header li {
  padding: 0.3em 0.6em;
}
.mobile header li:nth-of-type(6),
.mobile header li:last-of-type {
  margin-left: unset;
  margin-right: unset;
}

.mobile.landing header {
  max-height: 20em;
  position: relative;
}


</style>