<template>
  <div 
    :class="[
      'artworkContainer',
    ]"
  >
    <div 
      v-if="artwork"
      class="artwork"
    >
      <div class="header">
        <p class="title">{{ title }}</p>
        <p class="artist">{{ artist }}</p>
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


import { mapGetters } from 'vuex'

export default {
  name: 'Artwork',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    artwork() { return (
      this.artworkBySlug(
        this.$route.params.slug
      )
    )},
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
    ...mapGetters([
      'artworkBySlug'
    ]),
    
  },
  mounted() {
  },
  methods: {
  }
  
}
</script>

<style scoped>


@font-face {
  font-family: Montserrat;
  src: url(../assets/Montserrat.otf);
  font-weight: normal;
  font-style: normal;
}


.artworkContainer {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0em;
  background: #ffffffa4;
  overflow: scroll;
  padding-bottom: 40em;
}


.artwork {
  /* max-width: 24%; */
  margin: 6em 5em;
  position: relative;
  max-width: 32%;
  max-height: 21em;
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
  position: absolute;
  top: 0;
  background: #E3EDFF;
  width: 100%;
  transition: all 0.2s ease;
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