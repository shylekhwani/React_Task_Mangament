import { openDB } from "./createDB";

export async function saveTasks(tasks) {
  const db = await openDB();
  const tx = db.transaction("tasks", "readwrite");
  const store = tx.objectStore("tasks");

  // 🔥 IMPORTANT
  store.clear();

  tasks.forEach((task) => {
    store.put(task);
  });

  return new Promise((resolve) => {
    tx.oncomplete = () => resolve();
  });
}
