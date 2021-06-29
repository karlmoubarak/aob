<template>
  <table id="home">
    <TableHeaders />
    <tr
      v-for="item in mainCollection"
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
          :inTable="true"
        />
      </td>
    </tr>
  </table>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Artwork from '../components/Artwork.vue'
import Resource from '../components/Resource.vue'
import TableHeaders from '../components/TableHeaders.vue'

export default {
  name: 'Home',
  components: {
    TableHeaders,
    Resource,
    Artwork
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'isMobile',
    ]),
    ...mapGetters([
      'mainCollection'
    ])
  }

}
</script>

<style>

#home {
  box-sizing: border-box;
  position: relative;
  /* height: 100%; */
  width: 100%;
  margin-top: 1em;
}
table {
  /* border-spacing: 0.5em; */
}
tr {
  position: relative;
}
.artworkTD {
}
.resource {
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