<template lang="pug">
  #app
    NavbarMain
    ModalAuth
    main.section
      .container
        Nuxt
</template>

<script lang="ts">
import Vue from 'vue'
import NavbarMain from '~/components/NavbarMain.vue'
import ModalAuth from '~/components/ModalAuth.vue'

export default Vue.extend({
  components: {
    NavbarMain,
    ModalAuth
  }
})
</script>
