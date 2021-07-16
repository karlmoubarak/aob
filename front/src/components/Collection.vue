<template>
  <div  
    class="collectionContainer"
    @click.stop="$router.push({
      name:'Collection',
      params: { slug }
    })"
  >
    <div class="collection">
      <div class="circleContainer">
        <div class="circle"></div>
      </div>
      <div class="info">
        <div class="header">
          <p class="title">{{ title }}</p>
          <p 
            class="artist"
          >{{ author }}</p>
        </div>
        <div class="body">
          <p class="description">
            <vue3-markdown-it
              :source="description"
            ></vue3-markdown-it>
          </p>
          <div class="overview">
            <li 
              v-for="item in items" 
              :key="item.slug"
            >{{ item.Organisation || item.Title }}</li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Collection',
  components: {
  },
  props: [
    'collection',
  ],
  data() {
    return {
    }
  },
  computed: {
    id()          { return this.collection.id },
    title()       { return this.collection.Title },
    slug()        { return this.collection.slug },
    author()      { return this.collection.Author || 'Anonymous' },
    items()       { return this.collection.items },
    description() { return this.collection.Description },
    ...mapState([
      'query'
    ]),
    ...mapGetters(['queries'])
    
  },
  mounted() {
  },
  methods: {
  
  }
  
}
</script>

<style>


.collectionContainer {
  position: relative;
  box-sizing: border-box;
  flex-basis: 32%;
  min-width: 32%;
  max-width: 32%;
  margin: 0.5em;
  background: var(--lightgreen);
}
.collectionContainer .collection {
  max-height: 23em;
  margin: 0.5em;
  font-family: Montserrat;
  border-radius: 0.5em;
  background: var(--green);
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
  overflow: hidden;
  padding: 1em;
}
.collectionContainer .collection .circleContainer {
  flex-basis: 10%;
}
.collectionContainer .collection .circleContainer .circle {
  position: relative;
  width: 3em;
  height: 3em;
  background-color: white;
  background: var(--lightgreen);
  border-radius: 3em;
}
.collectionContainer .collection .info {
  flex-basis: 90%;
  padding: 0 0.5em;
}
.collectionContainer .header {
  cursor: pointer;
}
.collectionContainer .title  {
  font-size: 12pt;
  font-weight: bold;
  margin: 0;
}
.collectionContainer .title a {
}

.collectionContainer .body {
  flex-basis: 80%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.collectionContainer .description {
  flex-basis: 60%;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.collectionContainer .description p:first-of-type,
.collectionContainer .description p:last-of-type {
  margin: 0;
}
.collectionContainer .overview {
  flex-basis: 30%;
  /* display: flex;
  flex-direction: column; */
}
.collectionContainer .overview li {
  list-style: none;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.collectionContainer .overview li::before {
  content: '→ ';
}


</style>