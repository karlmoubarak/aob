<template>
  <div 
    :class="[ 'artworkContainer', { inTable }]"
    :style="{ '--position': position }"
  >
    <div 
      class="col id"
      @click.stop="
        isInMyCollection(slug) ? 
        removeFromCollection(artwork) :
        addToCollection(artwork)
      "
    > 
      <p 
        v-if="isInMyCollection(slug)"
        class="remove"
      >-</p>
      <p 
        v-else
        class="add"
      >+</p> 
    </div>
    <div 
        class="artwork"
        @click.stop="$emit('clicked')"  
    >
      <div 
        class="header"
      >
        <p 
          class="title"
          v-html="$highlight( title, queries )"
        ></p>
        <p 
          class="artist"
          v-html="$highlight( artist, queries )"
        ></p>
      </div>
      <Gallery 
        v-if="media"
        :media="[media[0]]"
        :border="false"
        :showCredits="false"
        @mediaClick="$emit('clicked')"
      />
    </div>
  </div>
</template>

<script>

import { mapGetters, mapState, mapActions } from 'vuex'
import Gallery from '../Utils/Gallery'

export default {
  name: 'Artwork',
  components: {
    Gallery
  },
  props: [
    'artwork',
    'inTable'
  ],
  computed: {
    ...mapState ([ 
      'query' 
    ]),
    ...mapGetters ([
      'isInMyCollection',
      'queries'
    ]),
    locale()      { return this.$store.state.locale },
    id()          { return this.artwork.id },
    slug()        { return this.artwork.slug },
    title()       { return this.artwork.title },
    artist()      { return this.artwork.artistName },
    description() { return this.artwork.description },
    tags()        { return this.artwork.tags.length > 0 && this.artwork.tags },
    locations()   { return this.artwork.locations.length > 0 && this.artwork.locations },
    media()       { return this.artwork.media && this.artwork.media.length > 0 && this.artwork.media },
    cover()       { return this.media && this.$apiURL + this.media[0].formats.medium.url },
    link()        { return this.artwork.link },
    position()    { return this.getPosition() },
    contact()     { return this.artwork.contact || 'N/A'},
  },
  methods: {
  
    ...mapActions([
      'addToCollection',
      'removeFromCollection'
    ]),
    
    getPosition() { return (
      this.artwork.align 
       && 
        this.artwork.align == 'left'   ? 'flex-start' :
        this.artwork.align == 'center' ? 'center'     :
        this.artwork.align == 'right'  ? 'flex-end'   :
        this.randomPosition() 
       ||
      this.randomPosition()
    )},
    
    randomPosition: () => [
      'flex-start',
      'center',
      'flex-end'
    ][Math.floor(Math.random()*3)],

  }
  
}
</script>

<style scoped>

.artworkContainer {
  position: relative;
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: var(--position);
  transition: all var(--veryslow) ease;
}

.artworkContainer.inTable .header{
  opacity: 0;
  height: 0;
  margin: 0;
  padding: 0;
  /* position: absolute; */
}
.artworkContainer.inTable .artwork {
  margin: 0 0.5em;
  box-shadow: none;
  max-height: 100em;
  opacity: 0.3;
}
.artworkContainer.inTable .artwork:hover {
  /* max-height: 21em; */
  z-index: 3;
  opacity: 1;
  border-color: var(--highlight);
box-shadow: 0 0 1.5em 0 var(--highlight);
  /* animation: fadein 1s ease forwards; */
}
@keyframes fadein {
  0% { opacity: 0.3; }
  75% { opacity: 0.3; }
  100% { opacity: 1; }
}
@keyframes fadein {
  0% { max-height: 21em; }
  50% { max-height: 100%; }
  100% { max-height: 21em;
  z-index: 3;
   }
}
.artworkContainer.inTable .artwork:hover .header {
  opacity: 0;
}

.artworkContainer .id {
  position: absolute;
  left: 0;
  background: unset;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
  height: 100%;
  cursor: pointer;
  z-index: 1;
}
.artworkContainer:hover .id {
  opacity: 1;
}
.artworkContainer:hover .id:hover {
  background: white;
}
.artwork {
  box-sizing: border-box;
  position: relative;
  margin: 0 1em;
  max-width: 42%;
  max-height: 100%;
  overflow: hidden;
  border-radius: 0.5em;
  border: 0.2em solid #e3edff;
  background: #e3edff;
  box-shadow: 0 0.5em 2em 0 rgba(97, 97, 97, 0.253);
  font-family: Montserrat;
  transition: all var(--fast) ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

#exhibition .table .artwork {
  box-shadow: 0 0.5em 8em 0 var(--white-glass);
}

.header {
  box-sizing: border-box;
  margin: 0.3em;
  padding: 0.6em;
  width: 98.5%;
  cursor: pointer;
  background: var(--lightblue);
  border-radius: inherit;
  z-index: 1;
}
.artwork p {
  margin: 0;
}
.title {
  font-style: italic;
}
.cover {
  width: 100%;
  max-height: 100%;
  border-radius: inherit;
}

.mobile .artworkContainer,
.mobile .artworkContainer.inTable .artwork {
  margin: 0;
  opacity: 1;
}

.mobile .artwork {
  max-width: 100%;
  width: 100%;
  max-height: 100em;
  margin: 0.5em;
}



</style>
