<template>
  <div 
    :class="[
      'table', { 
        artworksOnly: artworksOnly,
        myCollection: isMyCollection
      }
    ]">
    <transition name="list" mode="out-in">
      <TableHeaders v-if="!artworksOnly"/>
    </transition>
    <transition name="list" mode="out-in">
      <p v-if="items.length == 0" class="empty">{{ emptyMessage }} </p>
    </transition>
    <draggable v-if="isMyCollection" v-model="items" >
      <transition-group name="list" mode="out-in">
        <div
          v-for="item in items"
          :key="item.slug"
          :class="['row', { artworkTR: item.Title }]"
        >
          <Resource
            v-if="item.Organisation"
            :resource="item"
            @clicked="clickHandler(item)"    
          />
          <Artwork 
            v-else
            :artwork="item"
            :inTable="!artworksOnly"
            @clicked="clickHandler(item)"    
          />
        </div>
      </transition-group>
    </draggable>
    <transition-group v-else name="list" mode="out-in">
      <div
        v-for="item in items"
        :key="item.slug"
        :class="['row', { artworkTR: item.Title }]"
      >
        <Resource
          v-if="item.Organisation"
          :resource="item"
          @clicked="clickHandler(item)"    
        />
        <Artwork 
          v-else
          :artwork="item"
          :inTable="!artworksOnly"
          @clicked="clickHandler(item)"    
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
import Artwork              from './Artwork'
import Resource             from './Resource'
import TableHeaders         from './TableHeaders'
import { VueDraggableNext } from 'vue-draggable-next'

export default {
  name: 'Table',
  components: {
    TableHeaders,
    Resource,
    Artwork,
    draggable: VueDraggableNext
  },
  props: [
    'collectionItems',
    'emptyMessage',
    'isMyCollection',
  ],
  computed: {
    items: {
      get() { return this.collectionItems },
      set(val) { return this.isMyCollection && this.$store.commit('updateMyCollection', { items: val }) }
    },
    artworksOnly() {
      return !this.items.find(i => i.Organisation)
    },
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

<style >

.table {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  margin-top: 1em;
  padding: 0 0.5em;
  transition: all 0.5s ease;
  height: 100%;
  /* max-height: 200vh; */
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
  z-index: 3;
}
.artworksOnly .row.artworkTR {
  max-height: 100em;
}
.artworkTD {
  display:block;
  width: 100%;
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
  transition: all 0.2s ease;
  min-width: 100%;
  padding: 0.5em;
  margin: 0 0.25em;
  background: white;
  overflow: hidden;
  display: flex;
}
.col.id {
  flex-basis: 3%;
  min-width: 3%;
  max-width: 3%;
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
}
.col.description { 
  flex-basis: 35%;
  min-width: 35%;
  max-width: 35%;
}
.col.source {
  flex-basis: 6%;
  min-width: 6%;
  max-width: 6%;
}
.col.contact {
  flex-basis: 24.5%;
  min-width: 24.5%;
  /* flex-grow: 1; */
  /* max-width: 23%; */
}
.col p {
  margin: 0;
}
.col.source a {
  text-decoration: none;
}
.col.id .add,
.col.id .remove {
  font-size: 2em;
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

.mobile .col {
  margin: 0;
}

.mobile .col.tags,
.mobile .col.locations,
.mobile .col.description {
  flex-basis: 100%;
  min-width: 100%;
  max-width: unset;
}

.mobile .col.id,
.mobile .col.col.source {
  flex-basis: 10%;
  min-width: 10%;
  max-width: 10%;
}

.mobile .col.organisation,
.mobile .col.contact {
  flex-basis: 90%;
  min-width: 90%;
  max-width: 90%;
}

</style>