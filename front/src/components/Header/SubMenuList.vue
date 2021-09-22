<template>
  <div :class="type + 's'">
    <span
      v-for="item in list"
      :key="item.slug"
      :class="type"
      :style="{
        '--top': top()
      }"
      @click="toggle(item.slug)"
    >
      <span class="word">
        <Checkbox 
          :checked="isInQuery(item.slug)"
        />
        <a>
          <span
            v-html="$highlight(name(item), queries )"
          ></span>    
        </a>
      </span>
      <span class="acronym">{{ acronym(item) }}</span>
      <span class="word other">
        <a>
          <span
            v-html="$highlight(nameOther(item), queries )"
          ></span>    
        </a>
      </span>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Checkbox                 from './Checkbox'

export default {
  name: 'SubMenuList',
  components: { Checkbox },
  props: [
    'list',
    'type'
  ],
  computed: {
    ...mapState([ 'query', 'locale' ]),
    ...mapGetters([ 'queries' ])
  },
  methods: {
    top: () => Math.random() * 30 + '%',
    isInQuery(slug) {
      return (
        this.$route.query[this.type] && 
        this.$route.query[this.type].includes(slug)
      )
    },     
    name(item) { return this.locale == 'ar' && item.Name_AR 
      ? item.Name_AR
      : item.Name
    },
    nameOther(item) { return this.locale == 'en' && item.Name_AR 
      ? item.Name_AR
      : item.Name
    },
    acronym(item) { return (
      this.name(item)
      .split(' ')
      .map(w => w[0])
      .join('')
    )},
    toggle(slug) {
      const currentSelected = this.$route.query[this.type]
      if (currentSelected) {
        if (!this.isInQuery(slug)) {
          this.$router.push({
            path: '/archive',
            query: { 
              ...this.$route.query,
              ...{ [this.type]: [...currentSelected, ...[slug]] }
            }
          })
        } else {
          this.$router.push({
            path: '/archive',
            query: {
              ...this.$route.query,
              ...{ [this.type]: currentSelected.filter(t => t !== slug) }
            }
          })
        }
      } else { 
        this.$router.push({
          path: '/archive',
          query: {
            ...this.$route.query,
            ...{ [this.type]: [slug] }
          }
        })
      }
    },
  }
}
</script>

<style scoped>
.tags,
.locations {
  box-sizing: border-box;
  /* position: relative; */
  width: 40%;
  max-width: 40em;
  /* height: 100%; */
  padding: 0.4em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  overflow: scroll; 
  transition: all var(--landing) ease;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.tags::-webkit-scrollbar,
.locations::-webkit-scrollbar {
  display: none;
}
.tags {
  background-color: var(--lightestorange);
  /* max-height: 12em; */
}
.locations {
  background-color: var(--lightorange);
  /* max-height: 8em; */
}

.tag,
.location {
  margin: 0.5em;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  max-height: 1em;
  /* width: 100%; */
  min-width: 3em;
  max-width: 16em;
  transition: all var(--landing) ease;
  cursor: pointer;
  text-align: center;
}
.tag .word.other,
.location .word.other {
  font-size: 0;
  transition: all var(--landing) ease;
}
.landing .tags,
.landing .locations {
  max-height: 100%;
  height: 100%;
  width: 50%; 
  max-width: 50%; 
}
.landing .tag,
.landing .location {
  position: relative;
  margin-top: var(--top);
  padding: 1em;
  /* border-radius: 10em; */
  border-radius: 50%;
  height: 100%;
  /* width: 100%; */
  min-width: 7em;
  max-height: 7em;
}
.landing .tag .word.other,
.landing .location .word.other {
  font-size: inherit;
  margin-top: -0.7em;
}
.landing .tag .word:not(.other),
.landing .location .word:not(.other) {
  margin-bottom: -0.5em;
}
.landing .tag {
  background: var(--purple);
}  
.landing .location {
  background: var(--highlight);
}
.acronym {
  font-size: 0;
  transition: all var(--landing) ease;
}
.landing .acronym {
  font-size: 4em;
}
.word {
  display: flex;
  align-items: center;
}
a,
a:visited,
a:active {
  /* display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; */
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
  color: var(--orange);
}


.mobile .tags,
.mobile .locations {
  flex-wrap: nowrap;
  /* flex-basis: 50%; */
}

.mobile.landing .tag,
.mobile.landing .location {
  max-width: 100%;
  margin-top: 0.5em;
}
</style>

