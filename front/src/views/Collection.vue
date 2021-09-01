<template>
  <div v-if="collection" class="collection">
    <div 
      v-if="isMyCollection"
      class="info"
    >
      <div class="header">
        <input 
          class="title"
          name="title"
          ref="title"
          type="text"
          :placeholder="title"
        />
        <input 
          class="author"
          name="author"
          ref="author"
          type="text"
          :placeholder="author"
        />
      </div>
      <textarea 
        class="description"
        name="description"
        ref="description"
        :placeholder="description"
      />
      <div class="options">
        <input 
          class="submit"
          name="submit"
          ref="submit"
          type="button"
          :value="submitText"
          @click="submit"
        />
        <input 
          class="print"
          name="print"
          ref="print"
          type="button"
          :value="printText"
          @click="print"
        />
        <input 
          class="clear"
          name="clear"
          ref="clear"
          type="button"
          :value="clearText"
          @click="clear"
        />
      </div>
    </div>
    <div 
      v-else
      class="info"
    >
      <div class="header">
        <p class="title"> {{ title }}</p>
        <p class="author"> {{ author }}</p>
      </div>
      <vue3-markdown-it
        class="description"
        :source="description"
      ></vue3-markdown-it>
    </div>
    <div class="body">
      <CollectionBody
        :collectionItems="items"
        :isMyCollection="isMyCollection"
      />
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex'
import api from '../api'
import CollectionBody from '../components/CollectionBody.vue'

export default {
  name: 'Collection',
  components: {
    CollectionBody
  },
  computed: {
    ...mapState([
      'locale'
    ]),
    ...mapGetters([
      'collectionBySlug',
      'resourceBySlug',
      'artworkBySlug'
    ]),
    collection() { return (
      this.collectionBySlug(
        this.$route.params.slug
      )
    )},
    isMyCollection() { return this.collection.slug == this.$store.state.myCollection.slug },
    id()          { return this.collection.id },
    title()       { return (
      this.isMyCollection ? 
      this.collection.Title[this.locale] : 
      this.collection.Title ||
      this.$locale.collections.defaults.Title[this.locale]
    )},
    author()      { return (
      this.isMyCollection ? 
      this.collection.Author[this.locale] : 
      this.collection.Author ||
      this.$locale.collections.defaults.Author[this.locale]
    )},
    description() { return (
      this.isMyCollection ? 
      this.collection.Description[this.locale] : 
      this.collection.Description ||
      this.$locale.collections.defaults.Description[this.locale]
    )},
    items()       { 
      return this.collection.items.map(i => i.Organisation ?
        this.resourceBySlug(i.slug) : this.artworkBySlug(i.slug)
      )
    },
    submitText() { return this.$locale.buttons.submit[this.locale] },
    printText() { return this.$locale.buttons.print[this.locale] },
    clearText() { return this.$locale.buttons.clear[this.locale] },
  },
  created() {
  },
  methods: {
  
    ...mapActions([
      'removeFromCollection'
    ]),
  
    clear() {
      this.items.map(i => this.removeFromCollection(i));
      ['title', 'author', 'description'].map(a => this.$refs[a].value = '')
    },
    
    submit() {
      const 
        Title = this.$refs.title.value,
        Author = this.$refs.author.value,
        Description = this.$refs.description.value,
        Item = this.items.map(i => (
          i.Organisation ? {
            __component: "item.resource",
            resource: i.id 
          } : {
            __component: "item.item",
            artwork: i.id 
          }
        ))
        
      if (Title) {
        
        const 
          data = {
            Title,
            Author,
            Description,
            Item,
            published_at: null,
          },
          formData = new FormData()
        formData.append('data', JSON.stringify(data))

        api
        .collections
        .post(formData)
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err) )
        
      } else {
        console.log('No Title')
        
            
      }
    }

  }
  
}
</script>

<style scoped>

.collection {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.info {
  max-width: 40em;
  padding: 2.5em;
  margin: 2.5em;
  /* margin-top: 1em; */
  background: var(--green);
  font-family: Montserrat;
}

.info .options {
  display: flex;
  /* justify-content: flex-start; */
  align-items: flex-start;
  margin-top: 1em;
}

.header {

}
.title  {
  margin: 0;
  font-size: 20pt;
}
.description {
}
.collection .info p,
.collection .info input,
.collection .info textarea {
  margin-bottom: 1em;
  width: 100%;
}
.collection .info input,
.collection .info textarea {
  box-sizing: border-box;
  background: var(--lightgreen);
  border: none;
  outline: none;
  padding: 0.3em;
  font-family: inherit;
}
.collection .info textarea {
  height: 10em;
  margin-bottom: 0;
}
.collection .info .options input {
  cursor: pointer;
  max-width: 8em;
  margin-right: 1em;
  margin-bottom: 0;
}
.body {
  position: relative;
  flex-basis: 100%;
  box-sizing: border-box;
  background: var(--lightgreen);
  padding:2.5em;
  padding-top: 0em;
  /* min-height: 60vh; */
  width: 100%;
}
.mobile .collection .info {
  max-width: 100%;
  margin: 1em;
}

.mobile .collection .body {
  padding: 1em;
}
</style>