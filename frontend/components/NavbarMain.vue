<template lang="pug">
  BNavbar(wrapper-class="container" spaced)
    template(#brand)
      BNavbarItem(tag="NLink" to="/") นัดติว.com
    template(#end)
      BNavbarItem(v-if="loading" tag="div")
        BSkeleton(width="200px" height="30px" animated)
      BNavbarDropdown(v-if="auth" :label="auth.displayName")
        BNavbarItem(tag="NLink" to="/settings")
          BIcon(icon="cog")
          span การตั้งค่าบัญชี
        .dropdown-divider
        BNavbarItem(@click="onLogout")
          BIcon(icon="sign-out-alt")
          span ออกจากระบบ
      BNavbarItem(v-else tag="div")
        .buttons
          a.button.is-primary(@click="$store.commit('auth/openModal')")
            BIcon(icon="sign-in-alt")
            span เข้าสู่ระบบ หรือ สมัครสมาชิก
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { AuthData } from '~/store/auth'

export default Vue.extend({
  data: () => ({
    loading: false
  }),
  computed: mapState({
    auth: (state: any): AuthData => state.auth.data
  }),
  methods: {
    async onLogout () {
      this.loading = true
      try {
        await this.$axios.delete('/auth')
        this.$store.commit('auth/deleteData')
        this.$router.push('/')
        this.$snackbarSuccess('คุณได้ออกจากระบบเสร็จสิ้น')
      } catch (error) {
        this.$snackbarError(error)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
