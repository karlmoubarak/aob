<template>
  <div
    v-if="computedMedia.length > 0" 
    class="gallery"
  >
    <div 
      v-if="computedMedia.length > 1 || uploadedMedia.length > 0"
      class="picker"
    >
      <Thumb
        v-for="(item, key) in computedMedia"
        :key="key"
        :selected="key == i"
        :editable="editable"
        :type="type(key)"
        :source="source(key)"
        :thumb="thumb(key)"
        @select="i = key"
        @remove="removeFile(key)"
      />
      <div 
        v-if="editable"
        class="add"
        @click="$refs.fileupload.click()"
      >
        <span class="plus">+</span>
        <input 
          v-if="editable"
          class="fileupload"
          ref="fileupload" 
          name="files" 
          type="file" 
          multiple
          accept="image/*,audio/*,video/*"
          @change="addFile"
        />
      </div>
    </div>
    <Media
      :editable="editable"
      :border="border"
      :type="type(i)"
      :source="source(i)"
      :cover="cover(i)"
      :caption="caption(i)"
      :showCredits="showCredits"
      @setCaption="uploadedMedia[i].caption = $event.target.value"  
      @click="$emit('mediaClick')"
    />
  </div>
  <div 
    v-else-if="editable"
    class="gallery"
  >
    <div class="item add">
      <div 
        class="content"
        @click="$refs.fileupload.click()"
      >
        <span class="plus">+</span>
        <input 
          v-if="editable"
          class="fileupload"
          ref="fileupload" 
          name="files" 
          type="file" 
          multiple
          accept="image/*,audio/*,video/*"
          @change="addFile"
        />
      </div>
    </div>
  </div>
  <div 
    v-else
    class="gallery"
  >
    <div class="item border err">
      <div class="content">
      {{ $locale.media.mediaNotAvailable[locale] }}
      </div>
    </div>
  </div>
</template>

<script>
import Media from './Media'
import Thumb from './Thumb'

export default {
  name: "Gallery",
  components: { 
    Thumb,
    Media
  },
  props: [ 
    'media', 
    'droppedMedia',
    'border', 
    'editable',
    'dragging',
    'showCredits'
  ],
  emits: [
    'mediaClick'
  ],
  data() {
    return {
      i: 0,
      uploadedMedia: [],
      fullscreen: false,
    }
  },
  computed: {
    locale()      { return this.$store.state.locale },
    computedMedia() { return (
      this.editable ?
      this.uploadedMedia : 
      this.media 
    )}
  },
  watch: {
    media() { this.i = 0 },
    droppedMedia(e) { 
      this.addFile(e)
    }
  },
  methods: {
    type(i)      { return ( 
      this.computedMedia[i].mime.includes('audio') ? 'audio' : 
      this.computedMedia[i].mime.includes('video') ? 'video' : 
      this.computedMedia[i].mime.includes('image') ? 'image' : 'image'
    )},
    cover(i)     { return (
      this.editable ? 
      this.computedMedia[i].src :
      this.$apiURL + this.computedMedia[i].url 
    )},
    thumb(i)     { return (
      this.type(i) == 'image' ? 
        this.editable ? this.computedMedia[i].src :
        this.$apiURL + this.computedMedia[i].formats.thumbnail.url : null
    )},
    source(i)    { return (
      this.editable ? this.computedMedia[i].src :
      this.$apiURL + this.computedMedia[i].url 
    )},

    caption(i)   { return (
      this.computedMedia[i].caption || 
      this.$locale.media.unknownRights[this.locale] 
    )},
    
    addFile(e) {
      if (this.i < 0 ) {
        this.i = 0
      }
      e.preventDefault()
      e.stopPropagation()
      const 
        files = 
          e.dataTransfer ? 
          e.dataTransfer.files :
          e.target.files
      for (let file of files) {
        file.mime = file.type
        file.src = URL.createObjectURL(file)
        this.uploadedMedia.push(file)
      }
    },
    removeFile(key) {
      if (this.i >= 0 && this.i >= this.uploadedMedia.length-1) {
        this.i --
      } else {
        this.i = 0
      }
      this.uploadedMedia.splice(key, 1) 
    }
  }
}
</script>

<style scoped>

.gallery {
  position: relative;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

.gallery .picker {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.3em;
  align-items: flex-start;
}

.gallery .add {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
}
.gallery .add:hover {
  background: var(--lightestorange);
}
.gallery .plus {
  font-family: 'Courier New', Courier, monospace;
  font-size: 6em;
  user-select: none;
}
.gallery .picker .add {
  position: relative;
  cursor: pointer;
  width: 4em;
  height: 4em;
  margin: 0.3em;
}
.gallery .picker .add .plus {
  font-size: 3em;
}
.gallery .item.add {
  border: 1px solid;
}
.gallery .item.add .content {
  height: 15em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.gallery .fileupload {
  visibility: hidden;
  width: 0;
  height: 0;
}

.gallery .err .content {
  height: 15em;
  justify-content: center;
  align-items: center;
}

.fullscreen .gallery {
  position: fixed;
  top: 0; left: 0;
  height: 100%; width: 100%;
  z-index: 500;
  background: var(--white-glass);
  filter: drop-shadow( 0 0 40em var(--white-glass));
  align-items: stretch;
}


</style>
