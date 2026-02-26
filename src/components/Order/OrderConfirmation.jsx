import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { calcMinutesLeft } from "../../helpers/utils";
import { fetchOrder, updateOrder } from "../../services/Api";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const queryClient = useQueryClient();

 
  const { data: order, isLoading, isError } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder(orderId),
  });

 
  const { mutate: updateOrderApi, isLoading: isUpdating } = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => queryClient.invalidateQueries(["order", orderId]),
  });

  if (isLoading) return <p>Loading order details...</p>;
  if (isError) return <p>Failed to load order.</p>;
 

 
  const {
    id,
    status,
    priority,
    orderPrice = 0,
    estimatedDelivery,
    cart = [],
    address,
  } = order;

  
  const priorityPrice = priority ? orderPrice * 0.2 : 0;
  const totalPrice = orderPrice + priorityPrice;

  const minutesLeft = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-600">
        Order Confirmed!
      </h2>

     
      <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
        <p><strong>Order ID:</strong> {id}</p>
        <p><strong>Delivery Address:</strong> {address}</p>
        <p>
          <strong>Estimated Delivery:</strong>{" "}
          {minutesLeft > 0 ? `${minutesLeft} minutes` : "Any moment now"}
        </p>
        <p><strong>Order Status:</strong> {status}</p>
      </div>

 
      <h3 className="text-2xl font-semibold mb-3">Items</h3>
      <ul className="mb-6 space-y-2">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <li
              key={`${item.pizzaId}-${index}`}
              className="flex justify-between p-3 border rounded-md hover:bg-gray-50"
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


      <div className="mb-6 p-4 bg-yellow-50 rounded-lg shadow-inner text-right">
        <p className="text-lg">
          <strong>Order Price:</strong> ${orderPrice.toFixed(2)}
        </p>
        {priority && (
          <p className="text-lg text-yellow-600">
            <strong>Priority (20%):</strong> ${priorityPrice.toFixed(2)}
          </p>
        )}
        <p className="text-2xl font-bold mt-2">
          <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
        </p>
      </div>

    
      <div className="mb-6 flex justify-center">
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
            aria-disabled={isUpdating}
            className={`h-12 px-6 font-bold rounded-full bg-yellow-500 text-white hover:bg-yellow-400 ${
              isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUpdating ? "Applying Priority..." : "Give Priority (20%)"}
          </button>
        )}
      </div>

     
      <p className="text-center font-medium">
        <strong>Payment Status:</strong> Cash on Delivery
      </p>
    </div>
  );
};

export default OrderConfirmation;