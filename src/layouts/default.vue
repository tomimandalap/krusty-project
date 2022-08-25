<template>
  <div class="LayoutDefault">
    <!-- sideleft -->
    <v-navigation-drawer :value="show" color="#fff" class="ps-4 pe-4 py-10" app>
      <div class="ps-4 mb-6 d-flex align-center justify-start">
        <v-avatar color="#F0F0F0" dark size="32" class="me-2">
          <v-icon color="#ff0000" dark>mdi-store</v-icon>
        </v-avatar>
        <strong style="font-size: 20px">
          Krusty
          <span style="color: #ff0000">POS</span>
        </strong>
      </div>

      <!-- menu -->
      <v-list dense nav>
        <v-list-item
          v-for="item in list_menu"
          :key="item.name"
          :to="item.link"
          :disabled="item.access && !item.access.some((el) => el == access)"
          color="#FF0000"
        >
          <v-list-item-icon>
            <v-icon
              :color="
                item.access && item.access.some((el) => el == access)
                  ? '#000'
                  : '#ccc'
              "
              dark
            >
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              :class="
                item.access && item.access.some((el) => el == access)
                  ? 'black--text'
                  : null
              "
            >
              {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-spacer></v-spacer>

      <template v-slot:append>
        <div class="text-center">
          <!-- avatar -->
          <v-avatar
            size="60"
            class="mb-3 cursor"
            @click="handleProfile(detail_user)"
          >
            <v-img
              :src="
                detail_user.avatar ? `${ImgUser}/${detail_user.avatar}` : null
              "
              alt="profile.jpg"
            />
          </v-avatar>
          <br />
          <strong>{{ detail_user.name }}</strong>
          <br />
          <small style="color: #8e8e8e">
            {{ detail_user.access == 1 ? 'Admin' : 'Cashier' }}
          </small>
          <v-btn
            :loading="loading"
            block
            dark
            elevation="0"
            color="#FF0000"
            class="rounded-lg text-capitalize mb-8 mt-5"
            @click="handleLogout"
          >
            <v-icon dark small>mdi-arrow-left</v-icon>
            Logout
          </v-btn>

          <small style="color: #8e8e8e">© 2021 - krusty pos</small>
        </div>
      </template>
    </v-navigation-drawer>

    <main class="LayoutDefault__main">
      <slot />
    </main>

    <!-- modal prorifle -->
    <v-dialog v-model="state_profile" max-width="300" height="1000" persistent>
      <v-card elevation="0" class="pb-4">
        <v-app-bar flat color="blue-grey lighten-5">
          <v-toolbar-title class="text-h6 black--text pl-0">
            Profile
          </v-toolbar-title>
        </v-app-bar>
        <v-card-text class="text-center">
          <v-avatar size="80" class="my-3">
            <v-img
              :src="
                imageURL != form.image && imageURL == null
                  ? imageURL
                  : `${ImgUser}/${detail_user.avatar}`
              "
              alt="profile.jpg"
            />
          </v-avatar>
          <v-file-input
            id="formimage"
            ref="formimage"
            show-size
            color="#000"
            outlined
            prepend-icon=""
            truncate-length="12"
            placeholder="Input file"
            prepend-inner-icon="mdi-image"
            accept="image/png, image/jpeg, image/jpg"
            :error-messages="
              $v.form.image.$dirty && !$v.form.image.required
                ? 'Image is required'
                : []
            "
            class="ma-0"
            @blur="$v.form.image.$touch()"
            @change="inputImage($event)"
          >
            <template v-slot:selection="{ text }">
              <v-chip small label color="#ffe600">
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
          <v-text-field
            id="formname"
            ref="formname"
            v-model="form.name"
            color="#000"
            outlined
            placeholder="Name"
            :error-messages="
              $v.form.name.$dirty && !$v.form.name.required
                ? 'Name is required'
                : $v.form.name.$dirty && !$v.form.name.onlyText
                ? 'Just only alphabet'
                : []
            "
            class="ma-0"
            @blur="$v.form.name.$touch()"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="0"
            outlined
            color="#FF0000"
            class="text-capitalize rounded-lg"
            @click="handleCancel"
          >
            Cancel
          </v-btn>

          <v-btn
            :loading="loading"
            elevation="0"
            outlined
            color="#00BF71"
            class="text-capitalize rounded-lg"
            @click="handleUpdate"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end modal prorifle -->
  </div>
</template>
<script>
import globalMenu from '@/utils/globalMenu'
import { validationMixin } from 'vuelidate'
import { required, helpers } from 'vuelidate/lib/validators'
const onlyText = helpers.regex('onlyText', /^[a-zA-Z ]*$/)
export default {
  name: 'default',
  mixins: [globalMenu, validationMixin],
  data() {
    return {
      state_profile: false,
      imageURL: null,
      imageRAW: null,
      form: {
        image: null,
        name: '',
      },
    }
  },
  validations() {
    let isRequireImg = ['avatar.png', null].includes(this.imageURL)
    return {
      form: {
        image: {
          required: () => {
            return !isRequireImg
          },
        },
        name: { required, onlyText },
      },
    }
  },
  computed: {
    ImgUser() {
      return this.$store.state.ImgUser
    },
    getUserID() {
      return parseInt(this.$store.getters['users/getUserID'])
    },
    show() {
      return this.$store.state.show
    },
    access() {
      const access = parseInt(this.$store.state['users'].access)
      return access
    },
    detail_user() {
      return this.$store.state['users'].detail_user
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
    this.load()
  },
  methods: {
    async load() {
      const user_id = this.getUserID
      const res = await this.$store.dispatch('users/detailUser', user_id)

      if (res) {
        const { avatar, name } = this.detail_user
        this.imageURL = this.imageRAW = avatar
        this.form = { ...this.form, image: avatar, name }
      }
    },
    async handleLogout() {
      this.$store.commit('users/setLoading', true)
      const res = await this.$store.dispatch('users/logout')
      if (res) this.$router.push('/login')
    },
    handleProfile(params) {
      const { avatar, name } = params
      this.imageURL = avatar
      this.form = { ...this.form, image: null, name }
      this.state_profile = true
    },
    inputImage(files) {
      const image = files
      const { type } = image || { type: null }

      if (image) {
        if (
          !type.includes('image/jpeg') &&
          !type.includes('image/jpg') &&
          !type.includes('image/png')
        ) {
          //set muttation notification
          this.$store.commit('users/setShow', true)
          this.$store.commit('users/setStatus', 'error')
          this.$store.commit('users/setTitle', 'File Image')
          this.$store.commit('users/setMessage', 'Wrong file extention!')
        } else {
          // insert file image
          this.imageURL = URL.createObjectURL(image)
          this.form.image = this.imageRAW = image
        }
      }
    },
    async handleUpdate() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return false
      }
      // check image file
      const { image } = this.form
      if (typeof image === 'object') {
        const formdata = new FormData()
        for (const [key, value] of Object.entries(this.form)) {
          formdata.append(key, value)
        }

        this.$store.commit('users/setLoading', true)
        const user_id = this.getUserID

        await this.$store.dispatch('users/updatedUser', {
          user_id,
          data: formdata,
        })

        this.state_profile = false
        this.$router.go()
      } else {
        this.$store.commit('users/setLoading', false)
        this.form.image = null
      }
    },
    handleCancel() {
      this.$v.form.$reset()
      this.state_profile = false
    },
  },
}
</script>
