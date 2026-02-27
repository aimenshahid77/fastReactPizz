import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  getTotalPrice,
  removeFromCart,
  clearCart,
} from "../../redux/slices/cartSlice";
import { motion } from "framer-motion";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  if (cart.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen text-gray-900 px-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold mb-4 font-sans">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/menu")}
          className="bg-linear-to-r from-[#FFB347] to-[#2EC4B6] text-gray-900 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
        >
          ← Back to Menu
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen px-6 md:px-12 lg:px-24 py-12 bg-linear-to-b from-[#FFF8E7] via-[#FFB347] to-[#2EC4B6] space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center font-sans">
        Your Cart
      </h1>

      {cart.map((item) => (
        <motion.div
          key={item.pizzaId}
          className="flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">{item.name}</h2>
            <p className="text-gray-500">Quantity: {item.quantity}</p>
          </div>

          <p className="text-xl font-bold text-gray-900 mt-2 md:mt-0">
            ${item.totalPrice.toFixed(2)}
          </p>

          <button
            onClick={() => dispatch(removeFromCart(item.pizzaId))}
            className="bg-red-500 text-white px-4 py-2 rounded-full text-sm mt-2 md:mt-0 hover:bg-red-700 hover:scale-105 transition"
          >
            Remove
          </button>
        </motion.div>
      ))}

      <div className="flex justify-between items-center text-xl font-bold bg-white p-6 rounded-2xl shadow-lg">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => navigate("/menu")}
          className="flex-1 bg-linear-to-r from-[#FFB347] to-[#2EC4B6] text-gray-900 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
        >
          ← Back to Menu
        </button>
        <button
          onClick={() => dispatch(clearCart())}
          className="flex-1 bg-red-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition"
        >
          Clear Cart
        </button>
        <button
          onClick={() => navigate("/order")}
          className="flex-1 bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 hover:scale-105 transition"
        >
          Place Order →
        </button>
      </div>
    </motion.div>
  );
};

export default Cart;
