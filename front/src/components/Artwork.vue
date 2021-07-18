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
    <div 
        class="artwork"
        @mousemove="headerHovered ? hovered = true : hovered = true"
        @mouseleave="hovered = false"
        @click.stop="$emit('clicked')"  
        :style="{
          marginTop: inTable ? 'initial' : randomMargin(),
          marginLeft: inTable ? 'initial' : randomMargin(),
        }"  
    >
      <!-- <div 
        class="header"
        @mousemove="headerHovered = true"
        @mouseleave="headerHovered = false"
      >
        <p 
          class="title"
          v-html="$highlight( title, queries )"
        ></p>
        <p 
          class="artist"
          v-html="$highlight( artist, queries )"
        ></p>
      </div> -->
      <img 
        v-if="media"
        class="cover"
        :src="cover"
      />
    </div>
  </div>
</template>

<script>


import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Artwork',
  components: {
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
    id()          { return this.artwork.id },
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
    ...mapGetters(['queries'])
    
  },
  mounted() {
    // console.log(this.artwork)
  },
  methods: {
  
    randomPosition: () => [
      'flex-start',
      'center',
      'flex-end'
    ][Math.floor(Math.random()*3)],
    
    randomMargin: () => Math.random() * -15 + 'em',

  }
  
}
</script>

<style scoped>

.artworkContainer {
  width: 100%;
  max-width: 100%;
  /* max-height: 50em; */
  /* max-height: 3.5em; */
  max-height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: var(--position);
  transition: all 0.8s ease;
  z-index: 1;
}

.artworkContainer.inTable {
  /* max-height: 3.5em; */
}
/* .artworkContainer.inTable .cover{
  opacity: 0;
} */
.artworkContainer.inTable .header{
  /* opacity: 0; */
}
.artworkContainer.inTable .artwork {
  margin: 0 0.5em;
  box-shadow: none;
}
.artworkContainer.inTable .artwork:hover {
  max-height: 21em;
}
.artworkContainer.inTable .artwork:hover .header {
  opacity: 0;
}
.artwork {
  /* max-width: 24%; */
  position: relative;
  max-width: 42%;
  /* max-width: 32%; */
  /* max-height: 21em; */
  /* max-width: 72%;
  max-height: 73em; */
  max-height: 100%;
  margin: 0 1em;
  font-family: Montserrat;
  /* border: 1px solid lightblue; */
  border-radius: 0.5em;
  /* background: #E3EDFF; */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* background: wheat; */
   /* background: white; */
   /* transition: all 0.2s ease; */
  /* box-shadow: 0 0 10em 10em var(--orange); */
  cursor: pointer;
  box-shadow: 0 0.5em 2em 0 rgba(97, 97, 97, 0.253);
  border: 0.2em solid #e3edff;
}
.header {
  margin: 0.3em;
  box-sizing: border-box;
  padding: 0.6em;
  cursor: pointer;
  position: absolute;
  top: 0;
  background: var(--lightblue);
  width: 98.5%;
  /* transition: all 0.2s ease; */
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
  /* transition: opacity 0.2s ease; */
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