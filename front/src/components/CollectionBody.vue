<template>
  <table class="collectionBody">
    <TableHeaders />
    <transition-group name="list" mode="out-in">
    <tr
      v-for="item in collectionItems"
      :key="item.slug"
      :class="{ artworkTR: item.Title }"
      @click.stop="clickHandler(item)"    
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
    </transition-group>
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
  },
  methods: {
    clickHandler(item) {
      this.$router.push({
        name: item.Title ? "Artwork" : "Resource",
        params: { slug: item.slug }
      })
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
  transition: all 0.5s ease;
}
table {
  position: relative;
  border-spacing: 0.5em;
}
tr {
  cursor: pointer;
}
.artworkTD {
}
.resource {
}

tr {
  position: relative;
  box-sizing: border-box;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-to,
.list-leave-from {
  transition: all 0.5s ease;
  
}

.list-enter-from,
.list-leave-to {
  transform: translateY(-5em);
  opacity: 0;
}




</style>