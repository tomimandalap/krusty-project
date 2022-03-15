<template>
  <LayoutDefault>
    <Loading :showLoading="loading" />
    <v-container v-if="!loading" fluid class="py-4 ps-10 pe-10">
      <Breadcrumbs :menu="menu" />

      <v-card class="my-5">
        <v-card-title>
          <v-form @submit.prevent="handleSearching" style="width: 100%">
            <v-text-field
              v-model="params.q"
              dense
              outlined
              single-line
              hide-details
              color="black"
              append-icon="mdi-magnify"
              class="rounded-lg"
              placeholder="Searching by Name"
            ></v-text-field>
          </v-form>
        </v-card-title>
        <v-data-table :headers="headers" :items="datas">
          <template #[`header.name`]="{ header }">
            <div class="text-truncate">
              {{ header.text }}
            </div>
            <v-chip label x-small outlined color="#0085FF" class="mb-2">
              User ID
            </v-chip>
          </template>
          <template #[`item.name`]="{ item }">
            <div class="text-truncate">
              {{ item.name }}
            </div>
            <v-chip label x-small outlined color="#0085FF" class="mb-2">
              {{ item.user_id }}
            </v-chip>
          </template>

          <template #[`header.email`]="{ header }">
            <div class="text-truncate">
              {{ header.text }}
            </div>
            <v-chip label x-small outlined color="#0085FF" class="mb-2">
              Access
            </v-chip>
          </template>
          <template #[`item.email`]="{ item }">
            <div class="text-truncate">
              {{ item.email }}
            </div>
            <v-chip label x-small outlined color="#0085FF" class="mb-2">
              {{ item.access === 1 ? 'Admin' : 'Cashier' }}
            </v-chip>
          </template>

          <template #[`item.avatar`]="{ item }">
            <v-img
              contain
              max-width="80"
              :src="item.avatar ? `${ImgUser}/${item.avatar}` : null"
              class="blue-grey d-block mx-auto my-2"
            />
          </template>

          <template #[`item.status`]="{ item }">
            <v-chip
              label
              x-small
              outlined
              :color="item.status === 1 ? '#0085FF' : '#FF0000'"
            >
              {{ item.status === 1 ? 'Actived' : 'Not Actived' }}
            </v-chip>
          </template>

          <template #[`item.created`]="{ item }">
            <div class="text-truncate">
              {{ item.created | formatDateTime }}
            </div>
          </template>

          <template #[`item.updated`]="{ item }">
            <div class="text-truncate">
              {{ item.updated | formatDateTime }}
            </div>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-card-actions>
              <v-btn
                :disabled="getAccess == item.access"
                dense
                outlined
                elevation="0"
                :color="item.status !== 1 ? '#0085FF' : '#000'"
                class="text-capitalize rounded-lg"
                @click="handleUpdate(item.user_id, item.status !== 1 ? 1 : 0)"
              >
                {{ item.status !== 1 ? 'Actived' : 'Not Actived' }}
              </v-btn>

              <v-btn
                :disabled="getAccess == item.access"
                dense
                outlined
                elevation="0"
                color="#FF0000"
                class="text-capitalize rounded-lg"
                @click="handleDelete(item.user_id)"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </LayoutDefault>
</template>
<script>
import LayoutDefault from '@/layouts/default'
import globalMenu from '@/utils/globalMenu'
import Breadcrumbs from '@/components/Breadcrumbs'
import Loading from '@/components/Loading'
import moment from 'moment'
export default {
  name: 'employee',
  mixins: [globalMenu],
  components: { Breadcrumbs, LayoutDefault, Loading },
  filters: {
    formatDateTime(params) {
      return moment(params).format('lll')
    },
  },
  data() {
    return {
      menu: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          filterable: false,
          value: 'name',
          width: '20%',
        },
        {
          text: 'Email',
          align: 'start',
          value: 'email',
          width: '20%',
        },
        { text: 'Avatar', align: 'center', value: 'avatar', width: '20%' },
        { text: 'Status', align: 'center', value: 'status', width: '15%' },
        { text: 'Created', align: 'center', value: 'created', width: '15%' },
        { text: 'Updated', align: 'center', value: 'updated', width: '15%' },
        { text: '', align: 'center', value: 'actions', width: '30%' },
      ],
      params: {
        q: '',
        sort_by: 'desc',
        page: 1,
        limit: 25,
      },
    }
  },
  computed: {
    ImgUser() {
      return this.$store.state.ImgUser
    },
    getAccess() {
      return parseInt(this.$store.getters['users/getAccess'])
    },
    datas() {
      return this.$store.state['users'].datas
    },
    loading() {
      return this.$store.state['users'].loading
    },
    show_alert() {
      return this.$store.state['users'].show_alert
    },
    status() {
      return this.$store.state['users'].status
    },
    alert_title() {
      return this.$store.state['users'].alert_title
    },
    alert_message() {
      return this.$store.state['users'].alert_message
    },
  },
  watch: {
    show_alert(val) {
      if (val) {
        this.$notify({
          type: this.status,
          title: this.alert_title,
          text: this.alert_message,
        })
      }
      this.$store.commit('users/setShow', false)
    },
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

    // load data
    this.load()
  },
  methods: {
    async load() {
      this.$store.commit('users/setLoading', true)
      await this.$store.dispatch('users/getUsers', { ...this.params })
    },
    handleSearching() {
      this.params.page = 1
      this.load()
    },
    async handleUpdate(user_id, status) {
      await this.$store.dispatch('users/updatedUser', {
        user_id,
        data: {
          status,
        },
      })

      this.load()
    },
    async handleDelete(user_id) {
      await this.$store.dispatch('users/deleteUser', user_id)
    },
  },
}
</script>
