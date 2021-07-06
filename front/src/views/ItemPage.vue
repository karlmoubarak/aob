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
      <div class="circle">
        <span 
          v-if="isInMyCollection(item.slug)"
          class="remove"
          @click.stop="removeFromCollection(item)"
        >-</span>
        <span 
          v-else
          class="add"
          @click.stop="addToCollection(item)"
        >+</span>   
      </div>
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
import { mapGetters, mapActions } from 'vuex'
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
      'mainCollection',
      'isInMyCollection'
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
    ...mapActions([
      'addToCollection',
      'removeFromCollection'
    ])
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
  /* padding-bottom: 40em; */
  z-index: 1;
}
  
.item {
  width: 100%;
}

table {
  position: sticky !important;
  bottom: -10em;
  left: 10em;
  width: calc(100% - 10em) !important;
  /* margin-left: 10em; */
  background: var(--lightestorange);
}

table:hover {
  bottom: 0em;
}

.itemContainer td {
  background: unset !important;
}
  
.itemContainer .item .circle {
  position: absolute;
  top: 7em;
  left: 1em;
  width: 5em;
  height: 5em;
  border-radius: 5em;
  z-index: 2;
  border: 1px dashed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.itemContainer .item .circle * {
  font-size: 3em;
  cursor: pointer;
}
  
</style>