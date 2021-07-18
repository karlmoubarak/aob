<template>
  <div class="col id"> 
    <p 
      v-if="isInMyCollection(slug)"
      class="remove"
      @click.stop="removeFromCollection(resource)"
    >-</p>
    <p 
      v-else
      class="add"
      @click.stop="addToCollection(resource)"
    >+</p> 
  </div>
  <div 
    class="col organisation"
    @click.stop="$emit('clicked')"    
  > 
    <p
      v-html="$highlight( org, queries )"
    ></p>
  </div>
  <div class="col tags">
    <List 
      :list="tags"
      :collection="'tag'"
    /> 
  </div>
  <div 
    class="col description"
    @click.stop="$emit('clicked')"    
  > 
    <p
      v-html="$highlight( description, queries )"
    ></p>
  </div>
  <div class="col locations"> 
    <List 
      :list="locations"
      :collection="'location'"
    /> 
  </div>
  <div class="col source" v-if="files">
    <FileList 
      :list="files"
    />   
  </div>
  <!-- <div class="source" v-if="files">
    <FileList 
      :list="files"
    />   
  </div> -->
  <div class="col source" v-else>
    <a
      @click.stop
      :href="link"
      target="_blank"
    >
      <!-- v-html="$highlight( link, query )" -->
    🔗
    </a>
  </div>
  <div class="col contact">
     <a
      :href="'mailto:' + contact"
      target="_blank"
      v-html="$highlight( contact, queries )"
    ></a>
  </div>
  <!-- <div class="updated"> {{ updated }} </div> -->
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
    'clicked'
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
      'isInMyCollection',
      'queries'
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
.col.id {
  padding-top: 0;
}
.col.id,
.col.organisation,
.col.description {
  cursor: pointer;
}
</style>