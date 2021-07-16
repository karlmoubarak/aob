<template>
  <div @click.stop="$router.push('/archive')" class="upload">
  
    <div 
      @click.stop 
      v-if="!selectedType"
      class="form"
    >
      <span
        class="option"
        @click.stop="selectedType = 'resource'"
      >resource</span>
      <span
        class="option"
        @click.stop="selectedType = 'artwork'"
      >artwork</span>
    </div>
    
    <div         
      v-if="selectedType == 'artwork'"
      @click.stop 
      class="form"
    >
      <div class="body">
        <div class="artist">
          <p class="meta">artist:</p>
          <input
            type="text"
            name="artist"
            ref="artist"
            placeholder="artist"
            class="content"
          />
        </div>
        <div class="title">
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
          <textarea
            rows="10"
            name="description"
            ref="description"
            placeholder="description"
            class="content"
          />
        </div>  
      </div>
      
      <div class="info">
        <div class="media">
          <div class="content">
            <!-- <img 
              v-if="media"
              class="cover"
              :src="cover"
            /> -->
          </div>  
          <!-- <div class="meta">{{ medium }}</div> -->
        </div>
        <div class="id">
          <p class="meta">id:</p>
          <!-- <p class="content">( {{ id }} )</p> -->
        </div>
        <div class="updated">
          <p class="meta">updated:</p>
          <!-- <p class="content">( {{ updated }} )</p> -->
        </div>
        <div class="source">
          <p class="meta">source:</p>
          <p class="content">
            <!-- <a
              :href="link"
              target="_blank"
            >
              {{ link }}
            </a> -->
          </p>
        </div>
        <div class="contact">
          <p class="meta">contact:</p>
          <p class="content">
            <!-- <a
              :href="'mailto:' + link"
              target="_blank"
            > 
              {{ contact }} 
            </a> -->
          </p>
        </div> 
        <div class="tags">
          <p class="meta">tags:</p>
          <p class="content">
            <!-- <List 
              :list="tags"
              :collection="'tag'"
            />  -->
          </p>
        </div>
        <div class="locations">
          <p class="meta">locations:</p>
          <p class="content">
            <!-- <List 
              :list="locations"
              :collection="'location'"
            />  -->
          </p>
        </div> 
      </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
// import List from '../components/List'
import { processImages } from '../utils'

export default {
  name: 'Upload',
  components: {
    // List
  },
  props: [
  ],
  data() {
    return {
      selectedType: ''
    }
  },
  computed: {
    id()          { return this.artwork.id },
    title()       { return this.artwork.Title },
    artist()      { return this.artwork.ArtistName },
    description() { return processImages(this.artwork.Description) },
    medium()      { return this.artwork.Medium },
    tags()        { return this.artwork.tags.length > 0 && this.artwork.tags },
    locations()   { return this.artwork.location.length > 0 && this.artwork.location },
    media()       { return this.artwork.Media && this.artwork.Media.length > 0 && this.artwork.Media },
    cover()       { return this.media && this.$apiURL + this.media[0].formats.medium.url },
    updated()     { return moment(this.artwork.updated_at).format('DD/MM/yyyy') },
    link()        { return this.artwork.Link },
    contact()     { return this.artwork.Contact || 'N/A'},
    
  },
  mounted() {
  },
  methods: {
    
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
  background: #ffffffa4;
  overflow: scroll;
  z-index: 3;
  display: flex;
  justify-content: center;
  transform: translateY(0) !important;
}

.fade-enter-from ,
.fade-leave-to {
  padding-top: 10%;
}

.form {
  position: relative;
  box-sizing: border-box;
  margin-top: 5em;
  /* height: 80%; */
  width: 80%;
  padding: 8em 5em;
  background: #f2e4c4;
  display: flex;
}

.form p {
  margin-top: 0;
}
.form .meta {
  width: 8em;
  flex-shrink: 0;
  text-align: right;
  margin-right: 1em;
}
.form .content {
  width: 100%;
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

.form .body .artist,
.form .body .title,
.form .body .description,
.form .info .id,
.form .info .updated,
.form .info .source,
.form .info .contact,
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
}

.form .body input {
  /* width: 32em; */
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