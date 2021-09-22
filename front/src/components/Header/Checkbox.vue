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
  flex-shrink: 0;
  /* position: relative; */
  box-sizing: border-box;
  height: 0.8em;
  width: 0.8em;
  border-radius: 0.3em;
  border: 0.05em solid var(--orange);
  /* background: rgba(255, 255, 255, 0.507); */
  appearance:unset;
  font-size: 8pt;
  cursor: pointer;
  margin-right: 0.5em;
  transition: all var(--slow) ease;
  
}
input:checked {
  /* position: absolute; */
  /* top: 0; */
  content: '·';
  border-radius: 0.3em;
  border: 0.05em solid var(--orange);
  background: var(--orange);
  appearance:unset;
}
.landing input {
  height: 0;
  width: 0;
  margin: 0;
  border: transparent;
}



</style>