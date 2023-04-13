<template>
  <header>
    <li
      class="aob"
      @mouseover="hovered = true"
      @mouseleave="hovered = false"
      @click="$router.push('/')"
    >
      <transition
        name="fade"
        mode="out-in"
      >
        <a v-if="expanded">{{ $locale.aob.name[locale] }}</a>
        <a v-else>{{ $locale.aob.name.shorthand }}</a>
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
        name: item.title ? 'Artwork' : 'Resource',
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
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'

// Menu bar for main routing and language switching
// Menu items are defined in $locale

export default {
  name: 'Header',
  props: [ 'landing' ],
  methods: {
    ...mapActions([ 'selectLocale' ])
  },
  data() {
    return {
      hovered: false,
    }
  },
  computed: {
    ...mapState([
      'isMobile',
      'locale',
      'myCollection',
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
        this.landing ||
        this.isMobile
      )
    },
    myCollectionCount() {
      return this.$locale.num[this.locale](this.myCollection.items.length)
    },
  },
}
</script>

<style scoped>

header {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 2em;
  overflow: visible;
  z-index: 3;
  text-transform: lowercase;
  text-align: center;
  font-family: montserrat;
  /* background: var(--lightblue); */
  transition: all var(--landing) ease;
  display: flex;
}
header a {
  color: var(--lightblue);
  color: white;
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
}
header li.aob a {
  min-width: 10em;
  height: 100%;
  word-wrap: normal;
  overflow: hidden;
}

.mobile header li.aob,
.landing header li.aob,
header li.aob:hover {
  min-width: 12em;
  max-width: 13em;
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
  margin-right: 14em;
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
  min-width: 13em;
  max-width: 13em;
  padding: 0;
  height: 100%;
  max-height: 2em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

li.my-collection a {
  box-sizing: border-box;
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

li.my-collection:hover a:not(:first-of-type)  {
  padding: 0.3em 1em;
  height: 1.8em;
  background: var(--lightgreen);
}

li.my-collection:hover a:hover  {
  background: var(--green);
}

.landing header {
  /* background: transparent; */
}


.ar header li.my-collection {
  margin-left: unset;
  right: unset;
  left: 0;
}
.ar header li.languageSwitcher {
  margin-left: 14em;
  margin-right: auto;
}


.mobile header {
  position: sticky;
  /* position: relative; */
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
.mobile header li.languageSwitcher {
  min-height: 2.1em;
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
