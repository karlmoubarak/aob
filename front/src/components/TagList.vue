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
        <vue3-markdown-it
          v-bind="$mdOpts"
          :source="highlight( item.Name )"
        ></vue3-markdown-it>
        <!-- {{  highlight( item.Name ) }} -->
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
    highlight(source) {
      return (
        this.query ? 
        source.replace(
          new RegExp(this.query, "gi"), 
          match => ('<span class="highlight">' + match + '</span>')
        ) : source
      )
    }
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