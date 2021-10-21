<template lang="pug">
  div
    .field(v-for="connect of connects" :key="connect.key")
      a.button.is-primary(
        :class="connect.class"
        :href="checkConnected(connect.key) ? null : connect.href"
        :disabled="checkConnected(connect.key)"
        )
          BIcon(:icon="connect.icon" pack="fab")
          span(v-if="checkConnected(connect.key)") คุณได้เชื่อมต่อกับ {{ connect.label }} แล้ว
          span(v-else) เชื่อมต่อกับ {{ connect.label }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    connects: [
      {
        label: 'Facebook',
        key: 'facebook',
        icon: 'facebook',
        class: 'has-background-facebook',
        href: '/api/oauth/connect/facebook'
      }, {
        label: 'Line',
        key: 'line',
        icon: 'line',
        class: 'has-background-line',
        href: '/api/oauth/connect/line'
      }, {
        label: 'Discord',
        key: 'discord',
        icon: 'discord',
        class: 'has-background-discord',
        href: '/api/oauth/connect/discord'
      }
    ]
  }),
  methods: {
    checkConnected (social): boolean {
      return Boolean(this.$store.state.auth.data?.oauth[social])
    }
  }
})
</script>
