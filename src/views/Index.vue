<template>
  <div class="my-4">
    <breadcrumbs />

    <div class="content-center text-center">
      <v-img
        :src="require('@/assets/images/dasboard.png')"
        alt="dasboard.png"
        max-width="500"
        class="d-block mx-auto"
      ></v-img>
      <h2 class="my-5">WELCOME TO</h2>
      <h1>
        KRUSTY
        <span style="color: #ff0000">POS</span>
      </h1>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
export default {
  name: 'Dasboard',
  components: { Breadcrumbs },
}
</script>
