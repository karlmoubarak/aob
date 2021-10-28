<template>
  <div 
    :class="[ 'icon', type, { selected } ]"
    @click.stop="$emit('select')"
  >
    <div
      v-if="editable"
      class="remove"
      @click.stop="$emit('remove')"
    >
      <span>x</span>  
    </div>
    <img 
      class="thumb"
      v-if="type == 'image'"
      :src="thumb"
    /> 
    <video
      class="thumb"
      v-else-if="type == 'video'"
      :controls='false'
      preload="metadata"
      muted
      @click.prevent
    >
      <source :src="source + '#t=0.5'" />
    </video>
    <img
      class="thumb"
      v-else-if="type == 'audio'"
      src="../../../assets/icons/audio.png"
    />
  </div>
</template>

<script>
export default {
  name: "Thumb",
  props: [
    'type',
    'source',
    'thumb',
    'selected',
    'editable'
  ],
  emits: [
    'select',
    'remove',
  ],
}
</script>

<style scoped>

.icon {
  position: relative;
  cursor: pointer;
  width: 4em;
  height: 4em;
  margin: 0.3em;
}

.icon .thumb {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.icon.audio .thumb {
  padding: 1em;
}

.icon.video::after {
  content: '';
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: url(../../../assets/icons/video.png);
  background-size: 70% 70%;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.6;
}

.icon .remove {
  box-sizing: border-box;
  position: absolute;
  top: -0.4em;
  left: -0.4em;
  height: 1em;
  width: 1em;
  padding: 0.1em;
  padding-bottom: 0.3em;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--orange);
  color: white;
  border-radius: 10em;
  opacity: 0;
  pointer-events: none;
}

.icon:hover .thumb,
.icon.selected .thumb {
  opacity: 0.3;
}

.icon.selected .remove,
.icon:hover .remove {
  opacity: 1;
  pointer-events: all;
}

</style>
