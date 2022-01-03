<template>
  <v-overlay :value="showLoading">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    showLoading: { type: Boolean, default: false },
  },
}
</script>
