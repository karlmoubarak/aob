<template>
  <ul class="collections">
    <li 
      v-for="collection in collections"
      :key="collection.slug"  
    > 
      <router-link :to="collection.slug">
        {{ collection.name }} 
      </router-link>
    </li>
  </ul>
  
  <ul class="singles">
    <li 
      v-for="single in singles"
      :key="single.slug"  
    > 
      <router-link :to="single.slug">
        {{ single.name }} 
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      collections: [
        {
          name: 'resources',
          slug: 'resources'
        },
        {
          name: 'artworks',
          slug: 'artworks'
        },
        {
          name: 'collections',
          slug: 'collections'
        },
      ],
      singles: [
        {
          name: 'about',
          slug: 'about'
        },
        {
          name: 'contact',
          slug: 'contact'
        },
      ]
    }
  }
}
</script>

<style>

ul {
  margin: 0;
  padding: 0;
  display: flex;
}

li {
  list-style: none;
  margin: 0 0.5em;
  padding: 0;
}

</style>