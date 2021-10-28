<template>
  <div 
    dir="ltr"
    @click.stop="$router.push('/info')" 
    :class="['upload', {
      post: status.includes('Sent')
    }]"
  >
    <div         
      class="form"
      @click.stop="showTagOptions = showLocationOptions = false"
      @dragenter.prevent="dragging = true"
      @dragover.prevent
      @drop.prevent.stop="receiveDrop"
    >
      <div class="header">
        <p>{{ status }}</p>
        <input
          v-if="!status.includes('Thank you')"
          :disabled="status.includes('Sending')"
          class="submit"
          name="submit"
          ref="submit"
          type="submit"
          value="submit"
          @click="submit"
        />
        <input
          v-else
          class="submit"
          name="close"
          type="button"
          value="close"
          @click="$router.push('/info')"
        />
      </div>
      <div class="body">
        <div 
          class="artist"
          v-if="selectedType == 'resource'"
        >
          <p class="meta">organisation:</p>
          <input
            type="text"
            name="organisation"
            ref="organisation"
            placeholder="organisation"
            class="content"
          />
        </div>
        <div 
          class="artist"
          v-if="selectedType == 'artwork'"
        >
          <p class="meta">artist:</p>
          <input
            type="text"
            name="artist"
            ref="artist"
            placeholder="artist"
            class="content"
          />
        </div>
        <div 
          class="title"
          v-if="selectedType == 'artwork'"
        >
          <p class="meta">title:</p>
          <input
            type="text"
            name="title"
            ref="title"
            placeholder="title"
            class="content"
          />
        </div>
        <div class="description">
          <p class="meta">description:</p>
          <v-md-editor 
            class="content"
            ref="description"
            height="auto"
            left-toolbar="h bold italic underline strikethrough ul ol code image link quote"
            right-toolbar="preview fullscreen"
            @change="description = $event"
          ></v-md-editor>
        </div>  
      </div>
      
      <div class="info">
        <div class="media">
          <Gallery 
            ref="media"
            :border="true"
            :editable="true"
            :droppedMedia="droppedMedia"
            :dragging="dragging"
            @dragStop="dragging = false"
          />
          <div
            v-if="dragging"
            class="dragOverlay"
          >
            <span>Drop files here.</span>
          </div>
        </div>
        <div class="source">
          <p class="meta">source:</p>
          <p class="content">
            <input
              type="text"
              name="source"
              ref="source"
              :placeholder="'External URL to the '+ selectedType"
              class="content"
            />
          </p>
        </div>
        <div 
          class="medium"
          v-if="selectedType == 'artwork'"
        >
          <p class="meta">medium:</p>
          <p class="content">
            <input
              type="text"
              name="medium"
              ref="medium"
              placeholder="e.g. acrylic on paper"
              class="content"
            />
          </p>
        </div> 
        <div class="contact">
          <p class="meta">contact:</p>
          <p class="content">
            <input
              type="text"
              name="contact"
              ref="contact"
              placeholder="Any valuable contact information"
              class="content"
            />
          </p>
        </div> 
        <div class="tags">
          <p class="meta">tags:</p>
          <p class="content">
            <SelectionList 
              ref="tags"
              :collection="'tags'"
              :selected="selectedTags"
              :showOptions="showTagOptions"
              @showOptions="showTagOptions = true"
              @hideOptions="showTagOptions = false"
              @add="addToSelection($event, 'Tags')"
              @remove="removeFromSelection($event, 'Tags')"
            /> 
          </p>
        </div>
        <div class="locations">
          <p class="meta">locations:</p>
          <p class="content">
            <SelectionList 
              ref="locations"
              :collection="'locations'"
              :selected="selectedLocations"
              :showOptions="showLocationOptions"
              @showOptions="showLocationOptions = true"
              @hideOptions="showLocationOptions = false"
              @add="addToSelection($event, 'Locations')"
              @remove="removeFromSelection($event, 'Locations')"
            /> 
          </p>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import SelectionList from '../components/Utils/SelectionList'
import Gallery from '../components/Utils/Gallery'

import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// Component to upload resources or artworks to Strapi.
// Tags and locations and be created (Strapi handles them).
// All uploads have a 'published_at' field set to none
// so that they are reviewed before publishing.

