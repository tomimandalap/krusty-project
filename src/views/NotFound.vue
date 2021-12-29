<template>
  <div class="content-center text-center">
    <v-img
      :src="require('@/assets/images/404.png')"
      alt="404.png"
      max-width="500"
      class="d-block mx-auto"
    ></v-img>
    <h2 class="my-5">
      Page
      <span style="color: #ff0000">Not Found</span>
    </h2>
    <v-btn
      elevation="0"
      color="#FFE600"
      light
      class="text-capitalize rounded-lg"
      @click="
        () => {
          $router.push('/')
          $store.commit('setShow', true)
        }
      "
    >
      Dasboard
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'notFound',
}
</script>
