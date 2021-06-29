<template>
  <div class="tags">
    <span
      v-for="item in tags"
      :key="item.slug"
    >
      <router-link 
        :to="{
          path: '/',
          query: { tag: item.slug }
        }"
      >
        <span
          v-html="$highlight(item.Name, query )"
        ></span>    
      </router-link>
      <span v-if="!isLast(item, tags)">, </span>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Tags',
  props: [
  ],
  computed: {
    ...mapState([
      'tags',
      'query'
    ])
  },
  methods: {
    isLast: (item, array) => (
      array.indexOf(item) === array.length - 1
    ),
  }
}
</script>

<style>
.tags {
  /* margin: 1em; */
  font-size: inherit;
}
a,
a:visited,
a:active,
a:hover {
  /* color: unset; */
  /* text-decoration: none; */
}
</style>