export default {

  name: 'Upload',
  
  components: {
    SelectionList,
    Gallery,
  },
  
  props: [
    'selectedType'
  ],
  
  data() {
    return {
      selectedTags: [],
      selectedLocations: [],
      showTagOptions: false,
      showLocationOptions: false,
      droppedMedia: [],
      dragging: false,
      status: `Creating ${this.selectedType}.`,
      description: ''
    }
  },
  
  computed: {
    media() { 
      return this.$refs.media.computedMedia 
    },
  },
  
  methods: {
  
    addToSelection(item, list) {
      if (!this.isInList(item, list)) {
        this['selected'+list].push(item)
        this['show'+list.replace('s', '')+'Options'] = false
      }
    },
    
    removeFromSelection(item, list) {
      if (this.isInList(item, list)) {
        this['selected'+list].splice(this['selected'+list].indexOf(item), 1)
        this['show'+list.replace('s', '')+'Options'] = false
      }
    },
    
    isInList(item, list) {
      return this['selected'+list]
        .map(i => i.slug)
        .includes(item.slug)
    },
    
    receiveDrop(e) {
      this.droppedMedia = e
      this.dragging = false
    },
    
    submit() {
    
      const data = {
          ...this.selectedType == 'artwork' ? {
            Title         : this.$refs.title.value,
            ArtistName    : this.$refs.artist.value,
            Medium        : this.$refs.medium.value,
            location      : this.selectedLocations.map(l => l.id || l.Name),
          } : {
            Organisation  : this.$refs.organisation.value,
            locations     : this.selectedLocations.map(l => l.id || l.Name),
          },
          ...{
            Description   : this.description,
            Link          : this.$refs.source.value,
            Contact       : this.$refs.contact.value,
            tags          : this.selectedTags.map(t => t.id || t.Name),
            published_at  : null,
          },
        }
      
      if (process.env.NODE_ENV !== 'production') {
        console.log(data)
      }
             
      if (data.Title || data.Organisation) {
        
        const formData = new FormData()
        formData.append('data', JSON.stringify(data))

        if (this.media.length > 0) {
          for (let file of this.media) {
            formData.append(`files.Media`, file, file.name)
          }
        }
        
        this.status = 'Sending...'
        
        api[`${this.selectedType}s`]
        .post(formData)
        .then(() => { 
          this.status = 'Sent. Your contribution is being processed. Thank you.'
          setTimeout(() => {
            this.$store.dispatch('notify', {
              message: this.status,
              positive: true,
              time: new Date().getTime()
            })
              this.$router.push('/info')
            }, 700)
        })
        .catch(() => {
          this.status = 'errored' 
          this.$store.dispatch('notify', {
            message: this.status,
            time: new Date().getTime()
          })
        })
        
      } else {
        
        this.status = this.selectedType == 'resource' ? 
          'Please include an organisation name' :
          'Please include the artwork title'
          
      }
      
    },
    
  }
  
  
}
</script>

<style scoped>


.upload {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0em;
  left: 0em;
  background: var(--white-glass);
  overflow: scroll;
  z-index: 3;
  display: flex;
  justify-content: center;
}

.fade-enter-from ,
.fade-leave-to {
  padding-top: 10%;
}

.upload.post {
  margin-top: -100%;
  transition: all var(--landing) ease;
}

.form {
  position: relative;
  box-sizing: border-box;
  margin-top: 5em;
  /* height: 80%; */
  width: calc(100% - 10em);
  padding: 5em 5em;
  background: var(--lightorange);
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.form p {
  margin-top: 0;
}

.form .header {
  width: 100%;
  margin-bottom:5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form .header p {
  margin-bottom: 0;
}

.form .header input.submit {
  background: var(--orange);
  color: white;
  padding: 0.3em 5em;
  cursor: pointer;
}
.form .header input.submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  pointer-events: none;
}


.form .meta {
  width: 8em;
  flex-shrink: 0;
  text-align: right;
  margin-right: 1em;
  font-family: 'Courier New', Courier, monospace;
}
.form .content {
  width: 100%;
  display: flex;
}
.form .content a {
  word-break: break-all;
}

.form .body {
  box-sizing: border-box;
  padding-right: 1em;
  flex-basis: 65%;
}

.form .info {
  max-width: 30%;
  flex-basis: 30%;
  flex-shrink: 0;
  margin-left: auto;
}
.form .info .meta {
  width: 6em;
}

.form .body .artist,
.form .body .title,
.form .body .description,
.form .info .id,
.form .info .updated,
.form .info .source,
.form .info .contact,
.form .info .medium,
.form .info .tags,
.form .info .locations,
.form .info .media {
  display: flex;
  align-items: baseline;
  width: 100%;
}

.form .body .artist .content,
.form .body .title .content,
.form .body .description .content {
  font-family: montserrat;
  font-size: 1.5em;
  width: 100%;
  margin-bottom: 1em;
  
}
.form .body .description,
.form .body .description .content {
  height: 100%;
}
.form input,
.form textarea,
.form .v-md-editor {
  /* width: 32em; */
  background: var(--lightestorange);
  border: none;
  outline: none;
  resize: none;
  box-sizing: border-box;
  padding: 0.3em;
}


.form .body .title .content {
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 0.3em;
  font-size: 2em;
}

.form .body .description img {
  max-width: 100%;
}




.form .info .media {
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
}
.form .info .media .content {
  margin: 1em;
  max-width: 100%;
  display: flex;
  border: 1px solid;
  padding: 10px;
  min-height: 20em;
  /* justify-content: stretch; */
  /* align-items: stretch; */
}

.form .info .media .dragOverlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: var(--lightestorange);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8em;
  opacity: 0.7;
  z-index: 3;
}
.form .info .media .meta {
  font-style: italic;
  text-align: center;
  margin: 0;
  width: 100%;
}


.form .media .content img {
  max-width: 100%;
  max-height: 100%;
}
.form .footer .source,
.form .footer .contact {
  display: flex;
}

.form .footer .tags,
.form .footer .locations {
  display: flex;
}


.form .tags .content .list {
  display: flex;
  flex-direction: column;
}

table {
  margin-left: 10em;
  margin-top: 20em !important;
  /* max-width: 90%; */
  background: var(--lightestorange);
}

.resourceContainer td {
  background: unset !important;
}
  
</style>
