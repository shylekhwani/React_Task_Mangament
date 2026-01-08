/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  isChecked,
  remove,
  updateTask,
  updateOrder,
  setTasks,
} from "../features/taskSlice";
import { Task } from "./Task";
import { getTasks } from "../config/dbConfig/getTask";
import { saveTasks } from "../config/dbConfig/saveTask";

const TaskLogic = () => {
  const [taskVal, setTaskVal] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editTask, setEditTask] = useState({
    task: "",
    priority: "",
  });
  const [filterMode, setFilterMode] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchedVal, setSearchedval] = useState("");

  const dispatch = useDispatch();
  const { task, totalTask } = useSelector((store) => store.task);

  useEffect(() => {
    (async () => {
      const tasksFromDB = await getTasks();
      if (tasksFromDB.length) {
        dispatch(setTasks(tasksFromDB));
      }
    })();
  }, []);

  useEffect(() => {
    saveTasks(totalTask); // ← NO CONDITION
  }, [totalTask]);

  const handleAddTask = function () {
    if (!taskVal) return;
    dispatch(addTask(taskVal));
    setTaskVal("");
  };

  const handleDelete = function (id) {
    dispatch(remove(id));
  };

  const handleUpdate = function () {
    if (!editMode && !editTask) return;
    // console.log(editTask);
    dispatch(updateTask(editMode, editTask));
    setEditMode(null);
    setEditTask({
      task: "",
      priority: "",
    });
  };

  const handleChecked = function (id) {
    dispatch(isChecked(id));
  };

  const handleSelectedFilter = function (e) {
    setSelectedFilter(e.target.value);
    setFilterMode(false);
  };

  const handleReorder = (newOrder) => {
    dispatch(updateOrder(newOrder));
  };

  const visibleTasks = useMemo(() => {
    let tasks = totalTask;

    // 1️⃣ Filter
    if (selectedFilter === "completed") {
      tasks = tasks.filter((t) => t.completed);
    } else if (selectedFilter === "active") {
      tasks = tasks.filter((t) => !t.completed);
    }

    // 2️⃣ Search
    if (searchedVal.trim()) {
      tasks = tasks.filter((t) =>
        t.task.toLowerCase().includes(searchedVal.toLowerCase())
      );
    }

    return tasks;
  }, [totalTask, selectedFilter, searchedVal]);

  return (
    <>
      <div>
        <Task
          setSearchedval={setSearchedval}
          taskVal={taskVal}
          setTaskVal={setTaskVal}
          handleAddTask={handleAddTask}
          visibleTasks={visibleTasks}
          handleDelete={handleDelete}
          editMode={editMode}
          editTask={editTask}
          setEditMode={setEditMode}
          setEditTask={setEditTask}
          handleUpdate={handleUpdate}
          filterMode={filterMode}
          setFilterMode={setFilterMode}
          handleChecked={handleChecked}
          handleSelectedFilter={handleSelectedFilter}
          task={task}
          selectedFilter={selectedFilter}
          searchedVal={searchedVal}
          handleReorder={handleReorder}
        />
      </div>
    </>
  );
};

export default TaskLogic;
