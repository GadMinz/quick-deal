<script setup lang="ts">
import Input from "@/components/ui/Input.vue";
import TodosItem from "@/components/TodosItem.vue";
import { storeToRefs } from "pinia";
import { useTodosStore } from "@/store/todos.ts";
import { ref } from "vue";

const store = useTodosStore();
const { todos } = storeToRefs(store);
const { createTask } = store;
const newTaskModelValue = ref("");
const newTaskModelError = ref(false);
const onCreateTask = () => {
  newTaskModelError.value = false;
  if (newTaskModelValue.value.trim().length === 0) {
    newTaskModelError.value = true;
    return;
  }
  createTask(newTaskModelValue.value);
  newTaskModelValue.value = "";
};
</script>

<template>
  <div class="block">
    <div class="block-head">
      <h1 class="block-title">Todos</h1>
      <div class="input-wrapper">
        <Input
          placeholder="Enter a task"
          :error="newTaskModelError"
          v-model="newTaskModelValue"
          :on-press-enter="onCreateTask"
        />
        <button class="create-btn" @click="onCreateTask">+</button>
      </div>
    </div>
    <TodosItem v-for="task in todos" :task="task" />
  </div>
</template>

<style scoped lang="scss">
.block {
  box-shadow: 0 11px 34px 0 rgba(0, 0, 0, 0.2);
  border-radius: 34px;
  padding: 20px;
  max-width: 800px;
  margin: 40px auto;
  &-title {
    font-size: 48px;
    text-align: center;
    margin-bottom: 20px;
  }
  &-head {
    margin-bottom: 30px;
  }
}
h1 {
  font-size: 48px;
  text-align: center;
}
.input-wrapper {
  display: flex;
  gap: 10px;
  align-items: center;
}
.create-btn {
  width: 30px;
  height: 30px;
  background-color: #9dfd31;
  border-radius: 5px;
  &:hover {
    background-color: #baff6c;
  }
}
</style>
