import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { ITask } from "@/types.ts";
import { storage } from "@/functions/storage.ts";

const storageName = "todos";
const startValue: ITask[] = JSON.parse(
  storage.get(storageName) || "[]",
) as ITask[];
export const useTodosStore = defineStore(storageName, () => {
  const todos: Ref<ITask[]> = ref(startValue);
  const createTask = (title: string) => {
    const newTask: ITask = {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
    };
    todos.value.push(newTask);
    updateStorage();
  };
  const deleteTask = (id: string) => {
    todos.value = todos.value.filter((task) => task.id !== id);
    updateStorage();
  };
  const editTask = (newTask: ITask) => {
    const oldTask = todos.value.find((task) => task.id === newTask.id);
    if (!oldTask) return;
    oldTask.isCompleted = newTask.isCompleted;
    oldTask.title = newTask.title;
    updateStorage();
  };
  const updateStorage = () => {
    storage.set(storageName, todos.value);
  };
  return {
    todos,
    createTask,
    deleteTask,
    editTask,
  };
});
