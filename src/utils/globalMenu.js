const globalMenu = {
  data() {
    return {
      list_menu: [
        {
          title: 'Dasboard',
          name: 'Dasboard',
          icon: 'mdi-view-grid',
          link: '/',
          access: [1, 2], // admin , cashier
          child_menu: [],
        },
        {
          title: 'Products',
          name: 'Products',
          icon: 'mdi-package-variant-closed',
          link: '/products',
          access: [1],
          child_menu: [
            {
              title: 'Add',
              name: 'Dasboard',
              icon: '',
              link: '/products/add',
              access: [1],
            },
            {
              title: 'Detail',
              name: 'Dasboard',
              icon: '',
              link: '/products/detail',
              access: [1],
            },
          ],
        },
        {
          title: 'Menus',
          name: 'Food & Drinks',
          icon: 'mdi-food',
          link: '/menus',
          access: [2],
          child_menu: [],
        },
        {
          title: 'History',
          name: 'History',
          icon: 'mdi-calendar-text',
          link: '/history',
          access: [1, 2],
          child_menu: [
            {
              title: 'Detail',
              name: 'Detail',
              icon: '',
              link: '/history/detail',
              access: [1],
            },
          ],
        },
      ],
    }
  },
}

export default globalMenu
