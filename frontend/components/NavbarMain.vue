<template lang="pug">
  BNavbar(wrapper-class="container" type="is-light" spaced shadow)
    template(#brand)
      BNavbarItem(tag="NLink" to="/") นัดติว.com
    template(#end)
      BNavbarItem(v-if="loading" tag="div")
        BSkeleton(width="200px" height="30px" animated)
      BNavbarDropdown(v-else-if="auth")
        template(#label)
          img.is-avatar.mr-2(:src="auth.avatarUrl")
          b {{ auth.displayName }}
        template(#default)
          BNavbarItem(@click="onLogout")
            BIcon(icon="sign-out-alt")
            span ออกจากระบบ
      BNavbarItem(v-else tag="div")
        .buttons
          a.button.is-primary.has-background-discord(href="/api/oauth/discord")
            BIcon(icon="discord" pack="fab")
            span เข้าสู่ระบบผ่าน Discord
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data: () => ({
    loading: false
  }),
  computed: mapState(['auth']),
  methods: {
    async onLogout () {
      this.loading = true
      try {
        await this.$axios.delete('/auth')
        this.$store.commit('deleteAuth')
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
