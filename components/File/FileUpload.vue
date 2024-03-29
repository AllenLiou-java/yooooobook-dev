<template>
  <div>
    <b-form-file
      ref="file-input"
      v-model="file"
      placeholder="請選取上傳檔案"
      class="mb-2"
    >
      <template slot="file-name" slot-scope="{ names }">
        <b-badge variant="dark">{{ names[0] }}</b-badge>
      </template>
    </b-form-file>
    <div class="mb-4">
      <b-progress>
        <b-progress-bar
          :value="uploadProgress"
          variant="success"
          :label="`${Math.round(uploadProgress)}%`"
          striped
        ></b-progress-bar>
      </b-progress>
    </div>

    <b-button variant="outline-primary" class="mr-2 mb-2" @click="clearFiles"
      >取消上傳</b-button
    >
    <b-button variant="danger mr-2  mb-2" @click="pause">{{
      isPaused ? '繼續上傳' : '暫停上傳'
    }}</b-button>
    <b-button variant="success  mr-2  mb-2" @click="uploadFiles"
      >開始上傳</b-button
    >
  </div>
</template>

<script>
export default {
  props: {
    uploadProgress: {
      type: Number,
      required: true,
    },
    isPaused: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      file: null,
    }
  },
  methods: {
    clearFiles() {
      this.$refs['file-input'].reset()
    },
    uploadFiles() {
      if (this.file === null) return
      this.$emit('upload', this.file)
    },
    pause() {
      this.$emit('pause', this.file)
    },
  },
}
</script>
