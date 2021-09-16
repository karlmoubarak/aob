<template>
  <div 
    :class="[
      'artworkContainer',
      { inTable: inTable }
    ]"
    :style="{ 
      '--position': position,
    }"
    
  >
    <div class="col id"> 
      <p 
        v-if="isInMyCollection(slug)"
        class="remove"
        @click.stop="removeFromCollection(artwork)"
      >-</p>
      <p 
        v-else
        class="add"
        @click.stop="addToCollection(artwork)"
      >+</p> 
    </div>
    <div 
        class="artwork"
        @mousemove="headerHovered ? hovered = true : hovered = true"
        @mouseleave="hovered = false"
        @click.stop="$emit('clicked')"  
        :style="{
          marginTop: inTable ? 'initial' : randomMargin(),
          marginLeft: inTable ? 'initial' : 'initial',
        }"  
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
      <MultiMedia 
        v-if="media"
        :media="[media[0]]"
        :border="false"
      />
    </div>
  </div>
</template>

<script>

import { mapGetters, mapState, mapActions } from 'vuex'

import MultiMedia from '../Utils/MultiMedia'

export default {
  name: 'Artwork',
  components: {
    MultiMedia
  },
  props: [
    'artwork',
    'inTable'
  ],
  data() {
    return {
      hovered: false,
      headerHovered: false,
      position: this.randomPosition(),
    }
  },
  computed: {
    locale()      { return this.$store.state.locale },
    id()          { return this.artwork.id },
    slug()        { return this.artwork.slug },
    title()       { return this.artwork.Title },
    artist()      { return this.artwork.ArtistName },
    description() { return this.artwork.Description },
    tags()        { return this.artwork.tags.length > 0 && this.artwork.tags },
    locations()   { return this.artwork.location.length > 0 && this.artwork.location },
    media()       { return this.artwork.Media && this.artwork.Media.length > 0 && this.artwork.Media },
    cover()       { return this.media && this.$apiURL + this.media[0].formats.medium.url },
    link()        { return this.artwork.Link },
    contact()     { return this.artwork.Contact || 'N/A'},
    ...mapState([
      'query'
    ]),
    ...mapGetters([
      'isInMyCollection',
      'queries'
    ]),
    
  },
  mounted() {
    // console.log(this.artwork)
  },
  methods: {
  
    ...mapActions([
      'addToCollection',
      'removeFromCollection'
    ]),
    
    randomPosition: () => [
      'flex-start',
      'center',
      'flex-end'
    ][Math.floor(Math.random()*3)],
    
    // randomMargin: () => Math.random() * -10 + 'em',
    randomMargin: ()=> '1em',

  }
  
}
</script>

<style scoped>

.artworkContainer {
  position: relative;
  width: 100%;
  max-width: 100%;
  /* max-height: 50em; */
  /* max-height: 3.5em; */
  /* max-height: 100%; */
  display: flex;
  align-items: flex-start;
  justify-content: var(--position);
  transition: all var(--veryslow) ease;
  /* z-index: 1; */
}

.artworkContainer.inTable {
  /* max-height: 3.5em; */
}
/* .artworkContainer.inTable .cover{
  opacity: 0;
} */
.artworkContainer.inTable .header{
  opacity: 0;
  height: 0;
  margin: 0;
  padding: 0;
}
.artworkContainer.inTable .artwork {
  margin: 0 0.5em;
  box-shadow: none;
  max-height: 21em;
  opacity: 0.3;
}
.artworkContainer.inTable .artwork:hover {
  max-height: 21em;
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
  /* max-width: 24%; */
  box-sizing: border-box;
  position: relative;
  max-width: 42%;
  max-height: 100%;
  margin: 0 1em;
  font-family: Montserrat;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all var(--fast) ease;
  cursor: pointer;
  box-shadow: 0 0.5em 2em 0 rgba(97, 97, 97, 0.253);
  border: 0.2em solid #e3edff;
  background: #e3edff;
}
.header {
  margin: 0.3em;
  box-sizing: border-box;
  padding: 0.6em;
  cursor: pointer;
  top: 0;
  background: var(--lightblue);
  width: 98.5%;
  /* transition: all var(--fast) ease; */
  /* height: 100%; */
  border-radius: inherit;
}
.header p {
  /* background: var(--lightblue); */
}
.artwork p {
  margin: 0;
}
.title {
  font-style: italic;
}
.artist {
  /* font-weight: bold; */
}
.cover {
  width: 100%;
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  max-height: 100%;
  border-radius: inherit;
}

.mobile .artworkContainer,
.mobile .artworkContainer.inTable .artwork {
  margin: 0;
}

.mobile .artwork {
  max-width: 100%;
  max-height: 10em;
}

</style>