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
          <p>{{ updatedAt }}.</p>
        </div>
      </div>
      <div class="meta">
        <table>
          <tr> 
            <th colspan="2">{{ $locale['info']['inNumbers'][locale] }}</th>
          </tr>
          <tr> 
            <th>{{ $locale['info']['total'][locale] }}</th>
            <th>{{ count('mainCollection') }}</th>
          </tr>
          <tr> 
            <th>{{ $locale['info']['resources'][locale] }}</th>
            <th>{{ count('filteredResources') }}</th>
          </tr>
          <tr> 
            <th>{{ $locale['info']['artworks'][locale] }}</th>
            <th>{{ count('filteredArtworks') }}</th>
          </tr>
          <tr> 
            <th>{{ $locale['info']['collections'][locale] }}</th>
            <th>{{ count('sortedCollections') }}</th>
          </tr>
        </table>
        <div class="updatedAt">
          <p>{{ $locale['info']['archive_updated_at'][locale] }} {{ archiveLastUpdated}}.</p>
        </div>
        <div class="contribute">
          <p>{{ $locale['info']['contribute'][locale] }} </p>
        </div>
        <div class="repo">
          <p>{{ $locale['info']['repo'][locale] }} <a  
              target="blank"
              :src="info.LinkToPublicCodeRepository"
            >{{ info.LinkToPublicCodeRepository }}</a>
          </p>
        </div>
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
      return this.$locale.num[this.locale](this.$store.getters[arr].length)
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
  max-width: 25em;
}
.meta table {
  border-collapse: collapse;
  width: 100%;
}
.meta table tr th {
  border: 1px solid;
  font-weight: normal;
  padding: 0.3em;
  text-align: left;
}
.meta table tr th:nth-of-type(2) {
  text-align: center;
}
.meta table tr:first-of-type th {
  font-weight: bold;
}
.updatedAt {
  font-style: italic;
}

.ar .meta table tr th {
  text-align: right;
}
.ar .meta table tr th:nth-of-type(2) {
  text-align: center;
}


</style>