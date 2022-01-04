<template>
  <div class="d-flex justify-start align-center">
    <v-btn
      elevation="0"
      small
      icon
      color="#F0F0F0"
      class="mt-n1"
      @click="handleSideLeft"
    >
      <v-icon color="#000" small dark>
        {{ show ? 'mdi-arrow-left' : 'mdi-arrow-right' }}
      </v-icon>
    </v-btn>

    <v-breadcrumbs :items="menu">
      <template v-slot:divider>
        <v-icon class="mt-n1">mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>
<script>
export default {
  props: {
    menu: { type: Array, default: () => {} },
  },
  data() {
    return {}
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

<style scoped>
.disable-link {
  color: #8e8e8e;
  pointer-events: none;
}
</style>
