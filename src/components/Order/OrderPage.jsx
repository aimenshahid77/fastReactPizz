import { useState } from "react";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { fetchAddress } from "../../services/Geolocation.js";
import { createOrder } from "../../services/Api.js";

import { useMutation } from "@tanstack/react-query";

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

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.checked);
  };

 const { mutate: createOrderApi, isPending } = useMutation({
  mutationFn: createOrder,
  onSuccess: (data) => {
    const orderId = data.data.id;
      navigate(`/order/${orderId}`);
  },
});

  const handleFetchAddress = ({ position, address }) => {
    setAddress(address);
    setPosition(`${position.latitude},${position.longitude}`);
  };

  const { mutate: fetchAddressApi, isPending: isFetchingAddress } = useMutation(
    {
      mutationFn: fetchAddress,
      onSuccess: (data) => handleFetchAddress(data),
      onError: (error) => console.error("Error fetching address:", error),
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedCart = cart.map((item) => ({
      pizzaId: item.pizzaId,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.quantity * item.unitPrice,
    }));

    const orderData = {
      customer: name,
      phone,
      address,
      priority,
      cart: formattedCart,
    };

    createOrderApi(orderData);
  };
  return (
    <div>
      <h2 className="text-3xl font-bold text-center font-poppins">
        Almost there,
      </h2>

      <div>
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
        />

        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
        />

        <button
          type="button"
          onClick={fetchAddressApi}
          className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded self-end"
        >
          {isFetchingAddress ? "Fetching..." : "Auto-Fill Address"}
        </button>

        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
        />

        <div className="mt-4">
          <label htmlFor="priority" className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="priority"
              checked={priority}
              onChange={handlePriorityChange}
              className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Priority (extra $2)
            </span>
          </label>
        </div>
        <h2 className="text-xl font-semibold mt-4">
          Total Price: ${finalPrice.toFixed(2)}
        </h2>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
      >
        {" "}
        Place Order
      </button>
    </div>
  );
};

export default OrderPage;
