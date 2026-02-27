import { useState } from "react";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { fetchAddress } from "../../services/Geolocation.js";
import { createOrder } from "../../services/Api.js";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";

const OrderPage = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [priority, setPriority] = useState(false);
  const [position, setPosition] = useState("");
  const totalPrice = useSelector(getTotalPrice);
  const priorityPrice = priority ? totalPrice * 0.2 : 0;
  const finalPrice = totalPrice + priorityPrice;
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);

  const { mutate: createOrderApi } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      navigate(`/order/${data.data.id}`);
    },
  });

  const { mutate: fetchAddressApi, isPending: isFetchingAddress } = useMutation(
    {
      mutationFn: fetchAddress,
      onSuccess: (data) => {
        setAddress(data.address);
        setPosition(`${data.position.latitude},${data.position.longitude}`);
      },
      onError: (error) => console.error("Error fetching address:", error),
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert("Please fill all required fields!");
      return;
    }
    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const formattedCart = cart.map((item) => ({
      pizzaId: item.pizzaId,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));
    createOrderApi({
      customer: name,
      phone,
      address,
      priority,
      cart: formattedCart,
    });
  };

  return (
    <motion.div
      className="min-h-screen p-8 bg-linear-to-b from-[#FFF8E7] via-[#FFB347] to-[#FFE5B4] font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center font-poppins">
          Almost there,
        </h2>

        {/* Form Section */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="button"
              onClick={fetchAddressApi}
              className="mt-2 px-4 py-2 rounded-full bg-linear-to-r from-[#FFB347] to-[#FFE5B4] text-gray-900 font-semibold hover:scale-105 transition"
            >
              {isFetchingAddress ? "Fetching..." : "Auto-Fill Address"}
            </button>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </motion.div>

          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <input
              type="checkbox"
              id="priority"
              checked={priority}
              onChange={(e) => setPriority(e.target.checked)}
              className="h-5 w-5 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <span className="text-gray-700 font-medium">
              Priority (extra 20%)
            </span>
          </motion.div>

          <motion.h3
            className="text-xl font-semibold mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Total Price: ${finalPrice.toFixed(2)}
          </motion.h3>

          <motion.button
            type="submit"
            className="w-full py-3 mt-4 rounded-full bg-linear-to-r from-[#FFB347] to-[#FFE5B4] text-gray-900 font-bold text-lg shadow-lg hover:scale-105 transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Place Order
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default OrderPage;
