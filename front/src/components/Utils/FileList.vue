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
          📄
        </a>
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
