<template>
  <div
    class="col id"
    @click.stop="
      isInMyCollection(slug) ?
      removeFromCollection(resource) :
      addToCollection(resource)
    "
  >
    <p
      v-if="isInMyCollection(slug)"
      class="remove"
    >-</p>
    <p
      v-else
      class="add"
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
  <div class="col locations">
    <List
      :list="locations"
      :collection="'location'"
    />
  </div>
  <div
    class="col description"
    @click.stop="$emit('clicked')"
  >
    <vue3-markdown-it
      class="description"
      v-bind="$mdOpts"
      :source="$highlight( description, queries )"
    ></vue3-markdown-it>
  </div>
  <div class="col tags">
    <List
      :list="tags"
      :collection="'tag'"
    />
  </div>
  <div class="col link" v-if="files">
    <FileList
      :list="files"
    />
  </div>
  <div class="col link" v-else>
    <a
      @click.stop
      :href="link"
      target="_blank"
    >
    <img class="cover" :src="cover" />
    </a>
  </div>
  <div class="col contact">
    <vue3-markdown-it
      class="description"
      v-bind="$mdOpts"
      :source="$highlight( contact, queries )"
    ></vue3-markdown-it>
  </div>
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
  props: [ 'resource' ],
  emits: [ 'clicked' ],
  computed: {
    ...mapState([ 'query' ]),
    ...mapGetters([
      'isInMyCollection',
      'queries'
    ]),
    locale()      { return this.$store.state.locale },
    id()          { return this.resource.id },
    slug()        { return this.resource.slug },
    org()         { return this.locale == 'ar' && this.resource.organisation_AR
      ? this.resource.organisation_AR
      : this.resource.organisation
    },
    description() { return this.locale == 'ar' && this.resource.description_AR
      ? this.resource.description_AR
      : this.resource.description
    },
    tags()        { return this.resource.tags && this.resource.tags.length > 0 && this.resource.tags },
    locations()   { return this.resource.locations && this.resource.locations.length > 0 && this.resource.locations },
    files()       { return this.resource.files.length > 0 && this.resource.files },
    link()        { return this.resource.link },
    contact()     { return this.resource.contact || 'N/A'},
    updated()     { return moment(this.resource.updated_at).fromNow() },
    media()       { return this.resource.media },
    cover()       { return this.media && this.media[0] && this.media[0].formats && (
      this.media[0].formats.medium ? this.$apiURL + this.media[0].formats.medium.url :
      this.media[0].formats.small ? this.$apiURL + this.media[0].formats.small.url :
      this.$apiURL + this.media[0].url
    )},
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
.col.description * {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 4em;
  transition: all var(--fast) ease;
}
.col img {
  box-sizing: border-box;
  max-height: 3em;
  max-width: 3em;
  width: 100%;
  background: lightgray;
  filter: grayscale(1);
  opacity: 0.7;
}

.mobile .col img {
  max-height: 10em;
  max-width: 90%;
}

</style>
