Vue.component('mytable', {
  template: '#mytable-tmpl',
  props: {
    data: Array,
    columns: Array,
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    srcdata: function () {
      var parsedUrl = new URL(window.location.href);
      var sortKey = this.sortKey
      var order = this.sortOrders[sortKey] || 1
      var data = this.data

      sortKey = parsedUrl.searchParams.get("key")
      order = parsedUrl.searchParams.get("order")
     
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.toUpperCase() 
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
      var params = {key: key, order: this.sortOrders[key]}
      var esc = encodeURIComponent
      var query = Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&')
      window.history.pushState(null, '',`?${query}`);
     }
  }
})

new Vue({
  el: '#app',
  data: {
    srccolumns: ['name', 'dosage', 'tm', 'color', 'material', 'country', 'count'],
    srcdata: [
      {"name": "Ручка", "dosage": "шт", "tm": "BIC Orange Original", "color": "Синий", "material": "пластик", "country": "Франция", "count": 6},
      {"name": "Карандаш", "dosage": "шт", "tm": "BIC Orange Original", "color": "-", "material": "дерево", "country": "Германия", "count": 5},
      {"name": "Ручка", "dosage": "коробка", "tm": "Pilot", "color": "черный", "material": "металл", "country": "Германия", "count": 9},
      {"name": "Карандаш", "dosage": "шт", "tm": "Parker", "color": "черный", "material": "металл", "country": "Россия", "count": 2}
    ],
  },
})
