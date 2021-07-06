<template>
  <div 
    v-if="artwork"
    class="artwork"
  >
    <div @click.stop class="indexCard">
      <div class="header">
        <div class="id">
          <p class="meta">id:</p>
          <p class="content">( {{ id }} )</p>
        </div>
        <div class="updated">
          <p class="meta">updated:</p>
          <p class="content">( {{ updated }} )</p>
        </div>
      </div>
      <div class="body">
        <div class="info">
          <div class="title">
            <p class="meta">title:</p>
            <p class="content">{{ title }}</p>
          </div>
          <div class="description">
            <p class="meta">description:</p>
            <p class="content">{{ description }}</p>
          </div>  
        </div>
      </div>
      <div class="body">
        <div class="media">
          <div class="content">
            <img 
              v-if="media"
              class="cover"
              :src="cover"
            />
          </div>  
          <div class="meta">{{ medium }}</div>
        </div>
      </div>
        <div class="body">
        </div>
      <div class="footer">
        <div class="source">
          <p class="meta">source:</p>
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
          <p class="meta">contact:</p>
          <p class="content">
            <a
              :href="'mailto:' + link"
              target="_blank"
            > 
              {{ contact }} 
            </a>
          </p>
        </div> 
      </div>
      <div class="footer">
        <div class="tags">
          <p class="meta">tags:</p>
          <p class="content">
            <List 
              :list="tags"
              :collection="'tag'"
            /> 
          </p>
        </div>
        <div class="locations">
          <p class="meta">locations:</p>
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

export default {
  name: 'Artwork',
  components: {
  },
  props: [
    'artwork',
  ],
  data() {
    return {
    }
  },
  computed: {
    id()          { return this.artwork.id },
    title()       { return this.artwork.Title },
    artist()      { return this.artwork.ArtistName },
    description() { return this.artwork.Description },
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



.artwork {
   width: 100%;
  max-height: 50vh;
  overflow: visible;
  /* background: #f2e4c4; */
}

.indexCard {
  position: relative;
  box-sizing: border-box;
  margin-top: 6em;
  margin-right: 5em;
  height: 100%;
  min-height: 120vh;
  /* max-width: 60em; */
  width: 90%;
  padding: 5em 5em;
  /*border-radius: 1em;*/
  background: var(--lightblue);
  /* background: white; */
  background: #f2e4c4;
  display: flex;
  flex-direction: column;
}
.indexCard::after {
 /*  */
}

.indexCard p {
  margin-top: 0;
}

.indexCard .header,
.indexCard .body,
.indexCard .footer {
  width: 100%;
  display: flex;
}

.indexCard .header .id,
.indexCard .header .updated {
  display: flex;
}
.indexCard .header .updated,
.indexCard .footer .contact,
.indexCard .footer .locations,
.indexCard .body .media {
  margin: auto;

}

.indexCard .body .info .title,
.indexCard .body .info .description,
.indexCard .body .media {
  display: flex;
  align-items: baseline;
}

.indexCard .body .media {
  flex-direction: column;
  align-items: center;
}
.indexCard .body .media .content {
  margin: 1em;
  max-width: 12em;
  display: flex;
  /* justify-content: stretch; */
  /* align-items: stretch; */
}

.indexCard .body .media .meta {
  font-style: italic;
  text-align: center;
  margin: 0;
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

.indexCard .meta {
  width: 8em;
  text-align: right;
  margin-right: 1em;
}

.indexCard .content {
  width: 24em;
}

.indexCard .title .content,
.indexCard .description .content {
  font-family: montserrat;
  font-size: 1.5em;
  /* width: 32em; */
}

.indexCard .title .content {
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 0.3em;
  font-size: 2em;
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
  
</style>