<template>
  <td class="id"> 
    <span 
      v-if="isInMyCollection(slug)"
      class="remove"
      @click.stop="removeFromCollection(resource)"
    >-</span>
    <span 
      v-else
      class="add"
      @click.stop="addToCollection(resource)"
    >+</span> 
  </td>
  <td class="organization"> 
    <p
      v-html="$highlight( org, query )"
    ></p>
  </td>
  <td class="tags">
    <List 
      :list="tags"
      :collection="'tag'"
    /> 
  </td>
  <td class="description"> 
    <p
      v-html="$highlight( description, query )"
    ></p>
  </td>
  <td class="locations"> 
    <List 
      :list="locations"
      :collection="'location'"
    /> 
  </td>
  <td class="source" v-if="files">
    <FileList 
      :list="files"
    />   
  </td>
  <!-- <td class="source" v-if="files">
    <FileList 
      :list="files"
    />   
  </td> -->
  <td class="source" v-else>
    <a
      @click.stop
      :href="link"
      target="_blank"
    >
      <!-- v-html="$highlight( link, query )" -->
    🔗
    </a>
  </td>
  <td class="contact">
     <a
      :href="'mailto:' + contact"
      target="_blank"
      v-html="$highlight( contact, query )"
    ></a>
  </td>
  <td class="updated"> {{ updated }} </td>
</template>

<script>
import moment from 'moment'
import FileList from './FileList'
import List from './List'

import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Resource',
  components: {
    FileList,
    List,
  },
  props: [
    'resource'
  ],
  emits: [
    'click'
  ],
  computed: {
    id()          { return this.resource.id },
    slug()        { return this.resource.slug },
    org()         { return this.resource.Organisation },
    tags()        { return this.resource.tags && this.resource.tags.length > 0 && this.resource.tags },
    locations()   { return this.resource.locations && this.resource.locations.length > 0 && this.resource.locations },
    description() { return this.resource.Description },
    files()       { return this.resource.Files.length > 0 && this.resource.Files },
    link()        { return this.resource.Link },
    contact()     { return this.resource.Contact || 'N/A'},
    updated()     { return moment(this.resource.updated_at).fromNow() },
    ...mapState([
      'query'
    ]),
    ...mapGetters([
      'isInMyCollection'
    ]),

    
  },
  created() {
    // console.log(this.resource)
  },
  methods: {
    ...mapActions([
      'addToCollection',
      'removeFromCollection'
    ])
  }
  
}
</script>

<style scoped>
td {
  transition: all 0.2s ease;
  max-width: 100%;
}

td {
  position: relative;
  padding: 0.5em;
  vertical-align: top;
  background: white;
}
td p {
  margin: 0;
}
td.source a {
  text-decoration: none;
}

</style>