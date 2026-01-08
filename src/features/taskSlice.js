import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialStateTask = {
  task: "",
  totalTask: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialStateTask,
  reducers: {
    addTask: {
      prepare(taskText) {
        return {
          payload: {
            id: nanoid(),
            task: taskText,
            priority: "medium",
            completed: false,
          },
        };
      },
      reducer(state, action) {
        state.task = action.payload;
        state.totalTask.push(action.payload);
      },
    },

    remove(state, action) {
      state.totalTask = state.totalTask.filter((t) => {
        return t.id !== action.payload;
      });
    },

    updateTask: {
      prepare(id, updTask) {
        // console.log("prepare", updTask);
        return {
          payload: { id, updTask },
        };
      },

      reducer(state, action) {
        const task = state.totalTask.find((t) => t.id === action.payload.id);

        if (task) {
          task.task = action.payload.updTask.task;
          task.priority = action.payload.updTask.priority || "";
        }
        state.task = task;
      },
    },

    isChecked(state, action) {
      const task = state.totalTask.find((t) => t.id === action.payload);

      if (task) {
        // console.log("Before:", task.completed);
        task.completed = !task.completed;
        // console.log("After:", task.completed);
      }
      state.task = task;
    },

    updateOrder: (state, action) => {
      state.totalTask = action.payload;
    },

    setTasks(state, action) {
      state.totalTask = action.payload;
    },
  },
});

export const { addTask, updateTask, remove, isChecked, updateOrder, setTasks } =
  taskSlice.actions;

export default taskSlice;

console.log(taskSlice);
