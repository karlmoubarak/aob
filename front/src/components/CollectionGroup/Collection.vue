<template>
  <div  
    dir="ltr"
    :class="['collectionContainer', { isExhibition }]"
    @click.stop="$router.push({
      name:'Collection',
      params: { slug }
    })"
  >
    <div class="collection">
      <div class="header">
        <div class="circleContainer">
          <div class="circle"></div>
        </div>
        <div class="info">
          <p class="title">{{ title }}</p>
          <p class="author">{{ author }}</p>
        </div>
      </div>
      <div class="body">
        <p v-if="description" class="description">
          <vue3-markdown-it
            v-bind="{ ...$mdOpts, ...{ html: false }}"
            :source="$highlight( description )"
          ></vue3-markdown-it>
        </p>
        <div class="overview">
          <li 
            v-for="item in items" 
            :key="item.slug"
          >{{ item.organisation || item.title }}</li>
        </div>
      </div>
      <div
        v-if="isExhibition"
        class="exhibitionHeader"
        @click.stop="$router.push('/exhibition')"
      >
        <div>Go to Exhibition</div>
      </div>
    </div>
  </div>
</template>

<script>

// Component to display a collection in a small card format.

export default {
  name: 'Collection',
  props: [ 'collection' ],
  computed: {
    title()        { return this.collection.Title },
    slug()         { return this.collection.slug },
    author()       { return this.collection.Author || 'Anonymous' },
    description()  { return this.collection.Description },
    items()        { return this.collection.items },
    isExhibition() { return this.collection.isCurrentExhibition }
  },
  
}
</script>

<style>


.collectionContainer {
  position: relative;
  box-sizing: border-box;
  flex-basis: 32%;
  min-width: 32%;
  width: 32%;
  margin: 0.5%;
  background: var(--lightgreen);
  cursor: pointer;
  border-radius: 0.5em;
  transition: all var(--fast) ease;
}

.collectionContainer .collection {
  max-height: 23em;
  margin: 0.5em;
  border-radius: inherit;
  background: var(--green);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all var(--fast) ease;
  padding: 1em;
}
.collectionContainer .header {
  cursor: pointer;
  width: 100%;
  display: flex;
  /* align-items: center; */
  flex-wrap: wrap;
}
.collectionContainer .header .circleContainer {
  flex-basis: 10%;
}
.collectionContainer .header .circleContainer .circle {
  position: relative;
  width: 2.8em;
  height: 2.8em;
  background-color: white;
  background: var(--lightgreen);
  transition: all var(--fast) ease;
  border-radius: 3em;
}

.collectionContainer .header .info  {
  flex-basis: 80%;
  padding-left: 1em;
}
.collectionContainer .header .info * {
  margin: 0;
}
.collectionContainer .header .info .title  {
  font-size: 12pt;
  font-weight: bold;
}
.collectionContainer .body {
  flex-basis: 100%;
  padding-top: 1em;
  display: flex;
  align-items: flex-start;
}
.collectionContainer .description {
  flex-basis: 50%;
  min-width: 50%;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.collectionContainer .description p:first-of-type,
.collectionContainer .description p:last-of-type {
  margin: 0;
}
.collectionContainer .overview {
  padding-left: 1em;
}
.collectionContainer .overview li {
  list-style: none;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.collectionContainer .overview li::before {
  content: '→ ';
}

.collectionContainer:hover {
  background: var(--green);
  box-shadow: 0 0 1.5em 0 var(--green);
}
.collectionContainer:hover .collection {
  background: var(--lightgreen);
}
.collectionContainer:hover .collection .circleContainer .circle {
  background: var(--green);
}

.collectionContainer.isExhibition {
  background: var(--lightpurple);
}
.collectionContainer.isExhibition:hover {
  background: var(--purple);
  box-shadow: 0 0 1.5em 0 var(--purple);
}
.collectionContainer.isExhibition .exhibitionHeader {
  cursor: pointer;
  border-radius: inherit;
  padding: 0.5em;
  margin-top: 1em;
  background: var(--lightpurple);
  transition: all var(--fast) ease;
}
.collectionContainer.isExhibition .collection {
  background: var(--purple);
}
.collectionContainer.isExhibition:hover .exhibitionHeader {
  background: var(--purple);
} 
.collectionContainer.isExhibition:hover .collection {
  background: var(--lightpurple);
}
.collectionContainer.isExhibition .header .circleContainer .circle {
  background: var(--lightpurple);
}
.collectionContainer.isExhibition:hover .collection .circleContainer .circle {
  background: var(--purple);
}

.mobile .collectionContainer {
  min-width: calc(100% - 1em);
  max-width: calc(100% - 1em);
  width: calc(100% - 1em);
  margin: 0.5em;
  margin-bottom: 0;
  flex-basis: unset;
}

.mobile .collectionContainer .info {
  flex-basis: 70%;
}

.mobile .collectionContainer .body .description {
  flex-basis: 100%;
}
.mobile .collectionContainer .body .overview {
  display: none;
}

</style>
