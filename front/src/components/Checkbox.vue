<template>
  <input 
    class="checkbox"
    type="checkbox"
    @input="checkbox"
  />
</template>

<script>
export default {
  name: 'checkbox'

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



</style>