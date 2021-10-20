<template lang="pug">
  .columns.is-centered
    .column(:class="$global.columns.half")
      .box
        BTabs(type="is-toggle" vertical v-model="currentTab" @input="onTabChange")
          BTabItem(label="ภาพรวมบัญชี" value="overview" icon="user")
          BTabItem(label="แก้ไขโปรไฟล์" value="profile" icon="user-edit")
          BTabItem(label="เชื่อมต่อแอป" value="connect" icon="share-alt")
            SettingsConnect
</template>

<script lang="ts">
import Vue from 'vue'
import auth from '~/middleware/auth'
import SettingsConnect from '~/components/SettingsConnect.vue'

export default Vue.extend({
  components: {
    SettingsConnect
  },
  middleware: auth,
  data: () => ({
    currentTab: 'overview',
    presets: [
      'profile',
      'connect'
    ]
  }),
  mounted () {
    this.currentTab = this.presets.includes(this.$route.query.tab as string)
      ? this.$route.query.tab as string
      : 'overview'
  },
  methods: {
    onTabChange (name: string) {
      if (this.presets.includes(name)) {
        this.$router.push({ query: { tab: name } })
      } else {
        this.$router.push({ query: {} })
      }
    }
  }
})
</script>
