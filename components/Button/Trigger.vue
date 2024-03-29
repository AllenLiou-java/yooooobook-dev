<template>
  <div>
    <label>
      <span class="text">{{ offLabel }}</span>
      <input
        id=""
        v-model="value"
        type="checkbox"
        name=""
        class="checkbox"
        @click="updateValue"
      />
      <span class="btn-box">
        <span class="btn-ball"></span>
      </span>
      <span class="text">{{ onLabel }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    offLabel: {
      type: String,
      default: '',
    },
    onLabel: {
      type: String,
      default: '',
    },
    propValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: false,
    }
  },
  watch: {
    propValue(val) {
      this.value = val
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('update', event.target.checked)
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-box {
  display: inline-block;
  vertical-align: middle;
  width: 40px;
  height: 20px;
  border-radius: 100px;
  background-color: #ccc;
  box-shadow: 0px 3px 0px rgba(0, 0, 0, 0.13) inset;
  cursor: pointer;

  .btn-ball {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    margin-left: 0; /*動畫從ml為0開始*/
    transition: 0.5s;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  }
}

.checkbox {
  position: absolute;
  opacity: 0;
}
.checkbox:checked + .btn-box {
  background-color: #00b900;
}
.checkbox:checked + .btn-box .btn-ball {
  margin-left: 20px;
}
</style>
