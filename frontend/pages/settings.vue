<template lang="pug">
  .columns.is-centered
    .column(:class="$global.columns.half")
      h2.title
        BIcon.mr-2(icon="cog")
        span การตั้งค่าบัญชี
      .box
        BTabs(type="is-toggle" vertical v-model="currentTab" @input="onTabChange" :animated="false")
          BTabItem(label="ภาพรวมบัญชี" value="overview" icon="user" visible)
            SettingsOverview
          BTabItem(label="แก้ไขโปรไฟล์" value="profile" icon="user-edit" visible)
            SettingsProfile(:validations="validations")
          BTabItem(label="เชื่อมต่อแอป" value="connect" icon="share-alt" visible)
            SettingsConnect
</template>

<script lang="ts">
import Vue from 'vue'
import auth from '~/middleware/auth'
import SettingsConnect from '~/components/settings/SettingsConnect.vue'
import SettingsOverview from '~/components/settings/SettingsOverview.vue'
import SettingsProfile from '~/components/settings/SettingsProfile.vue'

export default Vue.extend({
  components: {
    SettingsConnect,
    SettingsOverview,
    SettingsProfile
  },
  middleware: auth,
  async asyncData ({ $axios, error }) {
    try {
      const { data: validations } = await $axios.get('/settings/validations')
      return { validations }
    } catch (e: any) {
      error(e)
    }
  },
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
