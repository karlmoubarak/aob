<template>
  <table class="collectionBody">
    <TableHeaders />
    <tr
      v-for="item in collectionItems"
      :key="item.slug"
      :class="{ artworkTR: item.Title }"
    >
      <Resource
        v-if="item.Organisation"
        :resource="item"
      />
      <td colspan="100%" v-else>
        <Artwork 
          :artwork="item"
          :inTable="!artworksOnly"
        />
      </td>
    </tr>
  </table>
</template>

<script>
import Artwork from './Artwork.vue'
import Resource from './Resource.vue'
import TableHeaders from './TableHeaders.vue'

export default {
  name: 'CollectionBody',
  components: {
    TableHeaders,
    Resource,
    Artwork
  },
  props: [
    'collectionItems'
  ],
  computed: {
    artworksOnly() {
      return !this.collectionItems.find(i => i.Organisation)
    }
  }

}
</script>

<style scoped>

.collectionBody {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  margin-top: 1em;
}
table {
  border-spacing: 0.5em;
}
tr {
  position: relative;
}
.artworkTD {
}
.resource {
}

tr:nth-of-type(n) td {
  /* box-shadow: 0em 0em 1em 0em rgba(0, 97, 0, 0.527); */
  filter: drop-shadow(0em 0.4em 0.5em rgba(0, 97, 0, 0.527));
}
tr:nth-of-type(2n) {
  z-index: 1;
}
tr:nth-of-type(1n) .artworkContainer .artwork {
  /* margin-left: 0%; */
  /* justify-content: flex-start; */
  /* background: chocolate; */
}
tr:nth-of-type(2n) .artworkContainer {
  /* margin-left: -2em; */
  /* justify-content: center; */
  /* background: greenyellow; */
}
tr:nth-of-type(3n) .artworkContainer {
  /* margin-left: 50%; */
  /* justify-content: flex-end; */
  /* background: pink; */
} 
tr:nth-of-type(4n) .artworkContainer {
  /* margin-left: 75%; */
  /* justify-content: center; */
  /* background: blue; */
} 
tr:nth-of-type(5n) .artworkContainer {
  /* justify-content: flex-start; */
  /* background: red; */
} 
</style>