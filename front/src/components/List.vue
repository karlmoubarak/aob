
<template>
  <div class="list body">
    <span
      v-for="item in list"
      :key="item.slug"
    >
      <router-link  
        @click.stop
        :to="{
          path: '/',
          query: { [collection]: [item.slug] }
        }"
      >
        <span
          v-html="$highlight(item.Name, queries )"
        ></span>
        <br>
      </router-link>
      <!-- <span v-if="!isLast(item, list)">, </span> -->
    </span>
  </div>
</template>
<script>

export default {
  name: 'List',
  props: [
    'list',
    'collection'
  ],
  computed: {
    queries() { return this.$store.getters.queries }
  },
  methods: {
    isLast: (item, array) => (
      array.indexOf(item) === array.length - 1
    ),
    

  }
}
</script>

<style scoped>
.list {
  font-size: inherit;
}
a,
a:visited,
a:active,
a:hover {
  /* color: unset; */
  text-decoration: none;
}
</style>