import Applayout from "./layout/Applayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";
import OrderPage from "./components/Order/OrderPage";
import OrderConfirmation from "./components/Order/OrderConfirmation";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Applayout,
      children: [
        {
          path: "/",
          Component: Home,
        },
        {
          path: "/menu",
          Component: Menu,
        },
        {
          path: "/cart",  
          Component: Cart,
        },
        {
          path: "/order",
          Component: OrderPage,

        }, 
        {
          path: "/order/:orderId" ,
          Component: OrderConfirmation,
        },

      ],
    },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
