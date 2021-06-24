<template>
  <tr>
    <td> {{ id }} </td>
    <td> 
      <vue3-markdown-it
        v-bind="$mdOpts"
        :source="highlight( org )"
      ></vue3-markdown-it>
    </td>
    <td> 
      <TagList 
        :list="tags"
        :collection="'resources'"
      /> 
    </td>
    <td> 
      <vue3-markdown-it
        v-bind="$mdOpts"
        :source="highlight( description )"
      ></vue3-markdown-it>
    </td>
    <td v-if="files">
      <FileList 
        :list="files"
      />   
    </td>
    <td v-else>
      <vue3-markdown-it
        v-bind="$mdOpts"
        :source="highlight( link )"
      ></vue3-markdown-it>
    </td>
    <td>
      <vue3-markdown-it
        v-bind="$mdOpts"
        :source="highlight( contact )"
      ></vue3-markdown-it>
    </td>
    <td> {{ updated }} </td>
  </tr>
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
    highlight(source) {
      return (
        this.query ? 
        source.replace(
          new RegExp(this.query, "gi"), 
          match => ('<span class="highlight">' + match + '</span>')
        ) : source
      )
    }
  }
  
}
</script>

<style>
td {
  padding: 1em;
  padding-bottom: 0;
  padding-left: 0;
  vertical-align: top;
}
td p {
  margin: 0;
}

</style>