import { ShoppingCart } from "lucide-react";
import { Trash2 } from "lucide-react";

export function AddToCartButton({ onClick }) {
  return (
    <div
      className="grid items-center absolute right-10 bottom-7 bg-yellow-500 h-9 w-12 text-xl rounded-full hover:bg-yellow-400 hover:scale-110 transition ease-in-out delay-75 "
      aria-label="Add to cart"
    >
      <button onClick={onClick}>
        <ShoppingCart />
      </button>
    </div>
  );
}

export function IncrementButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center rounded-full  text-amber-600 font-bold hover:bg-amber-50 h-4 w-4 transition"
    >
      +
    </button>
  );
}

export function DecrementButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className=" flex-1  hover:bg-amber-50 h-4 w-4 flex items-center justify-center rounded-full text-amber-600 font-bold transition"
    >
      –
    </button>
  );
}

export function RemoveFromCartButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 h-4 w-4 flex items-center justify-center rounded-full hover:bg-red-500/20 transition"
    >
      <Trash2 className="w-4 h-4 text-white" />
    </button>
  );
}
