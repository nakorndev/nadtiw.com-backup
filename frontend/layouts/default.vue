<template lang="pug">
  #app
    NavbarMain(@login-checked="showMessage")
    ModalAuth
    main.section
      .container
        Nuxt
</template>

<script lang="ts">
import Vue from 'vue'
import NavbarMain from '~/components/NavbarMain.vue'
import ModalAuth from '~/components/ModalAuth.vue'

export default Vue.extend({
  components: {
    NavbarMain,
    ModalAuth
  },
  methods: {
    showMessage () {
      switch (this.$route.query.message) {
        case 'auth_ok':
          this.$snackbarSuccess(`ยินดีต้อนรับคุณ ${this.$store.state.auth.data?.displayName}`)
          break
        case 'auth_fail':
          this.$snackbarError('พบปัญหาบางอย่างไม่คาดคิดระหว่างการเข้าสู่ระบบ กรุณาลองใหม่ภายหลัง')
          break
        case 'need_auth':
          this.$snackbarError('กรุณาเข้าสู่ระบบก่อนดำเนินการต่อ')
          break
        case 'unexpected_error':
          this.$snackbarError('พบปัญหาบางอย่างไม่คาดคิด กรุณาลองใหม่ภายหลัง')
          break
      }
      if (this.$route.query.message) {
        this.$router.replace({ query: {} })
      }
    }
  }
})
</script>
