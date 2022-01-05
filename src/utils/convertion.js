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
    convertMoney(value) {
      let replaceMoney = String(value).replaceAll('.', '')
      return parseInt(replaceMoney)
    },
  },
}

export default convertion
