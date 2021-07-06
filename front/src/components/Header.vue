<template>
  <header>
    <li 
      v-for="item in menuItems"
      :key="item.slug"
      :class="item.slug"  
    > 
      <router-link :to="item.slug">
        {{ item.name }} 
        <span
          v-if="item.name == 'My Collection'"
        >( {{ myCollectionCount }} )</span>
      </router-link>
    </li>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      menuItems: [
        {
          name: 'Archive of Belonging',
          slug: '/'
        },
        {
          name: 'resources',
          slug: '/resources'
        },
        {
          name: 'artworks',
          slug: '/artworks'
        },
        {
          name: 'collections',
          slug: '/collections/'
        },
        {
          name: 'about',
          slug: '/about'
        },
        {
          name: 'contact',
          slug: '/contact'
        },
        {
          name: 'My Collection',
          slug: '/collections/my-collection'
        },
      ]
    }
  },
  computed: {
    myCollectionCount() {
      return this.$store.state.myCollection.items.length
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
  z-index: 2;
  text-transform: uppercase;
  text-align: center;
  font-family: montserrat;
}
header a {
  color: var(--lightestorange);
  text-decoration: unset;
}
header li {
  list-style: none;
  margin: 0 0em;
  padding: 0.3em 1em;
  box-sizing: border-box;
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
  background-color: #ffbe8c;

}
header li:nth-of-type(7) {
  background: var(--green);
  /* background-color: #ff6f00; */
  margin-left: auto;
  /* background-color: #ffbe8c; */
  min-width: 15em;
}
header li:nth-of-type(7) a {
  color: var(--brightgreen);
  color: unset;
}
li.my-collection {
}
</style>