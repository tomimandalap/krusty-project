<template>
  <div class="min-100-vh" :style="styleS">
    <div class="content-center">
      <v-card elevation="6" max-width="270" class="pa-4 rounded-lg">
        <h4>Browser not supported! Please using browser chrome or safari.</h4>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'browserSupport',
  data() {
    return {
      image: 'browsersupport.png',
    }
  },
  computed: {
    styleS() {
      return {
        backgroundImage: `url(${require('@/assets/images/' + this.image)})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    },
  },
}
</script>
