<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
  placeholder: { type: String, default: "" },
  error: { type: Boolean, default: false },
  isAutoFocus: { type: Boolean, default: false },
  onPressEnter: { type: Function || null, default: null },
});
const modelValue = defineModel<string>();
const input = ref<HTMLInputElement | undefined>();
onMounted(() => {
  if (!props.isAutoFocus) return;
  input.value?.focus();
});
const handlePressEnter = () => {
  if (!props.onPressEnter) return;
  props.onPressEnter();
};
</script>

<template>
  <input
    class="input"
    :class="{ error: error }"
    type="text"
    v-model="modelValue"
    :placeholder="placeholder"
    ref="input"
    @keyup.enter="handlePressEnter"
  />
</template>

<style scoped lang="scss">
.input {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #d4d4d4;
  width: 100%;
  &.error {
    border: 1px solid #ff6060;
  }
}
</style>
