<template>
  <div :class="type + 's'">
    <span
      v-for="item in list"
      :key="item.slug"
      :class="type"
      :style="{
        '--top': top(),
        '--topNext': top()
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
        console.log(currentSelected)
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
  min-height: 6em;
  /* max-height: 12em; */
}
.locations {
  background-color: var(--lightorange);
  min-height: 8em;
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
 .tag .word:not(.other),
 .location .word:not(.other) {
  margin-bottom: 0em;
  transition: all var(--landing) ease;
}
.tag .word.other,
.location .word.other {
  margin-top: -0.7em;
  /* margin: 0; */
  font-size: 0;
  transition: all var(--landing) ease;
}
.landing:not(.mobile) .tags,
.landing:not(.mobile) .locations {
  max-height: 100%;
  min-height: 100%;
  width: 50%; 
  max-width: 50%; 
}
.landing:not(.mobile) .tag,
.landing:not(.mobile) .location {
  position: relative;
  margin-top: var(--top);
  padding: 1em;
  /* border-radius: 10em; */
  border-radius: 50%;
  height: 100%;
  /* width: 100%; */
  min-width: 7em;
  max-height: 7em;
  /* animation: bounce 5s ease 5s infinite alternate; */
}
@keyframes bounce {
  0% { margin-top: var(--top); }
  100% { margin-top: var(--topNext); }
}
.landing:not(.mobile) .tag .word.other,
.landing:not(.mobile) .location .word.other {
  font-size: inherit;
  margin-top: -0.7em;
}
.landing:not(.mobile) .tag .word:not(.other),
.landing:not(.mobile) .location .word:not(.other) {
  margin-bottom: -0.5em;
}
.landing:not(.mobile) .tag {
  background: var(--purple);
  /* background-color: var(--lightorange); */
}  
.landing:not(.mobile) .location {
  background: var(--highlight);
  /* background-color: var(--lightestorange); */
}
.landing:not(.mobile) .tag:hover,
.landing:not(.mobile) .location:hover {
  transform: translateY(-0.5em);
}

.acronym {
  font-size: 0;
  transition: all var(--landing) ease;
}
.landing:not(.mobile) .acronym {
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
  flex-direction: column;
  flex-wrap: nowrap;
  flex-basis: 50%;
  height: 100%;
}

.mobile.landing .tag,
.mobile.landing .location {
  max-width: 100%;
  margin-top: 0.5em;
  text-align: left;
  align-items: flex-start;
  /* display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; */
  /* justify-content: flex-start; */
}
</style>

