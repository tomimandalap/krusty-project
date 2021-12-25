<template>
  <div class="d-flex justify-start align-center">
    <v-btn fab elevation="0" small icon color="#F0F0F0" @click="handleSideLeft">
      <v-icon color="#000" small dark>
        {{ show ? 'mdi-arrow-left' : 'mdi-arrow-right' }}
      </v-icon>
    </v-btn>

    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="item.link" :disabled="item.disabled">
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          link: '/dasboard',
        },
        {
          text: 'Link 1',
          disabled: true,
          link: 'breadcrumbs_link_1',
        },
      ],
    }
  },
  computed: {
    show() {
      return this.$store.state.show
    },
  },
  methods: {
    handleSideLeft() {
      this.$store.dispatch('show_side', !this.show)
    },
  },
}
</script>
