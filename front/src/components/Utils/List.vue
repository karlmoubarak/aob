
<template>
  <div class="list">
    <span
      v-for="item in list"
      :key="item.slug"
    >
      <router-link  
        @click.stop
        :to="{
          path: '/archive',
          query: { [collection]: [item.slug] }
        }"
      >
        <span
          v-html="$highlight(name(item), queries )"
        ></span>
        <br>
      </router-link>
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
a:active {
  /* color: unset; */
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
  
}
</style>
