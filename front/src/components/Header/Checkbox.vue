<template>
  <input 
    class="checkbox"
    type="checkbox"
    :checked="checked"
  />
</template>

<script>
export default {
  name: 'checkbox',
  props:['checked']
}
</script>

<style scoped>


input {
  box-sizing: border-box;
  flex-shrink: 0;
  height: 0.8em;
  width: 0.8em;
  border-radius: 0.3em;
  border: 0.05em solid var(--orange);
  appearance:unset;
  font-size: 8pt;
  cursor: pointer;
  margin-right: 0.5em;
  transition: all var(--slow) ease; 
}
input:checked {
  content: '·';
  border-radius: 0.3em;
  border: 0.05em solid var(--orange);
  background: var(--orange);
  appearance:unset;
}
.landing:not(.mobile) input {
  height: 0;
  width: 0;
  margin: 0;
  border: transparent;
}
.mobile input {
  margin-right: 0.7em;
}


</style>