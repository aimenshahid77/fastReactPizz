import { useQuery } from "@tanstack/react-query";
import { fetchMenu } from "../../services/Api";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Menu = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  const userName = useSelector((state) => state.user.value);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-gray-700">
        Loading menu...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <motion.div
      className="relative min-h-screen px-6 md:px-12 lg:px-24 py-12
        bg-linear-to-b from-[#FFF8E7] via-[#FFB347] to-[#2EC4B6] overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      {/* Floating soft shapes for depth */}
      <motion.div
        className="absolute top-0 left-10 w-44 h-44 bg-[#FFD580] rounded-full opacity-25 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-64 h-64 bg-[#2EC4B6] rounded-full opacity-20 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.h3
        className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-10 font-sans"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Enjoy your pizza{userName ? `, ${userName}` : ""} 🍕
      </motion.h3>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.data.map((pizza) => (
          <MenuItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    </motion.div>
  );
};

export default Menu;
