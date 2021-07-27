<template>
  <div 
    v-if="artwork"
    class="artwork"
  >
    <div @click.stop class="indexCard">
    
      <div class="body">
        <div class="artist">
          <p class="meta">{{ localizeMeta('artist') }}:</p>
          <p class="content">{{ artist }}</p>
        </div>
        <div class="title">
          <p class="meta">{{ localizeMeta('title') }}:</p>
          <p class="content">{{ title }}</p>
        </div>
        <div class="description">
          <p class="meta">{{ localizeMeta('description') }}:</p>
          <vue3-markdown-it
            class="content"
            :source="processImages(description)"
          ></vue3-markdown-it>
        </div>  
      </div>
      
      <div class="info">
        <div class="media">
          <MultiMedia 
            :media="media"
          />
        </div>
        <div class="id">
          <p class="meta">{{ localizeMeta('id') }}:</p>
          <p class="content">( {{ id }} )</p>
        </div>
        <div class="updated">
          <p class="meta">{{ localizeMeta('updated') }}:</p>
          <p class="content">( {{ updated }} )</p>
        </div>
        <div class="source">
          <p class="meta">{{ localizeMeta('source') }}:</p>
          <p class="content">
            <a
              :href="link"
              target="_blank"
            >
              {{ link }}
            </a>
          </p>
        </div>
        <div class="medium">
          <p class="meta">{{ localizeMeta('medium') }}:</p>
          <p class="content">{{ medium }}</p>
        </div>
        <div class="contact">
          <p class="meta">{{ localizeMeta('contact') }}:</p>
          <p class="content">
            <a
              :href="'mailto:' + link"
              target="_blank"
            > 
              {{ contact }} 
            </a>
          </p>
        </div> 
        <div class="tags">
          <p class="meta">{{ localizeMeta('tags') }}:</p>
          <p class="content">
            <List 
              :list="tags"
              :collection="'tag'"
            /> 
          </p>
        </div>
        <div class="locations">
          <p class="meta">{{ localizeMeta('locations') }}:</p>
          <p class="content">
            <List 
              :list="locations"
              :collection="'location'"
            /> 
          </p>
        </div> 
      </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import List from '../components/List'
import { processImages } from '../utils'
import MultiMedia from './MultiMedia.vue'

export default {
  name: 'Artwork',
  components: {
    List,
    MultiMedia
  },
  props: [
    'artwork',
  ],
  data() {
    return {
    }
  },
  computed: {
    locale()      { return this.$store.state.locale },
    id()          { return this.artwork.id },
    title()       { return this.artwork.Title },
    artist()      { return this.artwork.ArtistName },
    description() { return this.locale == 'ar' && this.artwork.Description_AR
      ? this.artwork.Description_AR
      : this.artwork.Description 
    },
    medium()      { return this.artwork.Medium },
    tags()        { return this.artwork.tags.length > 0 && this.artwork.tags },
    locations()   { return this.artwork.location.length > 0 && this.artwork.location },
    media()       { return this.artwork.Media && this.artwork.Media.length > 0 && this.artwork.Media },
    cover()       { return this.media && this.$apiURL + this.media[0].formats.medium.url },
    caption()     { return this.cover && this.media[0].caption || this.$locale.media.unknownRights[this.locale] },
    updated()     { return moment(this.artwork.updated_at).format('DD/MM/yyyy') },
    link()        { return this.artwork.Link },
    contact()     { return this.artwork.Contact || 'N/A'},
    
  },
  mounted() {
  },
  methods: {
    processImages,
    localizeMeta(meta) { return this.$locale.tableHeaders[meta]['name'][this.locale] }
    
  }
  
}
</script>

<style scoped>



.artwork {
  width: 100%;
  /* max-height: 50vh; */
  overflow: visible;
  /* background: #f2e4c4; */
}

.indexCard {
  position: relative;
  box-sizing: border-box;
  margin-top: 6em;
  height: 100%;
  min-height: 120vh;
  width: calc(100% - 13em);
  padding: 8em 5em;
  background: var(--lightblue);
  background: #f2e4c4;
  display: flex;
}

.indexCard p {
  margin-top: 0;
}
.indexCard .meta {
  width: 8em;
  flex-shrink: 0;
  text-align: right;
  margin-right: 1em;
}
.indexCard .content {
  width: 100%;
}
.indexCard .content a {
  word-break: break-all;
}

.indexCard .body {
  box-sizing: border-box;
  padding-right: 1em;
  flex-basis: 65%;
}

.indexCard .info {
  max-width: 30%;
  flex-shrink: 0;
  margin-left: auto;
}

.indexCard .body .artist,
.indexCard .body .title,
.indexCard .body .description,
.indexCard .info .id,
.indexCard .info .updated,
.indexCard .info .source,
.indexCard .info .medium,
.indexCard .info .contact,
.indexCard .info .tags,
.indexCard .info .locations,
.indexCard .info .media {
  display: flex;
  align-items: baseline;
  width: 100%;
}

.indexCard .body .artist .content,
.indexCard .body .title .content,
.indexCard .body .description .content {
  font-family: montserrat;
  font-size: 1.5em;
  /* width: 32em; */
}

.indexCard .body .description img {
  max-width: 100%;
}


.indexCard .body .title .content {
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 0.3em;
  font-size: 2em;
}


.indexCard .info .media {
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
}

.indexCard .footer .source,
.indexCard .footer .contact {
  display: flex;
}

.indexCard .footer .tags,
.indexCard .footer .locations {
  display: flex;
}


.indexCard .tags .content .list {
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


.ar .indexCard .info {
  margin-left: unset;
  margin-right: auto;
}

.ar .indexCard .meta {
  text-align: left;
  margin-right: unset;
  margin-left: 1em;
}

.mobile .indexCard {
  margin: 0;
  width: 100%;
  padding: 0.8em 0.8em;
  display: block;
}

.mobile .indexCard .info {
  margin-left: unset;
  max-width: unset;
}
.mobile .indexCard .body .artist .meta,
.mobile .indexCard .body .title .meta,
.mobile .indexCard .body .description .meta {
  display: none;
}
.mobile .indexCard .body .artist .content {
  margin-top: 0.2em;
  text-indent: 2.4em;
}

  
</style>