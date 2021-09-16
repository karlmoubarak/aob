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
  <div class="col source" v-if="files">
    <FileList 
      :list="files"
    />   
  </div>
  <div class="col source" v-else>
    <a
      @click.stop
      :href="link"
      target="_blank"
    >
      <!-- v-html="$highlight( link, query )" -->
    <!-- 🔗 -->
    <img class="cover" :src="cover" />
    </a>
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
import moment     from 'moment'
import FileList   from '../Utils/FileList'
import List       from '../Utils/List'

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
    locale()      { return this.$store.state.locale },
    id()          { return this.resource.id },
    slug()        { return this.resource.slug },
    org()         { return this.locale == 'ar' && this.resource.Organisation_AR
      ? this.resource.Organisation_AR
      : this.resource.Organisation
    },
    description() { return this.locale == 'ar' && this.resource.Description_AR
      ? this.resource.Description_AR
      : this.resource.Description 
    },
    tags()        { return this.resource.tags && this.resource.tags.length > 0 && this.resource.tags },
    locations()   { return this.resource.locations && this.resource.locations.length > 0 && this.resource.locations },
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
    media()       { return this.resource.Media },
    cover()       { return this.media && this.media[0] && this.media[0].formats && (
      this.media[0].formats.medium ? this.$apiURL + this.media[0].formats.medium.url :
      this.media[0].formats.small ? this.$apiURL + this.media[0].formats.small.url :
      this.$apiURL + this.media[0].url
    )
    },

    
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
.col.description p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 4em;
  transition: all var(--fast) ease;
}
.col img {
  max-height: 3em;
  max-width: 3em;
  width: 100%;
  /* border-radius: 50%; */
  background: lightgray;
  filter: grayscale(1);
  opacity: 0.7;
}

/* .col.description p:hover {
  -webkit-line-clamp: 5;
  max-height: 6em;
} */
</style>