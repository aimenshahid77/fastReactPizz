
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  getTotalPrice,
  removeFromCart,
  clearCart,
} from "../../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center space-y-4">
        <p>Your cart is empty</p>
      
        <button
          onClick={() => navigate("/menu")}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          ← Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {cart.map(item => (
        <div
          key={item.pizzaId}
          className="flex justify-between items-center border p-4 rounded-md"
        >
          <div>
            <h2 className="font-semibold">{item.name}</h2>
            <p>Quantity: {item.quantity}</p>
          </div>

          <p className="font-bold">${item.totalPrice.toFixed(2)}</p>

      
          <button
            onClick={() => dispatch(removeFromCart(item.pizzaId))}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 hover:scale-110 transition ease-in-out delay-75"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex justify-between font-bold text-lg border-t pt-4">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

    
      <div className="flex justify-between gap-4 pt-2">
        <button
          onClick={() => navigate("/menu")}
          className="bg-gray-800 text-white px-4 py-2 rounded-md w-full hover:bg-gray-900 hover:scale-105 transition ease-in-out delay-75 "
        >
          ← Back to Menu
        </button>

        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-700 hover:scale-102 transition ease-in-out delay-75"
        >
          Clear Cart
        </button>

        <button
          onClick={() => navigate("/order")}
          className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-md w-full hover:bg-yellow-500 hover:scale-105 transition ease-in-out delay-75"
        >
          Place Order →
        </button>
      </div>
    </div>
  );
};

export default Cart;
