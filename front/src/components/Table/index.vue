<template>
  <div 
    :class="[ 'table', { artworksOnly,
      myCollection: isMyCollection,
    }]"
  >
    <h2 v-if="headerText">{{ headerText }}</h2>
    <transition name="list" mode="out-in">
      <TableHeaders 
        v-if="!printing && !artworksOnly"
      />
    </transition>
    <transition name="list" mode="out-in">
      <p v-if="items.length == 0" class="empty">{{ emptyMessage }} </p>
    </transition>
    <VueDraggableNext v-if="isMyCollection" v-model="items" >
      <transition-group name="list" mode="out-in">
        <div
          v-for="item in items"
          :key="item.slug"
          :id="item.slug"
          :class="['row', { artworkTR: item.title }]"
          @click.stop="isMobile && goToItem(item)"
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
    </VueDraggableNext>
    <transition-group v-else-if="items.length > 0" name="list" mode="out-in">
      <div
        v-for="item in items"
        :key="item.slug"
        :id="item.slug"
        :class="['row', { artworkTR: item.title }]"
        @click.stop="isMobile && goToItem(item)"
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
import IndexCard            from '../IndexCard'
import { VueDraggableNext } from 'vue-draggable-next'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Table',
  components: {
    TableHeaders,
    Resource,
    Artwork,
    IndexCard,
    VueDraggableNext,
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

    artworksOnly() { return !this.items.find(i => i && i.organisation) },

    ...mapState([
      'printing',
      'isMobile'
    ]),

    ...mapGetters([
      'isInExhibition'
    ])

  },
  methods: {
    goToItem(item) {
      this.$router.push({
        name: item.title ? "Artwork" : "Resource",
        params: { slug: item.slug },
      })
    }
  },

  mounted() {

    this.$router.afterEach((to, from) => {
      if (!this.isMobile &&
          ['Resource', 'Artwork'].includes(from.name) &&
          ['Archive', 'Exhibition'].includes(to.name)) {
        setTimeout(() => {
          const el = document.getElementById(from.path.split('/')[2])
          if (el) {
            document.querySelector('main').scrollTo({
              top: el.offsetTop - 100,
              behavior: 'smooth',
            })
          } 
        }, 250)
      }
    })
  }

}
</script>

<style >

.table {
  box-sizing: border-box;
  position: relative;
  width: 100%; height: 100%;
  padding: 0 0.5em;
  background: inherit;
  transition: all var(--slow) ease;
  /* max-height: 100%; */
}

.table h2 {
  position: sticky;
  width: 100%;
  top: 0.5em;
  margin: 0.5em;
  font-family: Montserrat;
  font-weight: normal;
}

.row {
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  margin-bottom: 0.5em;
  max-height: 10em;
  /* cursor: pointer; */
  /* overflow: hidden; */
}

.table.myCollection  {
  height: auto;
}
.table.myCollection .row,
.table.myCollection .row .col.description {
  cursor: move !important;
}
.table .row.artworkTR {
  max-height: 5em;  
}

.table.artworksOnly .row.artworkTR {
  max-height: 100em;
}

.table.artworksOnly .row.artworkTR .col.id {
  display: none;
}

.table .row:not(.artworkTR, .header):hover .col {
  background-color: var(--highlight);
}

.table .row.move {
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
  overflow: hidden;
  background: white;
  transition: all var(--fast) ease;
  display: flex;
  flex-basis: var(--width);
  min-width: var(--width);
  max-width: var(--width);
}
.col.id {
  --width: 4%;
}
.col.tags,
.col.locations {
  --width: 8%;
}
.col.organisation {
  --width: 14%;
}
.col.description { 
  --width: 33%;
}
.col.link {
  --width: 6%;
}
.col.contact {
  --width: 24%;
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
.list-leave-active,
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
  /* min-height: unset; */
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
    /* min-height: unset; */
    page-break-after: always;
    margin: 0;
  }
  
}

</style>
