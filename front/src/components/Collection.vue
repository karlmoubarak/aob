<template>
  <div class="collection">
    <div class="header">
      <router-link
        :to="{
          name:'Collection',
          params: { slug }
        }" 
        class="title"
        v-html="$highlight( title, query )"
      ></router-link>
      <p 
        class="artist"
        v-html="$highlight( author, query )"
      ></p>
    </div>
    <vue3-markdown-it
      class="description"
      :source="$highlight( description, query )"
    ></vue3-markdown-it>
  </div>
</template>

<script>

import { mapState } from 'vuex'

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
    author()      { return this.collection.Author },
    description() { return this.collection.Description },
    ...mapState([
      'query'
    ]),
    
  },
  mounted() {
  },
  methods: {
  
  }
  
}
</script>

<style scoped>

@font-face {
  font-family: Montserrat;
  src: url(../assets/Montserrat.otf);
  font-weight: normal;
  font-style: normal;
}


.collection {
  max-height: 23em;
  margin: 1em 0;
  font-family: Montserrat;
  border: 1px solid lightblue;
  border-radius: 0.5em;
  background: #E3EDFF;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* background: wheat; */
   /* background: white;*/
}
.header {
  padding: 0.5em;
  cursor: pointer;
}
.title  {
  font-size: 20pt;
}
.description {
  padding: 0.5em;
  max-width: 40em;
}
.collection p {
  margin-bottom: 0;
}
</style>