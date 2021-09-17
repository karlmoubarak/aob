<template>
  <div 
    :class="[
      'itemContainer',
      { relatedItemsVisible: relatedItemsVisible },
      transitionClass
    ]"
    ref="itemContainer"
    @click.stop="$router.push(parentRoute)"
  >
    <div 
      v-if="renderedItem" 
      class="item"
      @scroll="handleScroll"
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
    <Table
      v-if="relatedItems.length > 0"
      ref="table"
      :collectionItems="relatedItems"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @click.stop="relatedItemsVisible = !relatedItemsVisible"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import IndexCard                  from '../components/IndexCard'
import Table                      from '../components/Table'

export default {
  name: 'Page',
  components: {
    Table,
    IndexCard
  },
  data() {
    return {
      renderedItem: null,
      hovered: false,
      top: 10,
      relatedItemsVisible: false,
      transitionClass: null,
    }
  },
  computed: {
  
    ...mapGetters([
      'resourceBySlug',
      'artworkBySlug',
      'mainCollection',
      'isInMyCollection'
    ]),
    
    parentRoute() {
      return this
      .$store
      .state
      .history
      .filter(p => 
        p.split('/').length == 2
       ||
        p.includes('collections')
      )[0] 
       || '/archive'
    },
    
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
    
    locations() { return (
      this.item &&
      this.item.locations && 
      this.item.locations.length > 0 && 
      this.item.locations 
    )},
    
    relatedItems() {
      return this.mainCollection
        .filter(i => 
          i.slug != this.item.slug
          && (
          this.tags &&
          i.tags
          .map(t => t.Name)
          .every(
            n => this.tags.map(t => t.Name)
          .indexOf(n) > -1
          ||
          this.locations &&
          i.locations
          .map(t => t.Name)
          .every(
            n => this.locations.map(t => t.Name)
          .indexOf(n) > -1
          )
          ))
      )
    }  
  },
  watch: {
  
    item(newVal, oldVal) {
      if (!oldVal) {
        this.renderedItem = this.item
      } else {
        this.$refs.itemContainer.scroll({
          top: 0,
          behavior: 'smooth'
        })
        this.transitionClass = 'leave'
        setTimeout(() => {
          this.renderedItem = this.item
          this.transitionClass = 'enter'
        }, 200)
      }
    },
    
  },
  mounted() {
  
    if (!this.renderedItem) {
        this.renderedItem = this.item
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

.leave .item {
  transform: translateY(-100vh);
  opacity: 0;
}
.enter .item {
  transform: translateY(0vh);
}

  
.item {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  /* max-height: calc(100% - 20em); */
  max-height: 100%;
  overflow: scroll;
  transition: all var(--fast) ease;
}

.table {
  position: fixed;
  top: calc(100% - 10em);
  left: 10em;
  width: calc(100% - 10em);
  /* margin-left: 10em; */
  background: var(--lightestorange);
  max-height: 55vh;
  overflow: scroll;
  /* z-index: 4; */
}

.table:hover {
  top: 45vh;
  
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
  
.relatedItemsVisible table {
  top: 10em;
  box-shadow: 0 50em 200em 200em #ffffffa4;
}

.ar .item .circle {
  left: unset;
  right: 1em;
}

.ar .table {
  right: 10em;
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


</style>