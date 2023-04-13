<template>
  <div
    :class="[
      'itemContainer', {
        fullscreen,
        leave: transitioning,
        lowCollections:related && related.length == 0
      }
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
        @mediaClick="!isMobile && (fullscreen = !fullscreen)"
      />
    </div>
    <div
      v-else
      class="noItemMessage"
    >
      <p> {{ noItemMessage }} </p>
    </div>
    <transition name="down" mode="out-in">
      <CollectionGroup
        v-if="parentCollections(item).length > 0 && arjunaDesiresCollections"
        :collections="parentCollections(item)"
        :headerText="parentCollectionsText"
      />
    </transition>
    <transition name="down" mode="out-in">
      <Table
        v-if="related && related.length > 0"
        ref="table"
        :collectionItems="related"
        :headerText="relatedItemsText"
        @click.stop
      />
    </transition>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions
}                      from 'vuex'
import IndexCard       from '../components/IndexCard'
import CollectionGroup from '../components/CollectionGroup'
import Table           from '../components/Table'

// View to display an artwork or resource combined
// with a collectionGroup of it's parent collections
// if they exist and a Table of items that share tags
// and/or locationns with the given artwork or resource

export default {

  name: 'Page',

  components: {
    IndexCard,
    CollectionGroup,
    Table,
  },

  data() {
    return {
      renderedItem: null,
      transitioning: false,
      fullscreen: false,
      arjunaDesiresCollections: false,
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
        'isMobile'
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
        // ...this.relatedItems(this.item)
      ])]
    )},
  },
  watch: {


    // Custom animation for a change in item since
    // component does not remount.

    item(newVal, oldVal) {
      if (!oldVal) {
        this.renderedItem = this.item
      } else {
        this.$refs.item.scroll({
          top: 0,
          behavior: 'smooth'
        })
        if (this.isMobile) {
          document.documentElement.scroll({ top: 0 })
        }
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
        },400)
      }
    },
  },
  mounted() {

    if (!this.renderedItem) {
      this.renderedItem = this.item
    }

    if (this.isMobile) {
      document.documentElement.scroll({ top: 0 })
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

.itemContainer,
.itemContainer .item,
.itemContainer .table,
.itemContainer .collections {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.itemContainer::-webkit-scrollbar,
.itemContainer .item::-webkit-scrollbar,
.itemContainer .table::-webkit-scrollbar,
.itemContainer .collections::-webkit-scrollbar {
  display: none;
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
  left: 6.5em;
  width: calc(100% - 13em);
  max-height: 55vh;
  overflow: scroll;
  background: var(--lightestorange);
}

.table:hover {
  top: 45vh;
}

.collections {
  background: var(--lightgreen);
  position: fixed;
  top: calc(100% - 18em);
  left: 13em;
  width: calc(100% - 13em);
  max-height: 70vh;
  transition: all var(--slow) ease;
}
.lowCollections .collections {
  top: calc(100% - 10em);
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
  line-height: 0;
  border-radius: 5em;
  z-index: 2;
  border: 1px dashed;
  font-family: Montserrat;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.itemContainer .item .circle * {
  font-size: 3em;
  margin-top: -0.05em;
  line-height: 0;
}

.itemContainer.fullscreen {
  z-index: 3;
  overflow: hidden;
}
.itemContainer.fullscreen .table,
.itemContainer.fullscreen .collections {
  display: none;
}

.fade-enter-from .table,
.fade-enter-from .collections,
.fade-leave-to .table,
.fade-leave-to .collections,
.leave .table,
.leave .collections,
.down-enter-from,
.down-leave-to {
  top: 110%;
}

.ar .item .circle {
  left: unset;
  right: 1em;
}

.ar .table {
  right: 6.5em;
  left: unset;
}
.ar .collections {
  right: 13em;
  left: unset;
}

.mobile .itemContainer {
  position: relative;
  height: unset;
  overflow: unset;
  background: unset;
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

.mobile .table,
.mobile .collections {
  position: relative;
  width: unset;
  left: unset;
  top: unset;
  max-height: unset;
  background: unset;
  padding-top: 3.5em;
}

.printing .circle {
  display: none !important;
}
.printing .collections,
.printing .table {
  display: none;
}

@media print {
  .circle {
    display: none !important;
  }
  .collections,
  .table {
    display: none;
  }
}

</style>
