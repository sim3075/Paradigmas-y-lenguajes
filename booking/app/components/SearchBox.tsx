import { motion } from "framer-motion";

function SearchBox() {
  return (
    <div>
      <motion.input
        whileHover={{ backgroundColor: "#4A5568" }} //
        transition={{ duration: 0.2 }}
        className="h-8 px-5 pr-20 rounded-lg text-sm focus:outline-none text-white opacity-85 bg-gray-400 placeholder-gray-50"
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBox;
