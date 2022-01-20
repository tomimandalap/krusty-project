<template>
  <LayoutDefault>
    <v-container fluid class="py-4 ps-10 pe-10">
      <Breadcrumbs :menu="menu" />
    </v-container>
  </LayoutDefault>
</template>
<script>
import LayoutDefault from '@/layouts/default'
import globalMenu from '@/utils/globalMenu'
import Breadcrumbs from '@/components/Breadcrumbs'
export default {
  name: 'employee',
  mixins: [globalMenu],
  components: { Breadcrumbs, LayoutDefault },
  data() {
    return {
      menu: [],
    }
  },
  mounted() {
    const title = this.$route.name || 'History'
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
