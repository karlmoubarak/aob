<template>
  <div 
    :class="[
      'itemContainer',
      { leave: transitioning }
    ]"
    ref="itemContainer"
    @click.stop="$router.push(parentRoute)"
  >
    <div 
      v-if="renderedItem" 
      ref="item"
      class="item"
    >
      <div 
        class="circle"
        @click.stop="
          isInMyCollection(renderedItem.slug) ? 
          removeFromCollection(item) :
          addToCollection(renderedItem)  
        "
      >
        <span 
          v-if="isInMyCollection(renderedItem.slug)"
          class="remove"
        >-</span>
        <span 
          v-else
          class="add"
        >+</span>   
      </div>
      <IndexCard
        :item="renderedItem"
      />
    </div>
    <div
      v-else
      class="noItemMessage"
    >
      <p> {{ noItemMessage }} </p>
    </div>
    <CollectionGroup
      v-if="parentCollections(item).length > 0"
      :collections="parentCollections(item)"
      :headerText="parentCollectionsText"
    />
    <Table
      v-if="related && related.length > 0"
      ref="table"
      :collectionItems="related"
      :headerText="relatedItemsText"
      @click.stop
    />
  </div>
</template>

<script>
import { 
  mapState, 
  mapGetters, 
  mapActions 
}                      from 'vuex'
import IndexCard       from '../components/IndexCard'
import Table           from '../components/Table'
import CollectionGroup from '../components/CollectionGroup'

export default {
  name: 'Page',
  components: {
    IndexCard,
    Table,
    CollectionGroup
  },
  data() {
    return {
      renderedItem: null,
      transitioning: false,
    }
  },
  methods: {
    ...mapActions([
      'addToCollection',
      'removeFromCollection'
    ]),
  },
  computed: {
  
    ...mapState([ 
        'loading',
        'locale',
      ]),
      
    ...mapGetters([
      'parentRoute',
      'resourceBySlug',
      'artworkBySlug',
      'isInMyCollection',
      'relatedItems',
      'parentCollections'
    ]),
    
    noItemMessage() {
      return ( 
        this.loading ?
        this.$locale.status.loading[this.locale] :
        this.$locale.status.itemNotFound[this.locale]
      )
    },
    
    parentCollectionsText() {
      return this.$locale.related.collections[this.locale]
    },
    
    relatedItemsText() {
      return this.$locale.related.items[this.locale]
    },
    
    item() { return (
      this.resourceBySlug(this.$route.params.slug) ||
      this.artworkBySlug(this.$route.params.slug)
    )},
    
    tags() { return (
      this.item &&
      this.item.tags && 
      this.item.tags.length > 0 && 
      this.item.tags 
    )},
    
    locations() { return (
      this.item &&
      this.item.locations && 
      this.item.locations.length > 0 && 
      this.item.locations 
    )},
    
    related() { return ( 
      this.item && [...new Set([
        ...this.relatedItems(this.item, 'accurate'),
        ...this.relatedItems(this.item)
      ])]
    )},  
  },
  watch: {
  
    item(newVal, oldVal) {
      if (!oldVal) {
        this.renderedItem = this.item
      } else {
        this.$refs.item.scroll({
          top: 0,
          behavior: 'smooth'
        })
        this.transitioning = true
        this.renderedItem = {
          ...this.item, 
          ...{ media: [] }
        }
        setTimeout(() => {
          this.renderedItem = this.item
          this.transitioning = false
          if (this.$refs.table) {
            this.$refs.table.$el.scroll({
              top: 0,
              behavior: 'smooth'
            })
          }
        }, 400)
      }
    },
  },
  mounted() {
  
    if (!this.renderedItem) {
      this.renderedItem = this.item
    }
    
  },
  
}
</script>

<style scoped>
.itemContainer {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0em;
  background: var(--white-glass);
  overflow: hidden;
  z-index: 2;
  transform: translateY(0) !important;
}

.fade-enter-from ,
.fade-leave-to {
  padding-top: 10%;
}

.leave .item {
  transform: translateY(-100vh);
  opacity: 0;
}
.item {
  transform: translateY(0vh);
} 
.item {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-height: 100%;
  overflow: scroll;
  transition: all var(--fast) ease;
}

.noItemMessage {
  padding: 15% 5%;
}

.table {
  position: fixed;
  top: calc(100% - 10em);
  left: 6em;
  width: calc(100% - 6em);
  background: var(--lightestorange);
  max-height: 55vh;
  overflow: scroll;
}

.table:hover {
  top: 45vh;
}

.collections {
  background: var(--lightgreen);
  position: fixed;
  top: calc(100% - 18em);
  left: 12em;
  width: calc(100% - 12em);
}
.collections:hover {
  top: 30em;
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
  

.ar .item .circle {
  left: unset;
  right: 1em;
}

.ar .table {
  right: 6em;
  left: unset;
}
.ar .collections {
  right: 12em;
  left: unset;
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

.mobile .table {
  position: relative;
  width: unset;
  left: unset;
}

@media print {
  .indexCard {
    margin: 0;
    max-width: 100%;
  }
  .table {
    display: none;
  }
}

</style>