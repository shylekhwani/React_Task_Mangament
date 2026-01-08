# 📝 Task Manager Application

A modern **Task Manager (Todo App)** built with **React, Redux Toolkit, Framer Motion, and IndexedDB**.
This project demonstrates real-world frontend architecture including **state management, persistence, animations, filtering, searching, drag-and-drop, and offline storage**.

---

## 🚀 Features

- ➕ Add new tasks
- ✏️ Edit existing tasks (title + priority)
- ❌ Delete tasks
- ✅ Mark tasks as completed
- 🔍 Search tasks by name
- 🎯 Filter tasks (All / Active / Completed)
- 🔄 Drag & Drop tasks from **any direction**
- 💾 Persistent storage using **IndexedDB** (tasks survive page reloads)
- 🎬 Smooth animations using **Framer Motion**
- 🧠 Optimized rendering with `useMemo`

---

## 🛠 Tech Stack

- **React** – UI library
- **Redux Toolkit** – Global state management
- **IndexedDB** – Client-side persistent storage
- **Framer Motion** – Animations & drag-and-drop
- **Tailwind CSS** – Styling

---

## 🧠 Architecture Overview

### State Flow

```
UI → Redux Actions → Redux Store
                ↓
           IndexedDB Sync
```

- **Redux** manages the in-memory state
- **IndexedDB** persists tasks locally
- On app load, tasks are **rehydrated from IndexedDB** into Redux

---

## 💾 IndexedDB Persistence

### Why IndexedDB?

- `localStorage` is synchronous & blocking
- IndexedDB is:

  - Asynchronous
  - Non-blocking
  - Ideal for structured data (arrays of objects)

### How Persistence Works

- On app load → read tasks from IndexedDB → dispatch to Redux
- On add/update/delete → update Redux → sync to IndexedDB
- Empty task arrays are **explicitly saved** to avoid ghost tasks

> ⚠️ Important Bug Fixed:
> Tasks were reappearing after reload because an empty array was **not written back** to IndexedDB.

---

## 🎬 Animations & Drag and Drop

- Powered by **Framer Motion**
- Smooth:

  - Enter / Exit animations
  - Hover scaling
  - Layout transitions

- Drag tasks:

  - Up / Down
  - Left / Right
  - Any direction

---

## 🧪 Performance Optimizations

- `useMemo` used to compute `visibleTasks`
- Prevents unnecessary re-renders when filtering or searching

---

## 📸 Screenshots

> Add screenshots or GIFs of your app here

```
/screenshots
  ├── home.png
```

Example:

```md
![Task Manager Home](./public/Screenshot (32).png)
```

---

## 🧑‍💻 How to Run Locally

```bash
# install dependencies
npm install

# start dev server
npm run dev
```

---

## 🧠 Interview-Ready Explanation

> “This project uses Redux Toolkit for predictable state management and IndexedDB for persistent offline storage. Tasks are synchronized between Redux and IndexedDB to ensure data consistency even after page reloads. Framer Motion is used for animations and drag-and-drop interactions, providing a smooth user experience.”

---

## 🔮 Future Improvements

- 📅 Due dates
- 🗂 Task categories
- ☁️ Backend sync (Firebase / Node.js)
- 👤 User authentication

---

## 📄 License

This project is for learning and demonstration purposes.

---

### ⭐ If you like this project, give it a star on GitHub!
