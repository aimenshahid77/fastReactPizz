import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { calcMinutesLeft } from "../../helpers/utils";
import { fetchOrder } from "../../services/Api";

const OrderConfirmation = () => {
  const { orderId } = useParams();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder(orderId),
    
  });

  if (isLoading) return <p>Loading order details...</p>;
  if (isError) return <p>Failed to load order.</p>;

  const minutesLeft = calcMinutesLeft(order.estimatedDelivery);

  return (
    <div style={{ padding: "1.5rem", maxWidth: "600px" }}>
      {order.priority && <div>PRIORITY ORDER</div>}

      <h2>Order Confirmed...</h2>
      <p>
        <strong>Order ID:</strong> {order.id}
      </p>

      <p>
        <strong>Delivery Address:</strong> {order.address}
      </p>

      <p>
        <strong>Estimated Delivery:</strong>{" "}
        {minutesLeft > 0 ? `${minutesLeft} minutes` : "Any moment now"}
      </p>

      <h3>Items</h3>
      <ul>
        {order.cart.map((item) => (
          <li key={item.pizzaId}>
            {item.quantity} × {item.name} — €
            {(item.quantity * item.unitPrice).toFixed(2)}
          </li>
        ))}
      </ul>

      <hr />

      <p>
        <strong>Total Price:</strong> €{order.totalPrice.toFixed(2)}
      </p>

      <p>
        <strong>Payment Status:</strong> Cash on Delivery
      </p>
    </div>
  );
};

export default OrderConfirmation;
