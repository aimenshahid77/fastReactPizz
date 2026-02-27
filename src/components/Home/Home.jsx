import CreateUser from "../User/CreateUser";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const userName = useSelector((state) => state.user.value);

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <main className="relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-linear-to-b from-[#FFF9F0] via-[#FFE6C7] to-[#FFD199] px-6">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FF6B3B]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-[#FFB347]/30 rounded-full blur-[140px]" />

      <motion.div
        className="relative z-10 max-w-4xl text-center"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <p className="uppercase tracking-[0.35em] text-sm text-[#FF6B3B] font-medium mb-6">
          Wood-fired perfection
        </p>

        <h1 className="text-[3.5rem] leading-[1.05] md:text-[4.5rem] font-extrabold text-[#1F1F1F] mb-6">
          Pizza crafted with
          <span className="block bg-linear-to-r from-[#FF6B3B] to-[#FF9F1C] bg-clip-text text-transparent">
            patience & passion
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#4A4A4A] leading-relaxed mb-12">
          From carefully fermented dough to oven-kissed toppings, every slice is
          made to arrive hot, balanced, and unforgettable.
        </p>

        {userName ? (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#1F1F1F]">
              Welcome back, <span className="text-[#FF6B3B]">{userName}</span>
            </h2>

            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-12 py-4 rounded-full bg-[#1F1F1F] text-white text-lg font-medium shadow-xl hover:bg-[#2A2A2A] transition"
              >
                Explore the Menu
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <CreateUser />
          </motion.div>
        )}
      </motion.div>
    </main>
  );
};

export default Hero;
