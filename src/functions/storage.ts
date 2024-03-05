export const storage = {
  set(key: string, value: unknown) {
    if (!key || !value) return;
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string) {
    const item = localStorage.getItem(key);
    if (item) return item;
  },
};
