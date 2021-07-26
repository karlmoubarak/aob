
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
          v-html="$highlight(name(item), queries )"
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
    queries() { return this.$store.getters.queries },
    locale()  { return this.$store.state.locale },
  },
  methods: {
    isLast: (item, array) => (
      array.indexOf(item) === array.length - 1
    ),
    name(item) { return this.locale == 'ar' && item.Name_AR 
      ? item.Name_AR
      : item.Name
    },
    

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