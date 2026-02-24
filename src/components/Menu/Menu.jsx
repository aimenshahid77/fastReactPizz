import { useQuery } from "@tanstack/react-query";
import { fetchMenu } from "../../services/Api";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";

const Menu = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  const cart = useSelector((state) => state.cart.cart);
  const userName = useSelector((state) => state.user.value);
  console.log(userName);
  console.log(cart);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  //   if (data) {
  //     console.log(data);
  //   }

  return (
    <>
      <h3 className="text-3xl font-bold text-center font-poppins">
        Enjoy your pizza,
      </h3>
      <div>
        <div className="px-4 md:px-8 lg:px-12 py-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {data?.data.map((pizza) => (
              <MenuItem key={pizza.id} pizza={pizza} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Menu;
