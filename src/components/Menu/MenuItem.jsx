import { getQuantityById } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addtoCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import {
  IncrementButton,
  DecrementButton,
  RemoveFromCartButton,
} from "../SharedUi/Buttons/CartButtons";
import CartOverview from "../Cart/CartOverview";


function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const quantity = useSelector(getQuantityById(id));
  const cart = useSelector((state) => state.cart.cart);
  const isInCart = quantity > 0;

  function handleAddToCart() {
    const pizza = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
      ingredients,
      soldOut,
    };
    dispatch(addtoCart(pizza));
  }
  return (
<>
    <li
      className={`relative flex gap-5 rounded-2xl bg-white p-4 shadow-md transition
      ${soldOut ? "opacity-60" : "hover:-translate-y-1 hover:shadow-xl"}`}
    >
      <img
        src={imageUrl}
        alt={name}
        className={`h-40 w-38 rounded-xl object-cover
        ${soldOut ? "grayscale" : ""}`}
      />

      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 font-poppins">
            {name}
          </h3>

          <p className="mt-3 text-sm italic text-gray-500 font-stretch-50%">
            {ingredients.join(", ")}
          </p>
        </div>

        <span
          className={`mt-2 text-medium font-bold
      ${soldOut ? "text-red-600" : "text-gray-800"}`}
        >
          ${unitPrice}
        </span>
      </div>
      <div className="absolute bottom-4 right-4">
        {!soldOut ? (
          <>
            {!isInCart && (
              <button
                onClick={handleAddToCart}
                disabled={soldOut}
                className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full
                 hover:bg-amber-600 transition
                 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            )}
          </>
        ) : (
          <button className="text-red-600 font-bold">Sold Out</button>
        )}

        {isInCart && (
          <div className="flex items-center bg-amber-500 text-white px-3 py-1 rounded-full shadow-md h-10 ">
            <DecrementButton onClick={() => dispatch(decrementQuantity(id))} />

            <span className="mx-2 min-w-5 text-center font-semibold">
              {quantity}
            </span>

            <IncrementButton onClick={() => dispatch(incrementQuantity(id))} />

            <div className="h-2 w-2" />

            <RemoveFromCartButton
              onClick={() => dispatch(removeFromCart(id))}
            />
          </div>
        )}
      </div>
     
    </li>
    <CartOverview/>

</>
    
  );
}
export default MenuItem;
