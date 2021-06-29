<template>
  <div class="taglist body">
    <span
      v-for="item in list"
      :key="item.slug"
    >
      <router-link 
        :to="{
          path: collection,
          query: { tag: item.slug }
        }"
      >
        <span
          v-html="$highlight(item.Name, query )"
        ></span>
      </router-link>
      <!-- <span v-if="!isLast(item, list)">, </span> -->
    </span>
  </div>
</template>
<script>

export default {
  name: 'SemanticList',
  props: [
    'list',
    'collection'
  ],
  computed: {
    query() { return this.$store.state.query }
  },
  methods: {
    isLast: (item, array) => (
      array.indexOf(item) === array.length - 1
    ),
    

  }
}
</script>

<style>
.semanticList {
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