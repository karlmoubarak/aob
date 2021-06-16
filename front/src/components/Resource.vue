<template>
  <tr>
    <td> {{ org }} </td>
    <td> 
      <TagList 
        :list="tags"
        :collection="'uploads'"
      /> 
    </td>
    <td> {{ description }} </td>
    <td v-if="files">
      <SemanticList 
        :list="files"
        :name="'files'"
        :collection="'uploads'"
      />   
    </td>
    <td v-else>
      <a 
        :href="link"
        target="_blank"
      >
        {{ link }} 
      </a>
    </td>
    <td> {{ contact }} </td>
    <td> {{ updated }} </td>
  </tr>
</template>

<script>
import moment from 'moment'
import SemanticList from './SemanticList'
import TagList from './TagList'

export default {
  name: 'Resource',
  components: {
    SemanticList,
    TagList
  },
  props: [
    'resource'
  ],
  computed: {
    org() { return this.resource.Organisation },
    tags() { return this.resource.tags.length > 0 && this.resource.tags },
    description() { return this.resource.Description },
    files() { return this.resource.Files.length > 0 && this.resource.Files },
    link() { return this.resource.Link },
    contact() { return this.resource.Contact || 'N/A'},
    updated() { return moment(this.resource.updated_at).fromNow() },
  },
  mounted() {
    console.log(this.resource.Files)
  }
  
}
</script>

<style>
td {
  padding: 1em;
  padding-bottom: 0;
}
</style>