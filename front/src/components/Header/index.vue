<template>
  <header>
    <li 
      :class="['aob', { expanded: expanded }]"
      @mouseover="hovered = true"
      @mouseleave="hovered = false"
    > 
      <transition 
        name="fade"
        mode="out-in"
      >
        <router-link v-if="expanded" to="/">
          {{ $locale.aob.name[locale] }} 
        </router-link>
        <router-link v-else to="/">
          {{ $locale.aob.name.shorthand }} 
        </router-link>
      </transition>
    </li>
    <li 
      v-for="item in $locale.menuItems"
      :key="item.slug"
      :class="item.slug"  
      @click="$router.push(item.slug)"
    > 
      <a>
        {{ item.name[locale] }} 
      </a>
      <!-- <router-link :to="item.slug">
        {{ item.name[locale] }} 
      </router-link> -->
    </li>
    <li :class="myCollection.slug"> 
      <router-link :to="'/collections/' + myCollection.slug">
        <span
        >{{ $locale.collections.mine.Title[locale] }} </span>
        <span> ( {{ myCollectionCount }} )</span>
      </router-link>
      <router-link 
        v-for="item in myCollection.items"
        :key="item.slug"
        :to="{
        name: item.Title ? 'Artwork' : 'Resource',
        params: { slug: item.slug }
      }"
      >{{ item.organisation || item.title }}</router-link>
    </li>
    <li class="languageSwitcher"> 
      <a 
        @click="selectLocale('en')"
        :class="{ selected: locale == 'en' }"
      >{{ $locale.lang['en'] }}</a>
      <span> &nbsp; / &nbsp; </span>
      <a 
        @click="selectLocale('ar')"
        :class="{ selected: locale == 'ar' }"
      >{{ $locale.lang['ar'] }}</a>
    </li>
    <SearchBar
    
    />
  </header>
</template>

<script>
import { mapState } from 'vuex'
import SearchBar from './SearchBar.vue'

export default {
  name: 'Header',
  components: {
    SearchBar,
  },
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
      return this.$locale.num[this.locale](this.myCollection.items.length)
    },
  },
  methods: {
    selectLocale(locale) {
      this.$store.commit('setLocale', locale)
    },
    selected(locale) {
      return locale == this.locale
    },
    toggleLocale() {
      this.selectLocale(this.otherLocale)
    },
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
  height: 100%;
  max-height: 2em;
  overflow: visible;
  background: var(--lightblue);
  transition: all var(--landing) ease;
}
header a {
  color: var(--lightblue);
  text-decoration: unset;
}
header li:not(.aob) a:hover {
  /* color: #737a3b; */
  text-decoration: underline;
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
  transition: all var(--veryfast) ease;
}
header li.aob {
  min-width: 4em;
  max-width: 4em;
  overflow: hidden;
  transition: all var(--veryfast) ease;
}
header li.aob a {
  min-width: 10em;
  height: 100%;
  word-wrap: normal;
  overflow: hidden;
}

header li.aob.expanded {
  min-width: 12em;
  max-width: 13em;
  /* display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: horizontal;
  text-overflow: ellipsis; */
}

.fade-enter-active,
.fade-leave-active,
.fade-leave-to,
.fade-leave-from {
  transition: all var(--veryfast) ease;
}
.fade-enter-from,
.fade-leave-to {
  transform: unset;
  opacity: 0;
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
header li.languageSwitcher {
  min-width: 5em;
  margin-right: 14.1em;
  /* background-color: #C4C4C4; */
  border-radius: 90%;
  margin-left: auto;
} 
header li.languageSwitcher * {
  color: #C4C4C4; 
}
header li.languageSwitcher a {
  text-decoration: underline;
}
header li.languageSwitcher a.selected {
  text-decoration: unset;
}
  
li.my-collection {
  position: absolute;
  top: 0em;
  right: 0em;
  box-sizing: border-box;
  background: var(--green);
  min-width: 13.1em;
  max-width: 13.1em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  height: 100%;
  max-height: 2em;
  z-index: 1;
} 

li.my-collection a {
  box-sizing: border-box;
  color: var(--brightgreen);
  color: unset;
  transition: all var(--fast) ease;
  height: 0;
  flex-shrink: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
li.my-collection a:first-of-type {
  padding: 0.3em 1em;
  height: 2em;
}
li.my-collection:hover {
  background: var(--green);
  box-shadow: 0 0 1.5em 0 var(--lightgreen);
  max-height: 8em;
}

li.my-collection:hover a  {
  padding: 0.3em 1em;
  border-radius: inherit;
  height: 2em;
  background: var(--lightgreen);
}

li.my-collection:hover a:hover  {
  background: var(--green);
}

.landing header {
  background: transparent;
}


.ar header li.my-collection {
  margin-left: unset;
  right: unset;
  left: 0;
}
.ar header li.languageSwitcher {
  margin-left: 14.1em;
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
  transition: all var(--fast) ease;
}
.mobile header a:hover {
  color: var(--lightblue);
}

.mobile header li {
  padding: 0.3em 0.6em;
}
.mobile header li.aob,
.mobile header li.aob.expanded {
  max-width: 100%;
  /* text-align: center;
  justify-content: center; */

}
.mobile header li.languageSwitcher,
.mobile header li.my-collection {
  margin-left: unset;
  margin-right: unset;
  max-width: 100%;
}

.mobile header li.my-collection {
  padding: unset;
  position: relative;
}

.mobile.landing header {
  height: unset;
  max-height: 20em;
  position: relative;
}


</style>