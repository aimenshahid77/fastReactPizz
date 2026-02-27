import { useSelector } from "react-redux";
import { getTotalItems, getTotalPrice } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const CartOverview = () => {
  const totalPrice = useSelector(getTotalPrice);
  const totalItems = useSelector(getTotalItems);

  if (totalItems === 0) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 bg-linear-to-b from-[#FFB347] to-[#2EC4B6] text-gray-900 rounded-3xl p-4 shadow-xl flex items-center gap-4 font-bold text-lg font-sans"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="flex gap-4">
        <span>{totalItems} Pizzas</span>
        <span>${totalPrice.toFixed(2)}</span>
      </p>
      <Link to={"/cart"}>
        <motion.button
          className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full shadow hover:scale-110 transition"
          whileHover={{ scale: 1.05 }}
        >
          Open Cart
          <ShoppingCart />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default CartOverview;
