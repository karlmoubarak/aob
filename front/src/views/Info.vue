<template>
  <div id="infoContainer">
    <div id="info">
      <div class="sections">
        <vue3-markdown-it
          v-for="section in sections"
          :key="section"
          class="content"
          :source="source(section)"
        ></vue3-markdown-it>
        <div class="updatedAt">
          <p>{{ updatedAt }}</p>
        </div>
      </div>
      <div class="meta">
        <h1> The Archive in Numbers</h1>
        <p> Total entries: {{ count('mainCollection') }} </p>
        <p> Resources: {{ count('filteredResources') }} </p>
        <p> Artworks: {{ count('filteredArtworks') }} </p>
        <p> The archive was last updated on: {{ archiveLastUpdated }} </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { processImages, sortByUpdate } from '../utils'
import moment from 'moment'

export default {
  name: 'Info',
  data() {
    return {
      sections: [
        'About',
        'Contact',
        'PrivacyPolicy',
        'UsageInstructions'
      ]
    }
  },
  computed: {
    ...mapState([
      'locale',
      'info'
    ]),
    updatedAt() {
      return (
        this.$locale['info']['updated_at'][this.locale] + ' ' +
        moment(this.info['updated_at']).locale(this.locale).format('MMMM DD, YYYY, HH:mm')
      )
    },
    archiveLastUpdated() { 
      return (
        moment(
          this.sortByUpdate(
            this.$store.getters.mainCollection
            .map(i => i .updated_at)
          )[0]
        )
        .locale(this.locale)
        .format('MMMM DD, YYYY, HH:mm')
      )
    },
  },
  methods: {
    processImages,
    sortByUpdate,
    source(title) { 
      return (
        this.processImages(
          this.info[title] && this.info[title][this.locale] 
        )
      )
    },
    count(arr) { 
      return this.$store.getters[arr].length
    },
  }
}
</script>

<style scoped>
#infoContainer {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  padding: 2em 1em;
  font-family: montserrat;
}
#info {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: flex-start;
}
.sections,
.meta {
  padding: 2em;
  margin: 1em;
}
.sections {
  max-width: 55em;
  background: var(--lightestorange);
}
.meta {
  font-family: 'Courier New', Courier, monospace;
  background: var(--lightgreen);
}
.updatedAt {
  font-style: italic;
}
</style>