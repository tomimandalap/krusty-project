<template>
  <LayoutDefault>
    <v-container fluid class="my-4">
      <Breadcrumbs :menu="menu" />
    </v-container>
  </LayoutDefault>
</template>
<script>
import globalMenu from '@/utils/globalMenu'
import Breadcrumbs from '@/components/Breadcrumbs'
import LayoutDefault from '@/layouts/default'
export default {
  name: 'Menus',
  mixins: [globalMenu],
  components: { Breadcrumbs, LayoutDefault },
  data: () => ({
    menu: [],
  }),
  mounted() {
    const title = this.$route.name || 'Menus'
    const list_menu = this.list_menu
    const findMenu = list_menu.find((el) => el.title == title)

    this.menu = [Object.assign(findMenu, { active: false })]
  },
}
</script>
