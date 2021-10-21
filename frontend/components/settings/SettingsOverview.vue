<template lang="pug">
  div
    a.button.is-danger(@click="deleteUser")
      BIcon(icon="trash-alt")
      span ลบบัญชีออก
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    deleteUser () {
      this.$buefy.dialog.confirm({
        title: 'การลบบัญชี',
        message: 'เมื่อคุณลบบัญชีแล้วจะทำให้ข้อมูลสูญหายทั้งหมด และไม่สามารถเรียกข้อมูลคืนได้ คุณแน่ใจหรือว่าต้องการลบบัญชีนี้?',
        cancelText: 'ยกเลิก',
        confirmText: 'ดำเนินการลบบัญชี!',
        type: 'is-danger',
        onConfirm: async () => {
          this.$store.commit('showLoading')
          try {
            await this.$axios.delete('/auth/user')
            this.$store.commit('auth/deleteData')
            this.$router.push('/')
            this.$snackbarSuccess('คุณได้ลบบัญชีเสร็จสิ้น')
          } catch (error) {
            this.$snackbarError(error)
          } finally {
            this.$store.commit('hideLoading')
          }
        }
      })
    }
  }
})
</script>
