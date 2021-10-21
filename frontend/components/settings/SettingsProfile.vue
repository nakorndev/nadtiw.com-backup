<template lang="pug">
  form(@submit.prevent="onSubmit")
    .is-flex.is-align-items-center.mb-4
      .is-avatar.is-medium.mr-3(
        style="background-position: center; background-size: cover;"
        :style="{ backgroundImage: `url(${avatarPreview ? avatarPreview : auth.avatarUrl})` }")
      BField(label="เปลี่ยนรูปประจำตัว")
        BUpload.file-label(
          v-if="!input.avatarFile"
          v-model="input.avatarFile"
          @input="checkFileSize"
          accept="image/*")
          .file-cta
            BIcon.file-icon(icon="upload")
            span.file-label คลิกเพื่ออัปโหลด
        BButton(
          v-else
          type="is-danger"
          @click="input.avatarFile = undefined")
            BIcon(icon="times")
            span ยกเลิกการอัปโหลด
    BField#username(label="ชื่อผู้ใช้งาน (Username)")
      BInput(
        v-model="input.username"
        name="username"
        autocomplete="username"
        icon="at"
        placeholder="ระบุได้เฉพาะ A-Z, a-z, 0-9, _ เท่านั้น"
        :minlength="validations.username.minlength"
        :maxlength="validations.username.maxlength"
        :pattern="validations.username.regex")
    BField#displayName(label="ชื่อแสดงผล")
      BInput(
        v-model="input.displayName"
        name="display-name"
        autocomplete="name"
        icon="address-card"
        placeholder="แนะนำเป็นชื่อจริง-นามสกุล"
        required
        :maxlength="validations.displayName")
    BField#gender(label="เพศ")
      BRadioButton(
        v-model="input.gender"
        name="gender"
        type="is-link"
        native-value="male")
          BIcon(icon="mars")
          span ชาย
      BRadioButton(
        v-model="input.gender"
        name="gender"
        type="is-danger"
        native-value="female")
          BIcon(icon="venus")
          span หญิง
      BRadioButton(
        v-model="input.gender"
        name="gender"
        type="is-dark"
        native-value="none")
          BIcon(icon="genderless")
          span ไม่ระบุ
    BField#birthDate(label="วันเกิด (ปี ค.ศ.)")
      BDatepicker(
        v-model="input.birthDate"
        :date-formatter="dateFormatter"
        name="birth-date"
        placeholder="เลือกวันเกิดของคุณ"
        icon="calendar-day"
        :max-date="currentDate"
        open-on-focus
        nearby-month-days
        nearby-selectable-month-days)
    BField#location(label="ที่อยู่")
      BInput(
        v-model="input.location"
        name="location"
        autocomplete="address-level1"
        placeholder="ระบุเฉพาะจังหวัด หรือเขต/อำเภอ เป็นภาษาไทย"
        icon="map-marker-alt"
        :maxlength="validations.location")
    BField(label="ประวัติโดยย่อ")
      BInput(
        v-model="input.bio"
        name="bio"
        type="textarea"
        placeholder="ระบุประวัติส่วนตัวของคุณ"
        :maxlength="validations.bio")
    hr
    BButton(native-type="submit" type="is-primary" :loading="loading") บันทึกข้อมูล
</template>

<script lang="ts">
import Vue from 'vue'
import { DateTime } from 'luxon'
import { mapState } from 'vuex'
import bytes from 'bytes'

export default Vue.extend({
  props: {
    validations: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    input: {} as any,
    currentDate: null as Date | null,
    loading: false
  }),
  computed: {
    ...mapState({
      auth: (state: any) => state.auth.data
    }),
    avatarPreview () {
      if (this.input.avatarFile) {
        return URL.createObjectURL(this.input.avatarFile)
      }
      return ''
    }
  },
  mounted () {
    this.currentDate = new Date()
    this.input = {
      username: this.auth.username,
      displayName: this.auth.displayName,
      gender: this.auth.gender,
      birthDate: new Date(this.auth.birthDate),
      location: this.auth.location,
      bio: this.auth.bio
    }
  },
  methods: {
    dateFormatter (str?: Date) {
      if (str) {
        return DateTime.fromJSDate(str).toLocaleString(DateTime.DATE_FULL)
      }
    },
    checkFileSize (file) {
      if (file.size > this.validations.avatarFile) {
        this.$buefy.dialog.alert({
          message: `ไม่สามารถเลือกไฟล์ที่ใหญ่กว่า ${bytes(this.validations.avatarFile)} ได้`,
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            this.input.avatarFile = undefined
          }
        })
      }
    },
    async onSubmit () {
      this.loading = true
      try {
        const formData = new FormData()
        for (const [k, v] of Object.entries(this.input)) {
          if (v) {
            formData.append(k, v as any)
          }
        }
        const { data: user } = await this.$axios.post('/settings', formData)
        this.$store.commit('auth/setData', user)
        this.$snackbarSuccess('ข้อมูลได้รับการอัพเดตเสร็จสิ้น')
      } catch (error) {
        this.$snackbarError(error)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
