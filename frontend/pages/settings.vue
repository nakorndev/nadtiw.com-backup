<template lang="pug">
  .columns.is-centered
    .column(:class="$global.columns.half")
      BTabs
        BTabItem(label="ภาพรวมบัญชี")
        BTabItem(label="แก้ไขโปรไฟล์")
        BTabItem(label="เชื่อมต่อแอป")
</template>

<script lang="ts">
import Vue from 'vue'
import auth from '~/middleware/auth'

export default Vue.extend({
  middleware: auth
})
</script>
