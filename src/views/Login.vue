<template>
  <AuthLayout>
    <v-row class="no-gutters login">
      <v-col lg="6" md="7" sm="12" cols="12" style="position: relative">
        <Forms :title="title" :sub_title="sub_title" />
      </v-col>
      <v-col lg="6" md="5" class="bg_login d-md-block d-sm-none d-none"></v-col>
    </v-row>
  </AuthLayout>
</template>
<script>
import AuthLayout from '@/layouts/auth'
import Forms from '@/components/Forms'
export default {
  name: 'Login',
  components: {
    AuthLayout,
    Forms,
  },
  data: () => ({
    title: 'Login',
    sub_title: 'form login krusty pos',
  }),
  mounted() {
    this.$store.commit('setShow', false)
  },
}
</script>
<style scoped>
.login {
  min-height: 100vh;
}
.bg_login {
  background-image: url('../assets/images/bg-login.png');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
