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
              :href="`/api/oauth/${social.href}`"
              :class="`has-background-${social.class}`")
              BIcon(pack="fab" :icon="social.icon")
              span เข้าสู่ระบบผ่าน {{ social.label }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
    socials: [
      { label: 'Facebook', icon: 'facebook', class: 'facebook', href: 'facebook' },
      { label: 'Line', icon: 'line', class: 'line', href: 'line' }
    ]
  })
})
</script>
