<template>
  <header>
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
    </li>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
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
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  z-index: 3;
  /* font-size: 1.15em; */
  text-transform: lowercase;
  text-align: center;
  font-family: montserrat;
  
}
header a {
  color: var(--lightblue);
  text-decoration: unset;
}
header a:hover {
  /* color: initial; */
  color: #737a3b;
  /* text-decoration: initial; */
}
header li {
  list-style: none;
  margin: 0 0em;
  padding: 0.3em 1em;
  box-sizing: border-box;
  cursor: pointer;
}


  header li{
      background-color:#cbbef0;
  /*filter: drop-shadow(0 0 1em #cbbef0);;*/
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
 


header li:nth-last-of-type(2) {

}
header li:last-of-type {
  margin-left: auto;
  background: var(--green);
  min-width: 13.1em;
}
 header li:last-of-type a {
  color: var(--brightgreen);
  color: unset;
}
li.my-collection {
} 


.ar header li:nth-of-type(6) {
  margin-left: unset;
  margin-right: 1em;
}
.ar header li:last-of-type {
  margin-left: unset;
  margin-right: auto;
}
</style>