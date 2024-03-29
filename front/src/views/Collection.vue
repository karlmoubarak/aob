<template>
  <div 
    v-if="collection" 
    :class="[ 
      'collection', 
      { printing: printing }
    ]"
  >
    <div 
      v-if="isMyCollection && !printing"
      class="info"
      id="myCollection"
    >
      <div class="header">
        <p v-if="titleEmpty" class="error">This field is mandatory.</p>
        <input 
          class="title"
          name="title"
          ref="title"
          type="text"
          :value="title"
          :placeholder="phTitle"
          @input="save"
        />
        <input 
          class="author"
          name="author"
          ref="author"
          type="text"
          :value="author"
          :placeholder="phAuthor"
          @input="save"
        />
      </div>
      <textarea 
        class="description"
        name="description"
        ref="description"
        :value="description"
        :placeholder="phDesc"
        @input="save"
      />
      <div class="options">
        <input 
          class="submit"
          name="submit"
          ref="submit"
          type="button"
          :value="submitText"
          :disabled="empty"
          @click="submit"
        />
        <input 
          class="print"
          name="print"
          ref="print"
          type="button"
          :disabled="empty"
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
        <input
          v-if="status == 'sent'" 
          class="return"
          name="return"
          ref="return"
          type="return"
          :value="returnText"
          @click="status = ''"
        />
      </div>
      <div v-if="status" class="status">
        <p class="title">{{ $locale.collections.upload[status].title[locale] }} </p>
        <p class="desc"> {{ $locale.collections.upload[status].body[locale] }}</p>
      </div>
    </div>
    <div 
      v-else
      class="info"
    >
      <div class="qrCode">
        <canvas ref="qr"></canvas>
      </div>
      <div class="header">
        <p class="title"> {{ title }}</p>
        <p class="author"> {{ author }}</p>
      </div>
      <vue3-markdown-it
        class="description"
        v-bind="$mdOpts"
        :source="description"
      ></vue3-markdown-it>
      <div class="options">
        <input 
          class="print"
          name="print"
          ref="print"
          type="button"
          :disabled="empty"
          :value="printText"
          @click="print"
        />
      </div>
    </div>
    <div class="body">
      <Table
        :collectionItems="items"
        :isMyCollection="isMyCollection"
        :emptyMessage="emptyText"
      />
    </div>
  </div>
  <div
    v-else
    class="noItemMessage"
  >
    <p> {{ noItemMessage }} </p>
  </div>
</template>

<script>

import { 
  mapActions, 
  mapGetters, 
  mapState 
}             from 'vuex'
import api    from '../api'
import QRCode from 'qrcode'
import Table  from '../components/Table'


// Main view for any collection. If the collection is
// the one being edited in the browser, some changes apply.
// The working collection is set/get from LocalStorage
// Collections can be printed with a QR code.

