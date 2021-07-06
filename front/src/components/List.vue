
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
          query: { [collection]: item.slug }
        }"
      >
        <span
          v-html="$highlight(item.Name, query )"
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
.list {
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