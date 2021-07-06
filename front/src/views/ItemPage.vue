<template>
  <div 
    class="itemContainer"
    ref="itemContainer"
    @click.stop="$router.go(-1)"
  >
    <div 
      v-if="item" 
      class="item"
    >
      <ExpandedResource
        v-if="item.Organisation"
        :resource="item"
      />
      <ExpandedArtwork
        v-else-if="item.Title"
        :artwork="item"
      />
    </div>
    <CollectionBody
      v-if="relatedItems.length > 0"
      :collectionItems="relatedItems"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CollectionBody from '../components/CollectionBody.vue'
import ExpandedArtwork from '../components/ExpandedArtwork.vue'
import ExpandedResource from '../components/ExpandedResource.vue'

export default {
  name: 'Page',
  components: {
    CollectionBody,
    ExpandedResource,
    ExpandedArtwork,
  },
  props: [
  ],
  computed: {
    ...mapGetters([
      'resourceBySlug',
      'artworkBySlug',
      'mainCollection'
    ]),
    item() { return (
      this.resourceBySlug(
        this.$route.params.slug
      )
        ||
      this.artworkBySlug(
        this.$route.params.slug
      )
    )},
    tags() { return (
      this.item.tags && 
      this.item.tags.length > 0 && 
      this.item.tags 
    )},
    
    relatedItems() {
      return this.mainCollection
        .filter(i => 
          i.tags
          .map(t => t.Name)
          .some(
            n => this.tags.map(t => t.Name)
          .indexOf(n) > -1
          &&
          i.slug != this.item.slug
        )
      )
    }
    
  },
  mounted() {
  },
  created() {
    // console.log(this.item)
  },
  watch: {
    item() {
      this.$refs.itemContainer.scroll({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  methods: {
  }
  
}
</script>

<style scoped>
.itemContainer {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0em;
  background: #ffffffa4;
  /* background: var(--lightblue); */
  overflow: scroll;
  padding-bottom: 40em;
  z-index: 1;
}

.item {
  width: 100%;
}

table {
  margin-left: 10em;
  margin-top: 20em !important;
  /* max-width: 90%; */
  background: var(--lightestorange);
}

.itemContainer td {
  background: unset !important;
}
  
  
</style>