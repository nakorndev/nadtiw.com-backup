<template lang="pug">
  BModal(
    :active="$store.state.auth.modal"
    @close="$store.commit('auth/closeModal')"
    has-modal-card
    can-cancel)
    template(#default="props")
      .modal-card(style="width: 400px;")
        header.modal-card-head
          h2.modal-card-title เข้าสู่ระบบ หรือ สมัครสมาชิก
          button.delete.mt-1.ml-4(type="button" @click="props.close")
        section.modal-card-body
          .has-text-centered
            a.is-flex.mb-2.button.is-primary(
              v-for="social of socials"
              :href="social.href"
              :class="social.class")
              BIcon(pack="fab" :icon="social.icon")
              span เข้าสู่ระบบผ่าน {{ social.label }}
          BMessage(type="is-info")
            .content
              p ในการเข้าสู่ระบบผ่านแอปอื่นๆ หากเลือกคนล่ะตัวจะทำให้ได้บัญชีที่แตกต่างกันออกไป
              p
                | หากต้องการรวมให้ทั้ง 3 แอปใช้ในบัญชีเดียวเพื่อป้องกันการสร้างบัญชีที่ผิดพลาด
                | สามารถเริ่มเข้าสู่ระบบตัวใดตัวหนึ่ง จากนั้นไปที่ส่วนบนขวา เลือก "การตั้งค่าบัญชี > เชื่อมต่อแอป"
                | เพื่อดำเนินการต่อ
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
    socials: [
      {
        label: 'Facebook',
        icon: 'facebook',
        class: 'has-background-facebook',
        href: '/api/oauth/auth/facebook'
      }, {
        label: 'Line',
        icon: 'line',
        class: 'has-background-line',
        href: '/api/oauth/auth/line'
      }, {
        label: 'Discord',
        icon: 'discord',
        class: 'has-background-discord',
        href: '/api/oauth/auth/discord'
      }
    ]
  })
})
</script>
