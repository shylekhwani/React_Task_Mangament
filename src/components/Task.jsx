/* eslint-disable no-unused-vars */
import SearchBar from "./SearchBar";
import { Reorder, motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Trash2,
  Edit3,
  Plus,
  Filter,
  CheckCircle2,
  Circle,
  Flame,
  Zap,
  Droplets,
} from "lucide-react";

export const Task = function ({
  task,
  setEditMode,
  setEditTask,
  setFilterMode,
  setSearchedval,
  taskVal,
  setTaskVal,
  handleAddTask,
  visibleTasks,
  handleDelete,
  editMode,
  editTask,
  handleUpdate,
  handleChecked,
  filterMode,
  selectedFilter,
  handleSelectedFilter,
  handleReorder,
}) {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <Flame className="w-4 h-4" />;
      case "medium":
        return <Zap className="w-4 h-4" />;
      default:
        return <Droplets className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "from-red-500 to-orange-500";
      case "medium":
        return "from-yellow-500 to-amber-500";
      default:
        return "from-blue-500 to-cyan-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 sm:p-10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl relative z-10"
      >
        {/* Glass Card Container */}
        <div className="bg-white/10 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <motion.div
              className="relative z-10 flex items-center justify-center gap-3"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Task Master
              </h1>
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </motion.div>
            <p className="text-center text-white/80 mt-2 text-sm">
              Organize your life with style
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SearchBar Searchedval={setSearchedval} />
            </motion.div>

            {/* Add Task Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-3"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="What needs to be done today?"
                  value={taskVal}
                  onChange={(e) => setTaskVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                  className="w-full px-5 py-3 rounded-xl border-2 border-white/20 bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none backdrop-blur-xl transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddTask}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/50 flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add
              </motion.button>
            </motion.div>

            {/* Filter Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterMode((prev) => !prev)}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                <Filter className="w-4 h-4" />
                {filterMode ? "Hide Filters" : "Show Filters"}
              </motion.button>

              <AnimatePresence>
                {filterMode && (
                  <motion.select
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    value={selectedFilter}
                    onChange={handleSelectedFilter}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-xl"
                  >
                    <option value="all" className="bg-slate-800">
                      All Tasks
                    </option>
                    <option value="completed" className="bg-slate-800">
                      Completed
                    </option>
                    <option value="active" className="bg-slate-800">
                      Active
                    </option>
                  </motion.select>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Task List */}
            <Reorder.Group
              axis="y"
              values={visibleTasks}
              onReorder={handleReorder}
              className="space-y-4 min-h-[300px]"
            >
              <AnimatePresence>
                {visibleTasks.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-16"
                  >
                    <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                      <CheckCircle2 className="w-12 h-12 text-white/40" />
                    </div>
                    <p className="text-white/60 text-lg font-medium">
                      No tasks found
                    </p>
                    <p className="text-white/40 text-sm mt-2">
                      Add a task to get started!
                    </p>
                  </motion.div>
                ) : (
                  visibleTasks.map((task, index) => (
                    <Reorder.Item
                      key={task.id}
                      value={task}
                      whileDrag={{
                        scale: 1.05,
                        boxShadow: "0 20px 60px rgba(139, 92, 246, 0.5)",
                        rotate: 2,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        x: -100,
                        transition: { duration: 0.2 },
                      }}
                      transition={{ delay: index * 0.05 }}
                      className="cursor-grab active:cursor-grabbing group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-all shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
                      >
                        {/* Task Header */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleChecked(task.id)}
                              className="mt-1 flex-shrink-0"
                            >
                              {task.completed ? (
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                              ) : (
                                <Circle className="w-6 h-6 text-white/40 group-hover:text-white/60 transition-colors" />
                              )}
                            </motion.button>
                            <span
                              className={`text-lg font-medium break-words transition-all ${
                                task.completed
                                  ? "line-through text-white/40"
                                  : "text-white"
                              }`}
                            >
                              {task.task}
                            </span>
                          </div>

                          {/* Priority Badge */}
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${getPriorityColor(
                              task.priority
                            )} shadow-lg flex-shrink-0`}
                          >
                            {getPriorityIcon(task.priority)}
                            <span className="text-white text-xs font-bold uppercase tracking-wider">
                              {task.priority || "low"}
                            </span>
                          </motion.div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 justify-end">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setEditMode(task.id);
                              setEditTask({
                                ...editTask,
                                task: task.task,
                                priority: task.priority,
                              });
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-yellow-500/50 text-sm font-medium"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(task.id)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-red-500/50 text-sm font-medium"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </motion.button>
                        </div>
                      </motion.div>
                    </Reorder.Item>
                  ))
                )}
              </AnimatePresence>
            </Reorder.Group>

            {/* Edit Mode Modal */}
            <AnimatePresence>
              {editMode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl p-6 border-2 border-purple-500/30 shadow-2xl"
                >
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <Edit3 className="w-5 h-5" />
                    Edit Task
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={editTask.task}
                      onChange={(e) =>
                        setEditTask({ ...editTask, task: e.target.value })
                      }
                      className="flex-1 px-4 py-3 border-2 border-white/20 rounded-xl bg-white/5 text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none backdrop-blur-xl"
                    />
                    <select
                      value={editTask.priority}
                      onChange={(e) =>
                        setEditTask({ ...editTask, priority: e.target.value })
                      }
                      className="px-4 py-3 border-2 border-white/20 rounded-xl bg-white/5 text-white outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-xl"
                    >
                      <option value="low" className="bg-slate-800">
                        Low Priority
                      </option>
                      <option value="medium" className="bg-slate-800">
                        Medium Priority
                      </option>
                      <option value="high" className="bg-slate-800">
                        High Priority
                      </option>
                    </select>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleUpdate}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-green-500/50 font-medium"
                    >
                      Update
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setEditMode(null);
                        setEditTask({ task: "", priority: "low" });
                      }}
                      className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all backdrop-blur-xl font-medium"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-4 border-t border-white/10 flex justify-between text-white/60 text-sm"
            >
              <span>{visibleTasks.length} tasks</span>
              <span>
                {visibleTasks.filter((t) => t.completed).length} completed
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
