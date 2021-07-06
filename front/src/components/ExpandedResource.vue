<template>
  <div 
    v-if="resource" 
    class="resource"
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
            <p class="content">{{ org }}</p>
          </div>
          <div class="description">
            <p class="meta">description:</p>
            <p class="content">{{ description }}</p>
          </div>  
        </div>
        <div class="media"></div>
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
import FileList from '../components/FileList'
import List from '../components/List'

export default {
  name: 'Resource',
  components: {
    FileList,
    List,
  },
  props: [
    'resource'
  ],
  computed: {
    id()          { return this.resource.id },
    org()         { return this.resource.Organisation },
    tags()        { return this.resource.tags && this.resource.tags.length > 0 && this.resource.tags },
    locations()   { return this.resource.locations && this.resource.locations.length > 0 && this.resource.locations },
    description() { return this.resource.Description },
    files()       { return this.resource.Files.length > 0 && this.resource.Files },
    link()        { return this.resource.Link },
    contact()     { return this.resource.Contact || 'N/A'},
    updated()     { return moment(this.resource.updated_at).format('DD/MM/yyyy') },
  },
  mounted() {
  },
  created() {
    // console.log(this.resource)
  },
  methods: {
  }
  
}
</script>

<style scoped>

.resource {
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
.indexCard .header .updated {
  margin: auto;

}

.indexCard .body .info .title,
.indexCard .body .info .description {
  display: flex;
  align-items: baseline;
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