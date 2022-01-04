<template>
  <LayoutDefault>
    <v-container fluid class="my-4">
      <Breadcrumbs :menu="menu" />
    </v-container>
  </LayoutDefault>
</template>
<script>
import LayoutDefault from '@/layouts/default'
import Breadcrumbs from '@/components/Breadcrumbs'
import globalMenu from '@/utils/globalMenu'
export default {
  name: 'addProduct',
  mixins: [globalMenu],
  components: {
    LayoutDefault,
    Breadcrumbs,
  },
  data: () => ({
    menu: [],
  }),
  mounted() {
    const [title_menu, title_submenu] = this.$route.path.split('/').slice(1)

    // parrent menu
    const parrent_menu = this.list_menu.find(
      (el) => el.title.toLowerCase() === title_menu,
    )

    // child menu
    const sub_menu = this.list_menu.reduce((previousVal, currentVal) => {
      const data = currentVal.child_menu.find(
        (el) => el.title.toLowerCase() === title_submenu,
      )
      if (data) previousVal = data
      return previousVal
    }, {})

    delete parrent_menu.child_menu

    // assign data
    const assignParent = Object.assign(parrent_menu, { active: false })
    const assignSub = Object.assign(sub_menu, { active: true })

    const dataMenu = []

    dataMenu.push(assignParent)
    dataMenu.push(assignSub)

    // mapping menu
    this.menu = dataMenu.map((el) => {
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
