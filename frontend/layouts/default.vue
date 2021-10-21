<template lang="pug">
  #app
    BLoading(:active="$store.state.loading")
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
        case 'connect_ok':
          this.$snackbarSuccess(`คุณได้เชื่อมต่อบัญชีกับ ${this.$route.query.provider} เสร็จสิ้น`)
          break
        case 'user_exists':
          this.$snackbarError('พบการเชื่อมต่อร่วมกับบัญชีอื่นอยู่แล้ว')
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
