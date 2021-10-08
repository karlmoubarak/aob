<template>
  <div 
    :class="[
      'table', { 
        artworksOnly: artworksOnly,
        myCollection: isMyCollection,
      }
    ]">
    <h2 v-if="headerText">{{ headerText }}</h2>
    <transition name="list" mode="out-in">
      <TableHeaders 
        v-if="!printing && !artworksOnly"
      />
    </transition>
    <transition name="list" mode="out-in">
      <p v-if="items.length == 0" class="empty">{{ emptyMessage }} </p>
    </transition>
    <draggable v-if="isMyCollection" v-model="items" >
      <transition-group name="list" mode="out-in">
        <div
          v-for="item in items"
          :key="item.slug"
          :class="['row', { artworkTR: item.title }]"
        >
          <IndexCard 
            v-if="printing"
            :item="item"
          />
          <Resource
            v-else-if="item.organisation"
            :resource="item"
            @clicked="goToItem(item)"    
          />
          <Artwork 
            v-else
            :artwork="item"
            :inTable="!artworksOnly"
            @clicked="goToItem(item)"    
          />
        </div>
      </transition-group>
    </draggable>
    <transition-group v-else-if="items.length > 0" name="list" mode="out-in">
      <div
        v-for="item in items"
        :key="item.slug"
        :class="[
          'row', { 
            artworkTR: item.title,
          }
        ]"
      >
        <IndexCard 
          v-if="printing"
          :item="item"
        />
        <Resource
          v-else-if="item.organisation"
          :resource="item"
          @clicked="goToItem(item)"    
        />
        <Artwork 
          v-else
          :artwork="item"
          :inTable="!artworksOnly"
          @clicked="goToItem(item)"    
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
import Artwork              from './Artwork'
import Resource             from './Resource'
import TableHeaders         from './TableHeaders'
import IndexCard            from  '../IndexCard'
import { VueDraggableNext } from 'vue-draggable-next'

export default {
  name: 'Table',
  components: {
    TableHeaders,
    Resource,
    Artwork,
    IndexCard,
    draggable: VueDraggableNext,
  },
  props: [
    'collectionItems',
    'emptyMessage',
    'isMyCollection',
    'headerText'
  ],
  computed: {
    items: {
      get() { return this.collectionItems },
      set(val) { return this.isMyCollection && this.$store.dispatch('updateMyCollection', { items: val }) }
    },
    artworksOnly() {
      return !this.items.find(i => i && i.organisation)
    },
    printing() {
      return this.$store.state.printing
    },
  },
  methods: {
    goToItem(item) {
      this.$router.push({
        name: item.title ? "Artwork" : "Resource",
        params: { slug: item.slug }
      })
    }
  }

}
</script>

<style >

.table {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  /* margin-top: 1em; */
  padding: 0 0.5em;
  transition: all var(--slow) ease;
  height: 100%;
  /* max-height: 200vh; */
  background: inherit;
}
.table h2 {
  position: sticky;
  top: 0.5em;
  font-family: Montserrat;
  width: 100%;
  margin: 0.5em;
  font-weight: normal;
}
.row {
  position: relative;
  box-sizing: border-box;
  display: flex;
  /* cursor: pointer; */
  max-height: 10em;
  width: 100%;
  margin-bottom: 0.5em;
  /* overflow: hidden; */
}

.myCollection  {
  height: auto;
}
.myCollection .row,
.myCollection .row .col.description {
  cursor: move !important;
}
.row.artworkTR {
  max-height: 3.5em;
  
}
.row.artworkTR:hover {
  /* z-index: 3; */
}
.artworksOnly .row.artworkTR {
  max-height: 100em;
}

.artworksOnly .row.artworkTR .col.id {

  display: none;

}

.artworkTD {
  display:block;
  width: 100%;
}

.row:not(.artworkTR):hover .col {
  background-color: var(--highlight);
  /* background: var(--highlight); */
  /* box-shadow: 0 0px 8px 2px var(--highlight); */
}

.move {
  display: block;
  position: absolute;
  font-size: 1.5em;
}

.empty {
  margin: 5em 2em;
}


.col {
  position: relative;
  box-sizing: border-box;
  min-width: 100%;
  padding: 0.5em;
  margin: 0 0.25em;
  background: white;
  overflow: hidden;
  display: flex;
  transition: all var(--fast) ease;
}
.col.id {
  flex-basis: 4%;
  min-width: 4%;
  max-width: 4%;
}
.col.tags {
  flex-basis: 8%;
  min-width: 8%;
  max-width: 8%;
}
.col.locations {
  flex-basis:8%;
  min-width: 8%;
  max-width: 8%;
}
.col.organisation {
  flex-basis: 12%;
  min-width: 12%;
  max-width: 12%;
  /* font-family: 'montserrat'; */
}
.col.description { 
  flex-basis: 33%;
  min-width: 33%;
  max-width: 33%;
}
.col.link {
  flex-basis: 6%;
  min-width: 6%;
  max-width: 6%;
}
.col.contact {
  flex-basis: 23.5%;
  min-width: 23.5%;
  /* flex-grow: 1; */
  /* max-width: 23%; */
}
.col p {
  margin: 0;
}
.col.link a {
  text-decoration: none;
}
.col.id .add,
.col.id .remove {
  font-size: 2em;
}

.col.id .add {
  color: var(--orange);
}




.list-enter-active,
.list-leave-active {
  transition: all var(--slow) ease;
}

.list-leave-to,
.list-leave-from {
  transition: all var(--slow) ease;
  
}

.list-enter-from,
.list-leave-to {
  max-height: 0 !important;
  margin: 0;
  transform: translateY(-5em);
  opacity: 0;
}

.mobile .table {
  margin-top: 0.5em;
  max-height: unset;
  padding: 0;
}

.mobile .row {
  /* flex-direction: column; */
  flex-wrap: wrap;
  max-height: 30em;
}

.mobile .row.artworkTR {
  max-height: 200em;
}

.mobile .col {
  margin: 0;
}

.mobile .col.locations,
.mobile .col.description {
  flex-basis: 100%;
  min-width: 100%;
  max-width: unset;
}

.mobile .col.id {
  flex-basis: 10%;
  min-width: 10%;
  max-width: 10%;
}
.mobile .col.tags,
.mobile .col.col.link {
  flex-basis: 50%;
  min-width: 50%;
  max-width: 50%;
}
.mobile .col.organisation {
  flex-basis: 90%;
  min-width: 90%;
  max-width: 90%;
}
.mobile .col.contact {
  flex-basis: 100%;
  min-width: 100%;
  max-width: 100%;
}

.printing .table {
  margin: 0;
  padding: 0;
}

.printing .row {
  display: block;
  max-height: unset;
  min-height: 100vh;
  page-break-after: always;
  margin: 0;
}

@media print {
  .table {
    margin: 0;
    padding: 0;
  }
  .row {
    display: block;
    max-height: unset;
    min-height: 100vh;
    page-break-after: always;
    margin: 0;
  }
  
}

</style>