<template lang="pug">
  BModal(
    :active="$store.state.auth.modal"
    @close="$store.commit('auth/closeModal')"
    has-modal-card
    trap-focus)
    template(#default="props")
      .modal-card
        header.modal-card-head
          h2.modal-card-title เข้าสู่ระบบ หรือ สมัครสมาชิก
        section.modal-card-body
          .has-text-centered
            a.is-flex.mb-2.button.is-primary(
              v-for="social of socials"
              :href="social.href"
              :class="social.class")
              BIcon(pack="fab" :icon="social.icon")
              span เข้าสู่ระบบผ่าน {{ social.label }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
    socials: [
      { label: 'Facebook', icon: 'facebook', class: 'has-background-facebook', href: '/api/oauth/facebook' },
      { label: 'Line', icon: 'line', class: 'has-background-line', href: '/api/oauth/line' },
      { label: 'Discord', icon: 'discord', class: 'has-background-discord', href: '/api/oauth/discord' }
    ]
  })
})
</script>
