import { useDispatch, useSelector } from "react-redux";
import {
  addtoCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { getQuantityById } from "../../redux/slices/cartSlice";
import {
  IncrementButton,
  DecrementButton,
  RemoveFromCartButton,
} from "../SharedUi/Buttons/CartButtons";
import CartOverview from "../Cart/CartOverview";
import { motion } from "framer-motion";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const quantity = useSelector(getQuantityById(id));
  const isInCart = quantity > 0;

  const handleAddToCart = () => {
    const pizzaItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
      ingredients,
      soldOut,
    };
    dispatch(addtoCart(pizzaItem));
  };

  return (
    <>
      <motion.li
        className={`relative flex flex-col md:flex-row gap-4 rounded-3xl bg-white p-6 shadow-lg transition-all duration-300
          ${soldOut ? "opacity-60 cursor-not-allowed" : "hover:-translate-y-2 hover:shadow-2xl"}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={imageUrl}
          alt={name}
          className={`w-full md:w-48 h-48 rounded-xl object-cover ${
            soldOut ? "grayscale" : ""
          }`}
        />

        <div className="flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-sans">
              {name}
            </h3>
            <p className="text-gray-500 italic mb-3">
              {ingredients.join(", ")}
            </p>
            <span
              className={`text-lg font-semibold ${
                soldOut ? "text-red-600" : "text-gray-800"
              }`}
            >
              ${unitPrice.toFixed(2)}
            </span>
          </div>

          <div className="mt-4">
            {!soldOut && !isInCart && (
              <motion.button
                onClick={handleAddToCart}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
                }}
                className="px-5 py-2 bg-linear-to-r from-[#FFB347] to-[#2EC4B6] text-gray-900 font-semibold rounded-full shadow hover:opacity-90 transition"
              >
                Add to Cart
              </motion.button>
            )}

            {isInCart && (
              <div className="flex items-center gap-3 bg-linear-to-r from-[#FFB347] to-[#2EC4B6] text-gray-900 px-3 py-1 rounded-full shadow-md">
                <DecrementButton
                  onClick={() => dispatch(decrementQuantity(id))}
                />
                <span className="min-w-6 text-center font-semibold">
                  {quantity}
                </span>
                <IncrementButton
                  onClick={() => dispatch(incrementQuantity(id))}
                />
                <RemoveFromCartButton
                  onClick={() => dispatch(removeFromCart(id))}
                />
              </div>
            )}

            {soldOut && (
              <span className="text-red-600 font-bold">Sold Out</span>
            )}
          </div>
        </div>
      </motion.li>

      <CartOverview />
    </>
  );
}

export default MenuItem;
