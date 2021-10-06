<template>
  <div  
    class="collectionContainer"
    @click.stop="$router.push({
      name:'Collection',
      params: { slug }
    })"
  >
    <div class="collection">
      <div class="circleContainer">
        <div class="circle"></div>
      </div>
      <div class="info">
        <div class="header">
          <p class="title">{{ title }}</p>
          <p 
            class="author"
          >{{ author }}</p>
        </div>
        <div class="body">
          <p class="description">
            <vue3-markdown-it
              :source="description"
            ></vue3-markdown-it>
          </p>
          <div class="overview">
            <li 
              v-for="item in items" 
              :key="item.slug"
            >{{ item.organisation || item.title }}</li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Collection',
  props: [ 'collection' ],
  computed: {
    id()          { return this.collection.id },
    title()       { return this.collection.Title },
    slug()        { return this.collection.slug },
    author()      { return this.collection.Author || 'Anonymous' },
    items()       { return this.collection.items },
    description() { return this.collection.Description },
  },
  
}
</script>

<style>


.collectionContainer {
  position: relative;
  box-sizing: border-box;
  flex-basis: 32%;
  min-width: 32%;
  /* max-width: 33%; */
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
  justify-content: space-between;
  /* flex-direction: column; */
  overflow: hidden;
  transition: all var(--fast) ease;
  padding: 1em;
}
.collectionContainer .collection .circleContainer {
  flex-basis: 10%;
}
.collectionContainer .collection .circleContainer .circle {
  position: relative;
  width: 3em;
  height: 3em;
  background-color: white;
  background: var(--lightgreen);
  transition: all var(--fast) ease;
  border-radius: 3em;
}
.collectionContainer .collection .info {
  flex-basis: 90%;
  padding: 0 0.5em;
}
.collectionContainer .header {
  cursor: pointer;
}
.collectionContainer .title  {
  font-size: 12pt;
  font-weight: bold;
  margin: 0;
}
.collectionContainer .title a {
}

.collectionContainer .body {
  flex-basis: 80%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.collectionContainer .description {
  flex-basis: 60%;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.collectionContainer .description p:first-of-type,
.collectionContainer .description p:last-of-type {
  margin: 0;
}
.collectionContainer .overview {
  flex-basis: 30%;
  /* display: flex;
  flex-direction: column; */
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

.mobile .collectionContainer {
  min-width: 100%;
  max-width: 100%;
  width: 100%;
  margin: 0;
  margin-bottom: 0.5em;
  flex-basis: unset;
}

.mobile .collectionContainer .circleContainer {
  position: absolute;
}
.mobile .collectionContainer .info {
  flex-basis: 100%;
  padding: 0;
}

.mobile .collectionContainer .info .header {
  margin-left: 4em;
  margin-top: 0.3em;
}
.mobile .collectionContainer .info .body {
  margin-top: 1em;
}
.mobile .collectionContainer .info .body .description {
  flex-basis: 100%;
}
.mobile .collectionContainer .info .body .overview {
  display: none;
}
.mobile .collectionContainer .author  {
  margin: 0;
}

</style>