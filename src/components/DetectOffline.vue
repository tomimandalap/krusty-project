<template>
  <div class="content-center text-center">
    <v-img
      :src="require('@/assets/images/nointernet.png')"
      alt="nointernet.png"
      max-width="400"
      class="d-block mx-auto"
    ></v-img>
    <h2 class="my-5">
      Oops..,
      <span style="color: #ff0000">No Internet</span>
    </h2>
  </div>
</template>
<script>
export default {
  name: 'detectOffline',
  mounted() {
    this.$store.commit('setShow', false)
  },
}
</script>
