
<template>
  <div class="selectionList">
    <ul class="selection">
      <li
        v-for="item in selected"
        :key="item.slug"
        @click.stop="$emit('remove', item)"
      >
        <span>
          {{ name(item) }}
        </span>
        <span 
          v-if="isNewItem(item)"
          class="new"
        >
          (new!)
        </span>
      </li>
    </ul>
    <input
      type="text"
      name="search"
      ref="search"
      autocomplete="off"
      :placeholder="'Select or create ' + collection"
      class="content"
      @input="query = $event.target.value; $emit('showOptions')"
      @keyup.enter="sendTerm"
      @click.stop="$emit('showOptions')"
      @keyup.esc="$emit('hideOptions')"
      @keydown.down="userSelectedTerm = list[list.indexOf(selectedTerm)+1]"
      @keydown.up="userSelectedTerm = list[list.indexOf(selectedTerm)-1]"
    />
    <ul 
      class="choices"
      v-if="showOptions"
    >
      <li
        v-for="item in list"
        :key="item.slug"
        :class="{ selected: item == selectedTerm }"
        @click.stop="$emit('add', item)"
      >
        <span>
          {{ name(item) }}
        </span>
        <span 
          v-if="isNewItem(item)"
          class="new"
        >
          {{ ' (create new ' + collection.replace('s', '') + ')' }}
        </span>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'SelectionList',
  props: [
    'collection',
    'selected',
    'showOptions'
  ],
  data() {
    return {
      query: '',
      userSelectedTerm: null,
    }
  },
  computed: {
    locale()  { return this.$store.state.locale },
    createdItem() { return {
      Name: this.query,
      slug: this.query.toLowerCase().replace(' ', '-')
    }},
    list() { 
      return ( 
        [
          ...[ 
            this.isNewItem(this.createdItem) && this.createdItem
          ],
          ...this
          .$store
          .state[this.collection]
          .filter(t => 
            t.Name.toLowerCase().includes(this.query.toLowerCase())
          ||
            t.slug.includes(this.query.toLowerCase())
          ),
        ].filter(
          i => i.slug
         &&
          !this.selected.map(s => s.slug).includes(i.slug)
        )
      ) 
     },
    autoSelectedTerm() { return (
       this.query && this.list[1] || this.list[0]
    )},
    selectedTerm() { 
      return this.userSelectedTerm || this.autoSelectedTerm
    }
  },
  methods: {
    name(item) { return this.locale == 'ar' && item.Name_AR 
      ? item.Name_AR
      : item.Name
    },
    isNewItem(item) {
      return (
        !this
        .$store
        .state[this.collection]
        .map(i => i.slug)
        .includes(item.slug)
      )
    },
    sendTerm(e) {
      if (this.selectedTerm) {
        this.$emit('add', this.selectedTerm)
        e.target.value = ''
        this.query = ''
      } 
    }
  },
  emits: [
    'add',
    'remove',
    'showOptions',
    'hideOptions'
  ],
  mounted() {
  
  },
}
</script>

<style scoped>
.selectionList {
  position: relative;
  font-size: inherit;
  width: 100%;
}
.selectionList ul {
  margin: 0;
  padding: 0;
  cursor: pointer;
}
.selectionList ul li {
  margin: 0;
  padding: 0.3em;
  list-style: none;
  background: var(--lightestorange);
}
.selectionList ul.choices {
  position: absolute;
  width: 100%;
  max-height: 15em;
  overflow: scroll;
  z-index: 1;
  
}
.selectionList ul li:hover,
.selectionList ul li.selected {
  background: var(--lighterorange);
}
.selectionList ul.selection li {
  background: none;
}
.selectionList ul.selection li:hover {
  text-decoration: line-through;
}

input {
  width: 100%;
  background: var(--lightestorange);
  border: none;
  outline: none;
  resize: none;
  box-sizing: border-box;
  padding: 0.3em;
}
.new {
  font-style: italic;
}
a,
a:visited,
a:active,
a:hover {
  /* color: unset; */
  text-decoration: none;
}
</style>