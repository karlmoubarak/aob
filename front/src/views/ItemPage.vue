<template>
  <div 
    class="itemContainer"
    :class="{ reltedItemsVisible: reltedItemsVisible } "
    ref="itemContainer"
    @click.stop="$router.go(-1)"
  >
    <div 
      v-if="item" 
      class="item"
      @scroll="handleScroll"
    >
      <div 
        class="circle"
        @click.stop="
          isInMyCollection(item.slug) ? 
          removeFromCollection(item) :
          addToCollection(item)  
        "
      >
        <span 
          v-if="isInMyCollection(item.slug)"
          class="remove"
        >-</span>
        <span 
          v-else
          class="add"
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
      ref="table"
      :collectionItems="relatedItems"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @click.stop="reltedItemsVisible = !reltedItemsVisible"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CollectionBody from '../components/CollectionBody.vue'
import ExpandedArtwork from '../components/ExpandedArtwork.vue'
import ExpandedResource from '../components/ExpandedResource.vue'

      // :style="{ top: `calc(100% - ${top}em)` }"


export default {
  name: 'Page',
  components: {
    CollectionBody,
    ExpandedResource,
    ExpandedArtwork,
  },
  props: [
  ],
  data() {
    return {
      hovered: false,
      top: 10,
      reltedItemsVisible: false,
    }
  },
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
      this.item &&
      this.item.tags && 
      this.item.tags.length > 0 && 
      this.item.tags 
    )},
    
    relatedItems() {
      return this.mainCollection
        .filter(i => 
          this.tags &&
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
    ]),
    
    handleScroll(e) {
      if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
        this.top = this.top + 50
      } else {
        this.top = 10
      }
    }
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
  overflow: hidden;
  z-index: 2;
  transform: translateY(0) !important;
}

.fade-enter-from ,
.fade-leave-to {
  padding-top: 10%;
}

  
.item {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  /* max-height: calc(100% - 20em); */
  max-height: 100%;
  overflow: scroll;
}

.collectionBody {
  position: fixed;
  top: calc(100% - 10em);
  left: 10em;
  width: calc(100% - 10em);
  /* margin-left: 10em; */
  background: var(--lightestorange);
  /* height: 0; */
  overflow: scroll;
  /* z-index: 4; */
}

.collectionBody:hover {
  top: calc(100% - 15em);
}

.itemContainer .col {
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
  cursor: pointer;
}
.itemContainer .item .circle * {
  font-size: 3em;
}
  
.reltedItemsVisible table {
  top: 10em;
  box-shadow: 0 50em 200em 200em #ffffffa4;
}


.mobile .itemContainer {
  position: relative;
  height: unset;
  overflow: unset;
}
.mobile .item {
  height: unset;
  overflow: unset;
}

.mobile .itemContainer .item .circle {
  top: 1em;
  left: 1em;
  height: 2em;
  width: 2em;
}
.mobile .itemContainer .item .circle * {
  font-size: 2em;
}

.mobile .collectionBody {
  position: relative;
  width: unset;
  left: unset;
}


</style>