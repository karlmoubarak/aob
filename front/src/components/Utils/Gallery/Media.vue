<template>
  <div :class="[ 'item', { border } ]">
    <div class="content">
      <img
        v-if="type == 'image'" 
        class="cover"
        :src="cover"
      />
      <video
        class="cover"
        v-else-if="type == 'video'"
        preload="metadata"
        controls
      >
        <source :src="source + '#t=0.01'" />
      </video>
      <audio
        class="cover"
        v-else-if="type == 'audio'"
        controls
      ><source :src="source" />
      </audio>
    </div>
      <input
        v-if="editable"
        type="text"
        name="caption"
        ref="caption"
        class="caption"
        placeholder="Add copy right information"
        :value="caption"
        @input="$emit('setCaption', $event)"
      />
    <div 
      v-else-if="showCredits"
      class="caption"
    >
      {{ caption }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Media',
  props: [ 
    'type',
    'source',
    'cover',
    'caption',
    'showCredits',
    'editable',
    'border'
  ],
  emits: [
    'setCaption',
  ],
}
</script>

<style scoped>

.item {
  position: relative;
  box-sizing: border-box;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.item .content {
  position: relative;
  box-sizing: border-box;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item.border .content {
  padding: 0.6em;
  border: 1px solid;
}


.item .content .cover {
  position: relative;
  box-sizing: border-box;
  min-width: 100%;
  max-width: 100%;
}
.item .content audio.cover {
  /* margin: 1em 0;
  padding: 0 1em; */
}

.item .caption {
  box-sizing: border-box;
  font-style: italic;
  text-align: center;
  margin: 0.3em 0;
  width: 100%;
}

.item input.caption {
  background: var(--lightestorange);
  border: none;
  outline: none;
  resize: none;
  box-sizing: border-box;
  padding: 0.3em;
}

.fullscreen .item  {
  height: calc(100% - 12em);
}
.fullscreen .item .content {
  height: 100%;
  flex-grow: 0;
  border: none;
  padding: 0;
}

.fullscreen .item .content .cover {
  max-height: 80%;
  max-width: 80%;
  min-width: unset;
}



</style>
