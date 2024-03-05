<script setup lang="ts">
import { ITask } from "@/types.ts";
import { useTodosStore } from "@/store/todos.ts";
import Input from "@/components/ui/Input.vue";
import { ref } from "vue";

const props = defineProps<{ task: ITask }>();
let { id, title, isCompleted } = props.task;
const store = useTodosStore();
const { deleteTask, editTask } = store;
const isEdit = ref(false);
const taskModelValue = ref(title);
const taskModelError = ref(false);

const handleEdit = () => {
  taskModelError.value = false;
  if (!isEdit.value) {
    isEdit.value = true;
    return;
  }
  if (taskModelValue.value.trim().length === 0) {
    taskModelError.value = true;
    return;
  }
  editTask({ id, title: taskModelValue.value, isCompleted });
  isEdit.value = false;
  title = taskModelValue.value;
};
const handleCheck = () => {
  isCompleted = !isCompleted;
  editTask({ id, title, isCompleted });
};
</script>

<template>
  <div class="task">
    <input
      class="task-check"
      type="checkbox"
      :checked="isCompleted"
      :disabled="isEdit"
      @change="handleCheck"
    />
    <Input
      v-if="isEdit"
      v-model="taskModelValue"
      :error="taskModelError"
      isAutoFocus
      :on-press-enter="handleEdit"
    />
    <div v-else class="task-title">{{ title }}</div>
    <button
      class="task-btn"
      :class="isEdit ? 'isedit' : 'edit'"
      @click="handleEdit"
    />
    <button class="task-btn delete" @click="deleteTask(id)" />
  </div>
</template>

<style scoped lang="scss">
.task {
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid #d4d4d4;
  border-radius: 10px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  &-title {
    min-width: 150px;
    flex: 1;
  }
  &-check {
    min-width: 1rem;
    min-height: 1rem;
    cursor: pointer;
  }
  &-btn {
    min-height: 30px;
    min-width: 30px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &:hover {
      opacity: 0.7;
    }
    &.delete {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16m-4 0-.27-.812c-.263-.787-.394-1.18-.637-1.471a2 2 0 0 0-.803-.578C13.938 3 13.524 3 12.694 3h-1.388c-.829 0-1.244 0-1.596.139a2 2 0 0 0-.803.578c-.243.29-.374.684-.636 1.471L8 6m10 0v10.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C15.72 21 14.88 21 13.2 21h-2.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C6 18.72 6 17.88 6 16.2V6m8 4v7m-4-7v7'/%3E%3C/svg%3E");
    }
    &.edit {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z' clip-rule='evenodd'/%3E%3C/svg%3E");
    }
    &.isedit {
      background-color: #9dfd31;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 12.611 8.923 17.5 20 6.5'/%3E%3C/svg%3E");
      background-size: 70% 70%;
      border-radius: 5px;
    }
  }
  @media screen and (max-width: 768px) {
    gap: 5px;
    &-btn {
      min-width: 20px;
      min-height: 20px;
    }
  }
}
</style>
