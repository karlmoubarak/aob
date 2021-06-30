<template>
  <div ref="content" class="collection">
    <div class="header">
      <input 
        type="button"
        @click="toPDF"
        value="print"
      />
      <p
        class="title"
        v-html="$highlight( title, query )"
      ></p>
      <p 
        class="artist"
        v-html="$highlight( author, query )"
      ></p>
    </div>
    <vue3-markdown-it
      class="description"
      :source="$highlight( description, query )"
    ></vue3-markdown-it>
    <CollectionBody
      :collectionItems="items"
    />
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import jsPDF from 'jspdf' 
// import html2canvas from "html2canvas"

import CollectionBody from '../components/CollectionBody.vue'

export default {
  name: 'Collection',
  components: {
    CollectionBody
  },
  computed: {
    ...mapState([
      'query'
    ]),
    ...mapGetters([
      'collectionBySlug'
    ]),
    collection() { return (
      this.collectionBySlug(
        this.$route.params.slug
      )
    )},
    items()       { return this.collection.items },
    id()          { return this.collection.id },
    title()       { return this.collection.Title },
    author()      { return this.collection.Author },
    description() { return this.collection.Description },
  },
  created() {
  },
  methods: {
    toPDF() {
        const doc = new jsPDF();
        const contentHtml = this.$refs.content.innerHTML;
        doc.html(contentHtml, {
          callback: doc => doc.save()
        });
        // doc.save("sample.pdf");
      // const doc = new jsPDF();
      // /** WITH CSS */
      // var canvasElement = document.createElement('canvas');
      //   html2canvas(this.$refs.content, { canvas: canvasElement 
      //     }).then(function (canvas) {
      //   const img = canvas.toDataURL("image/jpeg", 0.8);
      //   doc.addImage(img,'JPEG',20,20);
      //   doc.save("sample.pdf");
      // });
    }
  }
  
}
</script>

<style scoped>

@font-face {
  font-family: Montserrat;
  src: url(../assets/Montserrat.otf);
  font-weight: normal;
  font-style: normal;
}

.collection {
  font-family: Montserrat;
}
.header {
  padding: 0.5em;
  cursor: pointer;
}
.title  {
  font-size: 20pt;
}
.description {
  padding: 0.5em;
  max-width: 40em;
}
.collection p {
  margin-bottom: 0;
}
</style>