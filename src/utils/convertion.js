const convertion = {
  data() {
    return {}
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })
        .format(value)
        .split(',')[0]
    },
  },
}

export default convertion
