const ApiUrl = "https://react-fast-pizza-api.onrender.com/api";

export async function fetchMenu() {
  const resp = await fetch(`${ApiUrl}/menu`);

  if (!resp.ok) {
    throw new Error("Failed to fetch menu data");
  }

  const data = await resp.json();

  if (data.status !== "success") {
    throw new Error("Something went wrong while fetching menu data");
  }

  return data;
}




export async function createOrder(newOrder) {
    try {

        console.log(newOrder)
     const resp = await fetch(`${ApiUrl}/order`, {
        method: "POST",
          body: JSON.stringify(newOrder),
        headers: {
            "Content-Type": "application/json",
        },
      
        
    });

    if (!resp.ok) throw new Error("Failed to create order");

    const data = await resp.json();
    return data;

        
    } catch (error) {
    console.log(error);
    throw new Error("Failed To Create Order");
        
    }
}
export async function fetchOrder(id) {
  const res = await fetch(`${ApiUrl}/order/${id}`);
  if (!res.ok) throw new Error("Failed to fetch order");

  const data = await res.json();
  return data.data;
}

export async function updateOrder({ id, updateObj }) {
  try {
    const res = await fetch(`${ApiUrl}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    console.log(err);

    throw Error("Failed updating your order");
  }}



