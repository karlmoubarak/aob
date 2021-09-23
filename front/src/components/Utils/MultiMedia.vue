<template>
  <div
    v-if="computedMedia.length > 0" 
    class="mediaContainer"
  >
    <div 
      class="gallery"
      v-if="computedMedia.length > 1 || uploadedMedia.length > 0"
    >
      <div 
        v-for="(item, key) in computedMedia"
        :key="key"
        :class="[ 'icon', type(key), { selected: key == i }]"
        @click.stop="i = key"
      >
        <div
          v-if="editable"
          class="remove"
          @click.stop="removeFile(key)"
        >
          <span>x</span>  
        </div>
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
          src="../../assets/icons/audio.png"
        />
      </div>
      <div 
        v-if="editable"
        class="icon image"
      >
        <div 
          class="thumb add"
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
      :class="[ 
        'item', 
        { border: border } 
      ]"
    >
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
       <input
          v-if="editable"
          type="text"
          name="caption"
          ref="caption"
          class="caption"
          placeholder="Add copy right information"
          :value="uploadedMedia[i].caption"
          @input="uploadedMedia[i].caption = $event.target.value"
        />
      <div 
        v-else-if="showCredits"
        class="caption"
      >
        {{ caption(i) }}
      </div>
    </div>
  </div>
  <div 
    v-else-if="editable"
    class="mediaContainer"
  >
    <div class="item border add">
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
    class="mediaContainer"
  >
    <div class="item border err">
      <div class="content">
      {{ $locale.media.mediaNotAvailable[locale] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiMedia",
  props: [ 
    'media', 
    'droppedMedia',
    'border', 
    'editable',
    'dragging',
    'showCredits'
  ],
  data() {
    return {
      i: 0,
      uploadedMedia: [],
    }
  },
  computed: {
    locale()      { return this.$store.state.locale },
    computedMedia() { return (
      this.editable ?
      this.uploadedMedia : 
      this.media 
    ) }
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
    caption(i)   { return this.computedMedia[i].caption || this.$locale.media.unknownRights[this.locale] },
    
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
        // console.log(file)
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

.mediaContainer {
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
  background: url(../../assets/icons/video.png);
  background-size: 70% 70%;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.6;
}

.gallery .icon .remove {
  box-sizing: border-box;
  position: absolute;
  top: -0.4em;
  left: -0.4em;
  height: 1em;
  width: 1em;
  padding: 0.1em;
  padding-bottom: 0.3em;
  z-index: 2;
  /* font-size: 1.5em; */
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--orange);
  color: white;
  border-radius: 10em;
  opacity: 0;
  pointer-events: none;
}

.gallery .icon:hover .thumb,
.gallery .icon.selected .thumb {
  opacity: 0.3;
}

.gallery .icon.selected .remove,
.gallery .icon:hover .remove {
  opacity: 1;
  pointer-events: all;
}


.item {
  max-width: 100%;
}

.item .content {
  box-sizing: border-box;
  min-width: 100%;
  display: flex;
}

.item.border .content {
  padding: 0.6em;
  border: 1px solid;
}


.item .content .cover {
  box-sizing: border-box;
  min-width: 100%;
  max-width: 100%;
  /* max-height: 100%; */
}

.item .caption {
  box-sizing: border-box;
  font-style: italic;
  text-align: center;
  margin: 0.3em 0;
  width: 100%;
}

.item input.caption {
  background: var(--lightestorange);
  border: none;
  outline: none;
  resize: none;
  box-sizing: border-box;
  padding: 0.3em;
}


.mediaContainer .item.add {
}

.mediaContainer .item.add .content  {
  height: 15em;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.mediaContainer .item.add .content:hover {
  background: var(--lightestorange);
}

.mediaContainer .fileupload {
  visibility: hidden;
  width: 0;
  height: 0;
}
.plus {
  font-family: 'Courier New', Courier, monospace;
  font-size: 6em;
  user-select: none;
}
.mediaContainer .gallery .icon .add {
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  padding-top: 0.35em;
  
}
.mediaContainer .gallery .icon .add .plus {
  font-size: 3em;
}
.mediaContainer .err .content {
  height: 15em;
  justify-content: center;
  align-items: center;
}


</style>