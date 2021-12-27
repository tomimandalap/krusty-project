const globalMenu = {
  data() {
    return {
      list_menu: [
        {
          title: 'Dasboard',
          name: 'Dasboard',
          icon: 'mdi-view-grid',
          link: '/',
          child_menu: [],
        },
        {
          title: 'Products',
          name: 'Products',
          icon: 'mdi-package-variant-closed',
          link: '/products',
          child_menu: [
            {
              title: 'Add',
              name: 'Dasboard',
              icon: '',
              link: '/products/add',
            },
            {
              title: 'Detail',
              name: 'Dasboard',
              icon: '',
              link: '/products/detail',
            },
          ],
        },
        {
          title: 'Menus',
          name: 'Food & Drinks',
          icon: 'mdi-food',
          link: '/menus',
          child_menu: [],
        },
        {
          title: 'History',
          name: 'History',
          icon: 'mdi-calendar-text',
          link: '/history',
          child_menu: [
            {
              title: 'Detail',
              name: 'Detail',
              icon: '',
              link: '/history/detail',
            },
          ],
        },
      ],
    }
  },
}

export default globalMenu
