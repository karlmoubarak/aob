<template>
  <div
    v-if="media.length > 0" 
    class="mediaContainer"
  >
    <div 
      class="gallery"
      v-if="media.length > 1"
    >
      <div 
        v-for="(item, key) in media"
        :key="key"
        :class="[ 'icon', type(key), { selected: key == i }]"
        @click="i = key"
      >
        <img 
          class="thumb"
          v-if="type(key) == 'image'"
          :src="thumb(key)"
        /> 
        <video
          class="thumb"
          v-else-if="type(key) == 'video'"
          :controls='false'
          preload="metadata"
          muted
          @click.prevent
        >
          <source :src="source(key) + '#t=0.5'" />
        </video>
        <img
          class="thumb"
          v-else-if="type(key) == 'audio'"
          src="../assets/icons/audio.png"
        />
      </div>
    </div>
    <div class="item">
      <div class="content">
        <img
          v-if="type(i) == 'image'" 
          class="cover"
          :src="cover(i)"
        />
        <video
          class="cover"
          v-else-if="type(i) == 'video'"
          preload="metadata"
          controls
        >
          <source :src="source(i) + '#t=0.01'" />
        </video>
        <audio
          class="cover"
          v-else-if="type(i) == 'audio'"
          controls
        ><source :src="source(i)" />
        </audio>
      </div>
      <div class="caption">{{ caption(i) }}</div>
    </div>
  </div>
  <div 
    v-else
    class="mediaContainer"
  >
    <div class="item err">
      <div class="content">
      {{ $locale.media.mediaNotAvailable[locale] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiMedia",
  props: [ 'media' ],
  data() {
    return {
      i: 0
    }
  },
  computed: {
    locale()      { return this.$store.state.locale },
  },
  watch: {
    media() { this.i = 0 }
  },
  methods: {
    type(i)      { return ( 
      this.media[i].mime.includes('audio') ? 'audio' : 
      this.media[i].mime.includes('video') ? 'video' : 
      this.media[i].mime.includes('image') ? 'image' : 'image'
    )},
    cover(i)     { return this.$apiURL + this.media[i].url },
    thumb(i)     { return (
      this.type(i) == 'image' ? 
      this.$apiURL + this.media[i].formats.thumbnail.url : null
    )},
    source(i)    { return this.$apiURL + this.media[i].url },
    caption(i)   { return this.media[i].caption || this.$locale.media.unknownRights[this.locale] },
  }
}
</script>

<style scoped>

.mediaContainer {
  margin: 1em;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
}


.gallery {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.3em;
  align-items: flex-start;
}

.gallery .icon {
  position: relative;
  cursor: pointer;
  width: 4em;
  height: 4em;
  margin: 0.3em;
}

.gallery .icon .thumb {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.gallery .icon.audio .thumb {
  padding: 1em;
}

.gallery .icon.video::after {
  content: '';
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: url(../assets/icons/video.png);
  background-size: 70% 70%;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.6;
}

.gallery .icon:hover,
.gallery .icon.selected {
  opacity: 0.3;
}


.item {
  max-width: 100%;
}

.item .content {
  min-width: 100%;
  padding: 0.6em;
  border: 1px solid;
  display: flex;
}


.item .content .cover {
  min-width: 100%;
  max-width: 100%;
  /* max-height: 100%; */
}

.item .caption {
  font-style: italic;
  text-align: center;
  margin: 0.3em;
  width: 100%;
}

.mediaContainer .err .content {
  height: 15em;
  justify-content: center;
  align-items: center;
}

</style>