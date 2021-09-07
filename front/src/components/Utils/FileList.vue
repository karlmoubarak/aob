<template>
  <div class="semanticList body">
    <span :class="name + 's'">
      <span
        v-for="item in list"
        :key="item.hash"
      >
        <a
          @click.stop
          :href="`${$apiURL}/${item.url}`"
          target="_blank"
          class="name"
        >
          <!-- {{ item.name }} -->
          📄
        </a>
        <span v-if="!isLast(item, list)">, </span>
      </span>
    </span>
  </div>
</template>
<script>

export default {
  name: 'FileList',
  props: [
    'list',
    'name',
  ],
  methods: {
    isLast: (item, array) => (
      array.indexOf(item) === array.length - 1
    ),
    isBeforeLast: (item, array) => (
      array.indexOf(item) === array.length - 2
    ),
    alphabetical: array => (
      array.sort((a, b) => a.Name.length - b.Name.length)
    ),
  }
}
</script>

<style scoped>
.semanticList {
  font-size: inherit;
}
a,
a:visited,
a:active,
a:hover {
  word-break: break-all;
  /* color: unset; */
  text-decoration: none;
}
</style>