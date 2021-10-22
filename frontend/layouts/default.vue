<template lang="pug">
  #app
    BLoading(:active="$store.state.loading")
    NavbarMain
    main.section
      .container
        Nuxt
</template>

<script lang="ts">
import Vue from 'vue'
import NavbarMain from '~/components/NavbarMain.vue'

export default Vue.extend({
  components: {
    NavbarMain
  },
  mounted () {
    switch (this.$route.query.message) {
      case 'auth_ok':
        this.$snackbarSuccess(`ยินดีต้อนรับคุณ ${this.$store.state.auth?.displayName}`)
        break
      case 'need_auth':
        this.$snackbarError('กรุณาเข้าสู่ระบบก่อนดำเนินการต่อ')
        break
      case 'guest_only':
        this.$snackbarError('การดำเนินการนี้ทำได้เฉพาะบุคคลภายนอกเท่านั้น')
        break
      case 'unexpected_error':
        this.$snackbarError('พบปัญหาบางอย่างไม่คาดคิด กรุณาลองใหม่ภายหลัง')
        break
    }
    if (this.$route.query.message) {
      this.$router.replace({ query: {} })
    }
  }
})
</script>
