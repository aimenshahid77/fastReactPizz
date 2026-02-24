
import { useSelector } from 'react-redux';
import { getTotalItems, getTotalPrice } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const CartOverview = () => {
    const totalPrice = useSelector(getTotalPrice);
    const totalItems= useSelector(getTotalItems);
      if (totalItems === 0) return null;
    
  return (
    <>
   
 <div className="fixed bottom-4 right-4 bg-amber-200 shadow-lg rounded-lg p-4 border flex items-center gap-4 font-bold text-lg font-poppins">
      <p className="flex gap-3">
        <span>{totalItems} Pizzas</span>

        <span>${totalPrice}</span>
      </p>
      <Link to={"/cart"} className="flex gap-3 ">
      <button className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-400 hover:scale-110 transition ease-in-out delay-75 ">
          Open cart
        <ShoppingCart />
      </button>
      </Link>
    </div>
     
    
    </>
  )
}

export default CartOverview
