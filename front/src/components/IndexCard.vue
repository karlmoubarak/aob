<template>
  <div 
    @click.stop 
    class="indexCard"
  >
  
    <div class="body">
      <div v-if="artist" class="artist">
        <p class="meta">{{ localizeMeta('artist') }}:</p>
        <p class="content">{{ artist }}</p>
      </div>
      <div v-if="org" class="title">
        <p class="meta">{{ localizeMeta('organisation') }}:</p>
        <p class="content">{{ org }}</p>
      </div>
      <div v-if="title" class="title">
        <p class="meta">{{ localizeMeta('title') }}:</p>
        <p class="content">{{ title }}</p>
      </div>
      <div class="description">
        <p class="meta">{{ localizeMeta('description') }}:</p>
        <vue3-markdown-it
          class="content"
          v-bind="$mdOpts"
          :source="processImages(description)"
        ></vue3-markdown-it>
      </div>  
    </div>
    
    <div class="info">
      <div class="media">
        <MultiMedia 
          :media="media"
          :border="true"
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
        <p class="meta">{{ localizeMeta('link') }}:</p>
        <p class="content">
          <FileList 
            v-if="files"
            :list="files"
          />   
          <a
            v-else-if="link"
            :href="link"
            target="_blank"
          >
            {{ link }}
          </a>
        </p>
      </div>
      <div v-if="medium" class="medium">
        <p class="meta">{{ localizeMeta('medium') }}:</p>
        <p class="content">{{ medium }}</p>
      </div>
      <div v-if="artistSite" class="medium">
        <p class="meta">{{ localizeMeta('artistSite') }}:</p>
        <p class="content">
          <a
            :href="artistSite"
            target="_blank"
          >
            {{ artistSite }}
          </a>
        </p>
      </div>
      <div class="contact">
        <p class="meta">{{ localizeMeta('contact') }}:</p>
        <p class="content">
          <a
            :href="'mailto:' + contact"
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
</template>

<script>
import moment             from 'moment'
import { processImages }  from '../utils'
import { mapState }       from 'vuex'
import List               from './Utils/List'
import FileList           from './Utils/FileList'
import MultiMedia         from './Utils/MultiMedia'

export default {
  name: 'IndexCard',
  components: {
    List,
    FileList,
    MultiMedia
  },
  props: [
    'item',
  ],
  data() {
    return {
    }
  },
  computed: {
  
    ...mapState([
      'locale',
      'printing'
    ]),
      
    id()          { return this.$locale.num[this.locale](this.item.id) },
    link()        { return this.item.link },
    contact()     { return this.item.contact || 'N/A'},
    media()       { return this.item.media },
    description() { return (
      this.locale == 'ar' && 
      this.item.description_AR ||
      this.item.description 
    )},
    cover()       { return this.media && 
      this.media[0].formats.medium ? this.$apiURL + this.media[0].formats.medium.url :
      this.media[0].formats.small ? this.$apiURL + this.media[0].formats.small.url :
      this.$apiURL + this.media[0].url
    },
    caption()     { return (
      this.cover && 
      this.media[0].caption || 
      this.$locale.media.unknownRights[this.locale] 
    )},
    updated()     { return (
      moment(this.item.updated_at)
      .locale(this.locale)
      .format('DD/MM/yyyy')
    )},
    tags()        { return (
      this.item.tags.length > 0 && 
      this.item.tags 
    )},
    locations()   { return (
      this.item.locations && 
      this.item.locations.length > 0 && 
      this.item.locations 
    )},
    
    org()         { return (
      this.locale == 'ar' && 
      this.item.organisation_AR ||
      this.item.organisation 
    )},
    files()       { return (
      this.item.files && 
      this.item.files.length > 0 && 
      this.item.files 
    )},

    title()       { return this.item.title },
    artist()      { return this.item.artistName },
    medium()      { return this.item.medium },
    artistSite()  { return this.item.artistWebsite }
    
  },
  mounted() {
  },
  methods: {
  
    processImages,
    
    localizeMeta(meta) { 
      return this.$locale.tableHeaders[meta]['name'][this.locale] 
    }
    
  }
  
}
</script>

<style scoped>

.indexCard {
  position: relative;
  box-sizing: border-box;
  margin-top: 6em;
  height: 100%;
  min-height: 120vh;
  width: calc(100% - 13em);
  padding: 8em 3em;
  background: var(--beige);
  display: flex;
  align-items: flex-start;
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

.indexCard .body .description .content iframe,
.indexCard .body .description .content iframe .player {
  /* width: 100%;
  min-width: 100%;
  max-width: 100%; */
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
.indexCard .info .source .content,
.indexCard .info .contact .content {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
.mobile .indexCard .meta {
  text-align: left;
}
.mobile .indexCard .body .title .content {
  text-indent: 1.8em;
}
.mobile .indexCard .body .artist .content {
  margin-top: 0.2em;
  text-indent: 2.4em;
}


.printing .indexCard {
  margin: 0;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  height: auto;
  width: 100%;
  
}

@media print {
  .indexCard {
    margin: 0;
    min-width: 100%;
    max-width: 100%;
    min-height: 100vh;
    height: auto;
    width: 100%;
  }
}
  
</style>