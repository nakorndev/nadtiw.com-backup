<template lang="pug">
  BNavbar(wrapper-class="container" spaced)
    template(#brand)
      BNavbarItem(tag="NLink" to="/") นัดติว.com
    template(#end)
      BNavbarItem(v-if="loading" tag="div")
        BSkeleton(width="200px" height="30px" animated)
      BNavbarDropdown(v-else-if="auth" :label="auth.displayName")
        BNavbarItem(@click="onLogout") ออกจากระบบ
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
    loading: true
  }),
  computed: mapState({
    auth: (state: any): AuthData => state.auth.data
  }),
  async mounted () {
    try {
      const { data } = await this.$axios.get('/auth', {
        progress: false
      })
      this.$store.commit('auth/setData', data)
    } catch (error: any) {
      if (error?.response?.status !== 401) {
        this.$snackbarError(error)
      }
    } finally {
      this.loading = false
    }
    if (this.$route.query.message === 'auth_ok') {
      this.$snackbarSuccess(`ยินดีต้อนรับคุณ ${this.auth.displayName}`)
      this.$router.replace({ query: {} })
    }
    if (this.$route.query.message === 'auth_fail') {
      this.$snackbarError('พบปัญหาบางอย่างไม่คาดคิดระหว่างการเข้าสู่ระบบ กรุณาลองใหม่ภายหลัง')
    }
  },
  methods: {
    async onLogout () {
      this.loading = true
      try {
        await this.$axios.delete('/auth')
        this.$store.commit('auth/deleteData')
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
