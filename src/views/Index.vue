<template>
  <LayoutDefault>
    <v-container fluid class="py-4 ps-10 pe-10">
      <Breadcrumbs :menu="menu" />

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
    </v-container>
  </LayoutDefault>
</template>

<script>
import globalMenu from '@/utils/globalMenu'
import Breadcrumbs from '@/components/Breadcrumbs'
import LayoutDefault from '@/layouts/default'
export default {
  name: 'Dasboard',
  mixins: [globalMenu],
  components: { Breadcrumbs, LayoutDefault },
  data() {
    return {
      menu: [],
    }
  },
  mounted() {
    const title = this.$route.name || 'Dasboard'
    const list_menu = this.list_menu
    const findMenu = list_menu.find((el) => el.title == title)

    // assign obj
    const assignData = [Object.assign(findMenu, { active: true })]

    // mapping menu
    this.menu = assignData.map((el) => {
      const { title, active, link } = el
      return {
        text: title,
        disabled: active,
        href: link,
      }
    })
  },
}
</script>
