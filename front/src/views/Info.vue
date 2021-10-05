<template>
  <div id="infoContainer">
    <div id="info">
      <div class="sections">
        <vue3-markdown-it
          class="content"
          v-bind="$mdOpts"
          :source="source('About')"
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
        <div 
          v-if="!$store.state.isMobile"
          class="contribute"
        >
          <p>{{ $locale['info']['contribute'][locale] }} </p>
          <div class="buttons">
            <input 
              class="submit"
              name="submit resource"
              ref="submitResource"
              type="button"
              :value="$locale['buttons']['submitResource'][locale]"
              @click="$router.push('/upload/resource')"
            />
            <input 
              class="submit"
              name="submit artwork"
              ref="submitArtwork"
              type="button"
              :value="$locale['buttons']['submitArtwork'][locale]"
              @click="$router.push('/upload/artwork')"
            />
          </div>
        </div>
        <div class="repo">
          <p>{{ $locale['info']['repo'][locale] }}</p>
          <p class="center">
             →
              <a  
                target="blank"
                :href="info.LinkToPublicCodeRepository"
              >
                {{ info.LinkToPublicCodeRepository }}
              </a>
              ←
          </p>
        </div>
      </div>
      <transition name="fade">
        <Upload
          v-if="$route.path == '/upload/resource'"
          selectedType="resource"
        />
        <Upload
          v-else-if="$route.path == '/upload/artwork'"
          selectedType="artwork"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { processImages, sortByUpdate } from '../utils'
import moment from 'moment'
import Upload from '../components/Upload'


export default {
  name: 'Info',
  components: {
    Upload
  },
  data() {
    return {
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
  padding: 1em;
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
  background: var(--green);
  max-width: 25em;
  position: sticky;
  top: 0;
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
.meta .contribute .buttons {
  display: flex;
  justify-content: center;
}
.meta .contribute input {
  box-sizing: border-box;
  background: var(--lightgreen);
  border: none;
  outline: none;
  padding: 0.3em 1em;
  font-family: montserrat;
  cursor: pointer;
  margin-right: 1em;
  margin-bottom: 0;
}
.meta .contribute input:last-of-type {
  margin-right: 0;
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
.ar .meta .contribute input {
  margin-right: unset;
  margin-left: 1em;
}
.ar .meta .contribute input:last-of-type {
  margin-left: 0;
}

.mobile #infoContainer {
  padding: 0em;
}
.mobile #info {
  flex-direction: column;
}

.mobile .sections,
.mobile .meta {
  margin: 0;
  padding: 1em;
}
</style>