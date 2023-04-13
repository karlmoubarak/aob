<template>
  <div id="infoContainer">
    <div id="info">
      <div class="sections">
        <vue3-markdown-it
          class="content"
          v-bind="$mdOpts"
          :source="about"
        ></vue3-markdown-it>
        <div class="updatedAt">
          <p>{{ updatedAt }}.</p>
        </div>
      </div>
      <div class="meta">
        <div class="card">
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
        </div>
        <div class="card">
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
        <!-- </div> -->
        <!-- <div class="card"> -->
          <div class="repo">
            <!-- <p>{{ $locale['info']['repo'][locale] }}</p> -->
            <vue3-markdown-it
              class="content"
              v-bind="$mdOpts"
              :source="$locale['info']['repo'][locale]"
            ></vue3-markdown-it>
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
import Upload from './Upload'

// This is the info view, with an About text, it's last update,
// some of the archive's metadata, the link to the repo, and
// links to upload forms for resources and artworks.

export default {
  name: 'Info',
  components: { Upload },
  computed: {
    ...mapState([
      'locale',
      'info'
    ]),
    about() {
      return processImages(
        this.info.About &&
        this.info.About[this.locale]
      )
    },
    updatedAt() {
      return this.$locale['info']['updated_at'][this.locale] + ' ' +
      moment(this.info['updated_at']).locale(this.locale).format('MMMM DD, YYYY, HH:mm')
    },
    archiveLastUpdated() {
      return moment( sortByUpdate(
        this.$store.getters.mainCollection
        .map(i => i .updated_at)
      )[0])
      .locale(this.locale)
      .format('MMMM DD, YYYY, HH:mm')
    },
  },
  methods: {
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
  font-family: montserrat;
}
#info {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: flex-start;
}
.sections {
  padding: 2em;
  box-sizing: border-box;
  width: 52em;
  max-width: 52em;
  background: var(--lightestorange);
  margin: 2em;

}
.meta {
  box-sizing: border-box;
  font-family: 'Courier New', Courier, monospace;
  max-width: 28em;
  position: sticky;
  top: 2em;
}

.meta .card {
  background: var(--green);
  position: relative;
  padding: 2em;
  margin-bottom: 2em;
}

.meta .card p:first-of-type {
  margin-top: 0;
}
.meta .card p:last-of-type {
  margin-bottom: 0;
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
  margin-top: 1em;
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
  margin-top: 1em;
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
  padding: 1.5em;
}

.mobile .meta .card a {
  word-break: break-all;
}
.mobile .meta .card:first-of-type {
  display: none;
}
.mobile .sections {
  min-width: 0;
  max-width: 100%;
}

</style>
