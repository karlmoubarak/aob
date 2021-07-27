<template>
  <div 
    v-if="resource" 
    class="resource"
  >
    <div @click.stop class="indexCard">
    
      <div class="body">
        <div class="title">
          <p class="meta">{{ localizeMeta('organisation') }}:</p>
          <p class="content">{{ org }}</p>
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
            <FileList 
              v-if="files"
              :list="files"
            />   
            <a
              v-else
              :href="link"
              target="_blank"
            >
              {{ link }}
            </a>
          </p>
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
import { processImages } from '../utils'
import FileList from './FileList'
import List from './List'
import MultiMedia from './MultiMedia'

export default {
  name: 'Resource',
  components: {
    FileList,
    List,
    MultiMedia
  },
  props: [
    'resource'
  ],
  computed: {
    id()          { return this.resource.id },
    locale()      { return this.$store.state.locale },
    org()         { return this.locale == 'ar' && this.resource.Organisation_AR
      ? this.resource.Organisation_AR
      : this.resource.Organisation
    },
    tags()        { return this.resource.tags && this.resource.tags.length > 0 && this.resource.tags },
    locations()   { return this.resource.locations && this.resource.locations.length > 0 && this.resource.locations },
    description() { return this.locale == 'ar' && this.resource.Description_AR
      ? this.resource.Description_AR
      : this.resource.Description 
    },
    files()       { return this.resource.Files.length > 0 && this.resource.Files },
    media()       { return this.resource.Media },
    link()        { return this.resource.Link },
    contact()     { return this.resource.Contact || 'N/A'},
    updated()     { return moment(this.resource.updated_at).format('DD/MM/yyyy') },
    cover()       { return this.media && 
      this.media[0].formats.medium ? this.$apiURL + this.media[0].formats.medium.url :
      this.media[0].formats.small ? this.$apiURL + this.media[0].formats.small.url :
      this.$apiURL + this.media[0].url
    },
  },
  methods: {
   processImages,
   localizeMeta(meta) { return this.$locale.tableHeaders[meta]['name'][this.locale] }
  }
  
}
</script>

<style scoped>

.resource {
  width: 100%;
  /* max-height: 50vh; */
  overflow: visible;
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
.indexCard .info .media .content {
  margin: 1em;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  padding: 10px;
  min-height: 15em;
  /* justify-content: stretch; */
  /* align-items: stretch; */
}

.indexCard .info .media .meta {
  font-style: italic;
  text-align: center;
  margin: 0;
  width: 100%;
}


.indexCard .media .content img {
  max-width: 100%;
  max-height: 100%;
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
.mobile .indexCard .body .title .meta,
.mobile .indexCard .body .description .meta {
  display: none;
}
.mobile .indexCard .body .title .content {
  text-indent: 1.8em;
}


/* .mobile .indexCard .body .artist,
.mobile .indexCard .body .title,
.mobile .indexCard .body .description,
.mobile .indexCard .info .id,
.mobile .indexCard .info .updated,
.mobile .indexCard .info .source,
.mobile .indexCard .info .contact,
.mobile .indexCard .info .tags,
.mobile .indexCard .info .locations,
.mobile .indexCard .info .media {
  flex-direction: column;
} */
</style>