<template>
  <td class="id"> {{ id }} </td>
  <td class="organization"> 
    <p
      v-html="$highlight( org, query )"
    ></p>
  </td>
  <td class="tags"> 
    <TagList 
      :list="tags"
      :collection="'resources'"
    /> 
  </td>
  <td class="description"> 
    <p
      v-html="$highlight(description, query )"
    ></p>
  </td>
  <td class="source" v-if="files">
    <FileList 
      :list="files"
    />   
  </td>
  <td class="source" v-else>
    <a
      :href="link"
      target="_blank"
      v-html="$highlight( link, query )"
    ></a>
  </td>
  <td class="contact">
     <a
      :href="'mailto:' + link"
      target="_blank"
      v-html="$highlight( contact, query )"
    ></a>
  </td>
  <td class="updated"> {{ updated }} </td>
</template>

<script>
import moment from 'moment'
import FileList from './FileList'
import TagList from './TagList'

import { mapState } from 'vuex'

export default {
  name: 'Resource',
  components: {
    FileList,
    TagList,
  },
  props: [
    'resource'
  ],
  computed: {
    id()          { return this.resource.id },
    org()         { return this.resource.Organisation },
    tags()        { return this.resource.tags.length > 0 && this.resource.tags },
    description() { return this.resource.Description },
    files()       { return this.resource.Files.length > 0 && this.resource.Files },
    link()        { return this.resource.Link },
    contact()     { return this.resource.Contact || 'N/A'},
    updated()     { return moment(this.resource.updated_at).fromNow() },
    ...mapState([
      'query'
    ]),
    
  },
  mounted() {
    // console.log(this.resource.Files)
  },
  methods: {
  }
  
}
</script>

<style scoped>
tr {
  transition: all 0.2s ease;
}
td {
  position: relative;
  /* border: 3px solid #F2F5FB; */
  padding: 0.5em;
  /* padding-bottom: 0;
  padding-left: 0; */
  vertical-align: top;
  background: white;
}
td p {
  margin: 0;
}

.list-item {
}
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  /* margin-top: -50px; */
  transform: translateY(-50px);
  /* transform: scaleY(0), translateY(-30px); */
  transition: all 0.2s ease;
}
</style>