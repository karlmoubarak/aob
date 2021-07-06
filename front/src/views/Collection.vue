<template>
  <div v-if="collection" class="collection">
    <div class="info">
      <div class="header">
        <p class="title"> {{ title }}</p>
        <p class="author"> {{ author }}</p>
      </div>
      <vue3-markdown-it
        class="description"
        :source="description"
      ></vue3-markdown-it>
    </div>
    <div class="body">
      <CollectionBody
        v-if="items.length > 0"
        :collectionItems="items"
      />
    </div>
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import CollectionBody from '../components/CollectionBody.vue'

export default {
  name: 'Collection',
  components: {
    CollectionBody
  },
  computed: {
    ...mapState([
      'query'
    ]),
    ...mapGetters([
      'collectionBySlug'
    ]),
    collection() { return (
      this.collectionBySlug(
        this.$route.params.slug
      )
    )},
    items()       { return this.collection.items },
    id()          { return this.collection.id },
    title()       { return this.collection.Title },
    author()      { return this.collection.Author },
    description() { return this.collection.Description },
  },
  created() {
  },
  methods: {

  }
  
}
</script>

<style scoped>

.collection {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.info {
  max-width: 40em;
  padding: 2.5em;
  margin: 2.5em;
  /* margin-top: 1em; */
  background: var(--green);
  font-family: Montserrat;
}
.header {

}
.title  {
  margin: 0;
  font-size: 20pt;
}
.description {
}
.collection p {
  margin-bottom: 0;
}
.body {
  position: relative;
  flex-basis: 100%;
  box-sizing: border-box;
  background: var(--lightgreen);
  padding:2.5em;
  padding-top: 0em;
  /* min-height: 60vh; */
  width: 100%;
}
</style>