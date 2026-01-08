/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SearchBar = ({ Searchedval }) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value) => {
    let timer;
    timer = setTimeout(() => {
      Searchedval(value);
    }, 500);
    return () => clearTimeout(timer);
  };

  const handleClear = () => {
    setInput("");
    Searchedval("");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    handleSearch(value); // Real-time search
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Glow Effect */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-2xl"
          />
        )}
      </AnimatePresence>

      {/* Search Container */}
      <div
        className={`relative flex items-center gap-3 bg-white/10 backdrop-blur-xl border-2 rounded-2xl px-5 py-3.5 transition-all duration-300 ${
          isFocused
            ? "border-purple-500/50 shadow-lg shadow-purple-500/20"
            : "border-white/20 hover:border-white/30"
        }`}
      >
        {/* Search Icon with Animation */}
        <motion.div
          animate={{
            scale: isFocused ? 1.1 : 1,
            rotate: isFocused ? 360 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <Search
            className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? "text-purple-400" : "text-white/60"
            }`}
          />
        </motion.div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search your tasks..."
          value={input}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 outline-none text-base text-white placeholder-white/40 bg-transparent font-medium"
        />

        {/* Clear Button */}
        <AnimatePresence>
          {input && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClear}
              className="flex-shrink-0 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4 text-white/80" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Sparkle Effect on Focus */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="flex-shrink-0"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Hint */}
      <AnimatePresence>
        {isFocused && !input && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full mt-2 left-0 right-0 text-center"
          >
            <p className="text-white/50 text-xs font-medium">
              Start typing to filter tasks instantly ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchBar;
