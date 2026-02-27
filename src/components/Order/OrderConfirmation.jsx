import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { calcMinutesLeft } from "../../helpers/utils";
import { fetchOrder, updateOrder } from "../../services/Api";
import { motion } from "framer-motion";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder(orderId),
  });

  const { mutate: updateOrderApi, isLoading: isUpdating } = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => queryClient.invalidateQueries(["order", orderId]),
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading order details...</p>;
  if (isError)
    return <p className="text-center mt-10">Failed to load order.</p>;

  const {
    id,
    status,
    priority,
    orderPrice = 0,
    estimatedDelivery,
    cart = [],
  } = order;

 



  const priorityPrice = priority ? orderPrice * 0.2 : 0;
  const totalPrice = orderPrice + priorityPrice;
  const minutesLeft = calcMinutesLeft(estimatedDelivery);

  return (
    <motion.div
      className="min-h-screen p-8 bg-linear-to-b from-[#FFF8E7] via-[#FFB347] to-[#FFE5B4] font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-yellow-600 font-poppins">
          Order Confirmed!
        </h2>

        {/* Order Info Section */}
        <motion.div
          className="p-4 bg-white/80 rounded-2xl shadow-inner space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p>
            <strong>Order ID:</strong> {id}
          </p>
          <p>
            <strong>Estimated Delivery:</strong>{" "}
            {minutesLeft > 0 ? `${minutesLeft} minutes` : "Any moment now"}
          </p>
          <p>
            <strong>Order Status:</strong> {status}
          </p>
        </motion.div>

        {/* Items Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-2xl font-semibold mb-3">Items</h3>
          <ul className="space-y-2">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <li
                  key={`${item.pizzaId}-${index}`}
                  className="flex justify-between p-3 rounded-xl bg-white/70 hover:bg-white/90 transition"
                >
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <span>${(item.quantity * item.unitPrice).toFixed(2)}</span>
                </li>
              ))
            ) : (
              <li>No items in this order.</li>
            )}
          </ul>
        </motion.div>

        {/* Price Section */}
        <motion.div
          className="p-4 rounded-2xl shadow-inner bg-linear-to-r from-[#FFF8E7]/70 via-[#FFB347]/70 to-[#FFE5B4]/70 text-right space-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg">
            <strong>Order Price:</strong> ${orderPrice.toFixed(2)}
          </p>
          {priority && (
            <p className="text-lg text-yellow-600">
              <strong>Priority (20%):</strong> ${priorityPrice.toFixed(2)}
            </p>
          )}
          <p className="text-2xl font-bold mt-1">
            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
          </p>
        </motion.div>

        {/* Priority Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {priority ? (
            <button
              disabled
              className="h-12 px-6 font-bold rounded-full bg-gray-300 text-gray-700 cursor-not-allowed"
            >
              Priority Applied
            </button>
          ) : (
            <button
              onClick={() =>
                updateOrderApi({ id, updateObj: { priority: true } })
              }
              disabled={isUpdating}
              className={`h-12 px-6 font-bold rounded-full bg-linear-to-r from-[#FFB347] to-[#FFE5B4] text-gray-900 hover:scale-105 transition ${
                isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUpdating ? "Applying Priority..." : "Give Priority (20%)"}
            </button>
          )}
        </motion.div>

        <motion.p
          className="text-center font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <strong>Payment Status:</strong> Cash on Delivery
        </motion.p>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;
