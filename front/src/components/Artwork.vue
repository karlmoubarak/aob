<template>
  <div 
    :class="[
      'artworkContainer',
      { inTable: inTable && !hovered }
    ]"
    :style="{ '--position': position }"
    
  >
    <div 
        class="artwork"
        @mousemove="headerHovered ? hovered = true : hovered = true"
        @mouseleave="hovered = false"
    >
      <div 
        class="header"
        @mousemove="headerHovered = true"
        @mouseleave="headerHovered = false"
      >
        <p 
          class="title"
          v-html="$highlight( title, query )"
        ></p>
        <p 
          class="artist"
          v-html="$highlight( artist, query )"
        ></p>
      </div>
      <img 
        v-if="media"
        class="cover"
        :src="cover"
      />
    </div>
  </div>
</template>

<script>


import { mapState } from 'vuex'

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
      position: this.randomPosition()
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
    
  },
  mounted() {
    // console.log(this.artwork)
  },
  methods: {
  
    randomPosition: () => [
      'flex-start',
      'center',
      'flex-end'
    ][Math.floor(Math.random()*3)]
    
  }
  
}
</script>

<style scoped>

@font-face {
  font-family: jovanny;
  src: url(../assets/jovanny.otf) format(OpenType);
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: Montserrat;
  src: url(../assets/Montserrat.otf);
  font-weight: normal;
  font-style: normal;
}


.artworkContainer {
  max-width: 100%;
  max-height: 50em;
  display: flex;
  align-items: flex-start;
  justify-content: var(--position);
  transition: all 0.8s ease;
}

.artworkContainer.inTable {
  max-height: 3.5em;
}
.artworkContainer.inTable .artwork {
  /* margin: 0 0.5em; */
}
.artwork {
  /* max-width: 24%; */
  max-width: 32%;
  max-height: 21em;
  /* max-width: 72%;
  max-height: 73em; */
  margin: 0 1em;
  font-family: Montserrat;
  border: 1px solid lightblue;
  border-radius: 0.5em;
  background: #E3EDFF;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* background: wheat; */
   /* background: white;*/
}
.header {
  padding: 0.5em;
  cursor: pointer;
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
}

.list-item {
}
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  /* margin-top: -50px; */
  transform: translateY(-50px);
  /* transform: scaleY(0), translateY(-30px); */
  transition: all 0.2s ease;
}
</style>