export default {
  name: 'Collection',
  components: { Table },
  data() {
    return {
      titleEmpty: false,
      status: '',
      qrOptions: {
        margin: 0,  
        scale: 4,
        color: {
          light: '#ffffff00',
          dark: '#777777',
        }  
      },
    }
  },
  computed: {
    ...mapState([
      'locale',
      'loading',
      'printing'
    ]),
    ...mapGetters([
      'collectionBySlug',
      'resourceBySlug',
      'artworkBySlug'
    ]),
    
    collection()     { return this.collectionBySlug(this.$route.params.slug)},
    
    items()          { 
      return this.collection.items
      .map(i => i.organisation ?
        this.resourceBySlug(i.slug) : this.artworkBySlug(i.slug)
      )
      .filter(i => i)
    },
    
    title()          { return (
      this.isMyCollection ? 
      this.collection.Title : 
      this.collection.Title ||
      this.fbTitle
    )},
    author()         { return (
      this.isMyCollection ? 
      this.collection.Author : 
      this.collection.Author ||
      this.fbAuthor
    )},
    description()    { return (
      this.isMyCollection ? 
      this.collection.Description : 
      this.collection.Description ||
      this.fbDesc
    )},
    
    empty()          { return this.items.length == 0 },
    isMyCollection() { return this.collection.slug == this.$store.state.myCollection.slug },
    
    fbTitle()        { return this.$locale.collections.defaults.Title[this.locale] },
    fbAuthor()       { return this.$locale.collections.defaults.Author[this.locale] },
    fbDesc()         { return this.$locale.collections.defaults.Description[this.locale] },
    
    phTitle()        { return this.$locale.collections.mine.Title[this.locale] },
    phAuthor()       { return this.$locale.collections.mine.Author[this.locale] },
    phDesc()         { return this.$locale.collections.mine.Description[this.locale] },
    
    submitText()     { return this.$locale.buttons.submit[this.locale] },
    printText()      { return this.$locale.buttons.print[this.locale] },
    clearText()      { return this.$locale.buttons.clear[this.locale] },
    returnText()     { return this.$locale.buttons.return[this.locale] },
    emptyText()      { 
      return ( 
        this.$store.state.resources.length == 0 ?
        this.$locale.status.loading[this.$store.state.locale] :
        this.$locale.collections.defaults.empty[this.locale]
      )
    },
    
    noItemMessage()  {
      return ( 
        this.loading ?
        this.$locale.status.loading[this.locale] :
        this.$locale.status.itemNotFound[this.locale]
      )
    },
    
  },
  
  mounted() {
    
    if (this.collection && !this.isMyCollection) {
      this.makeQR()
    }
  
  },
  
  watch: {
    
    collection() {
      if (this.collection && !this.isMyCollection) {
        setTimeout(() => {
          this.makeQR()
        }, 100)
      }
    }
  
  },
  methods: {
  
    ...mapActions([
      'removeFromCollection'
    ]),
    
    makeQR() {
      QRCode.toCanvas(
        this.$refs.qr, 
        window.location.href,
        this.qrOptions,
        error => { if (error) console.error(error) }
      )
    },
  
    clear() {
      this.items.map(i => this.removeFromCollection(i));
      ['title', 'author', 'description'].map(a => this.$refs[a].value = '')
      this.$store.dispatch('updateMyCollection', {
        Title: '',
        Author: '',
        Description: ''
      })
    },
    
    save() {
      this.$store.dispatch('updateMyCollection', {
        Title: this.$refs.title.value,
        Author: this.$refs.author.value,
        Description: this.$refs.description.value,
      })
    },
    
    submit() {
    
      const data = {
        Title: this.$refs.title.value,
        Author: this.$refs.author.value,
        Description: this.$refs.description.value,
        published_at: null,
        Item: this.items.map(i => (
          i.organisation ? {
            __component: "item.resource",
            resource: i.id 
          } : {
            __component: "item.item",
            artwork: i.id 
          }
        ))
      } 
             
      if (data.Title) {
        
        this.titleEmpty = false
        const formData = new FormData()
        formData.append('data', JSON.stringify(data))

        this.status = 'sending'
        
        api
        .collections
        .post(formData)
        .then(() => this.status = 'sent')
        .catch(() => this.status = 'errored' )
        
      } else {
        this.titleEmpty = true
        this.$refs.title.focus()
            
      }
    },
    
    print() {
      this.$store.commit('setPrinting', true)
      setTimeout(() => {
        window.print()
        this.$store.commit('setPrinting', false)
      }, 300)
    }

  }
  
}
</script>

<style scoped>

.collection {
  position: relative;
  box-sizing: border-box;
  height: 100%;
}

.noItemMessage {
  padding: 5% 5%;
}

.title  {
  margin: 0;
  font-size: 20pt;
}
canvas {
  height: 320px;
  margin-bottom: 1em;
}
.collection .info {
  box-sizing: border-box;
  position: relative;
  max-width: 47em;
  padding: 2.5em;
  margin: 2.5em;
  background: var(--green);
  font-family: Montserrat;
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

.collection .info p.error {
  color: red;
  margin-bottom: 0.5em;
}

.collection .info textarea {
  height: 10em;
  margin-bottom: 0;
  resize: none;
}
.collection .info .options {
  display: flex;
  align-items: flex-start;
  margin-top: 1em;
}
.collection .info .options input {
  cursor: pointer;
  max-width: 8em;
  margin-right: 1em;
  margin-bottom: 0;
}
.collection .info .options input:disabled {
  opacity: 0.7;
  pointer-events: none;
  cursor: not-allowed;
}
.collection .info .options input.return {
  z-index: 1;
  position: absolute;
  text-align: center;
}
.collection .info .status {
  position: absolute;
  box-sizing: border-box;
  top: 0; left: 0;
  height: 100%; width: 100%;
  padding: 3em;
  background: inherit;
}

.body {
  position: relative;
  flex-basis: 100%;
  box-sizing: border-box;
  background: var(--lightgreen);
  padding:2.5em;
  padding-top: 0em;
  width: 100%;
  min-height: 100%;
  padding-top: 2.5em;
}

.mobile .collection .info {
  max-width: 100%;
  margin: 0.5em;
  padding: 1em;
}

.mobile .collection .body {
  padding: 1em;
}

.ar .collection .info .options input {
  margin-right: unset;
  margin-left: 1em;
}

.printing .collection .body {
  background: #f2e4c4;
  padding: 0;
  position: relative;
  page-break-before: always;
  padding: 0;
}
@media print {
  .collection .body {
      background: #f2e4c4;
      padding: 0;
      position: relative;
      page-break-before: always;
      padding: 0;
  }
}
</style>
