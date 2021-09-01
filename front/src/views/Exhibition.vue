<template>
  <div id="exhibition"  @click="$router.go(-1)">
    <div class="header">
      <p class="title">{{ title }}</p>
      <vue3-markdown-it
        class="desc"
        :source="processImages(desc)"
        
      ></vue3-markdown-it>
    </div>
    <CollectionBody
      :collectionItems="items"
    />
  </div>
</template>

<script>
import { processImages } from '../utils'
import { mapGetters } from 'vuex'
import CollectionBody from '../components/CollectionBody'

export default {
  name: 'Exhibitionn',
  components: {
    CollectionBody,
  },
  computed: {
    ...mapGetters([
      'exhibition'
    ]),
    title() { return this.exhibition.Title },
    desc()  { return this.exhibition.Description },
    items() { return this.exhibition.items },
  },
  methods: {
    processImages,
  }

}
</script>

<style scoped>

#exhibition {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0em;
  background: #ffffffa4;
  overflow: scroll;
  z-index: 2;
  padding: 10em;
  /* display: flex; */
  /* justify-content: center; */
  transform: translateY(0) !important;
}

#exhibition .header {
  /* display:none; */
  box-sizing: border-box;
  position: sticky;
  float: left;
  top: 0; left: 0;
  /* top: 5em; left: 10em; */
  font-family: Montserrat;
  max-width: 30%;
  max-height: 90%;
}

#exhibition .header .title {
  font-size: 20pt;
}

</style>