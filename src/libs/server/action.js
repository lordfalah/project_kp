const getProducts = async () => {
  try {
    const req = await fetch("/api/products", {
      method: "GET",
      cache: "force-cache",
    });
    if (!req?.ok) throw new Error("INTERNAL SERVER ERROR");

    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getOrders = async () => {
  try {
    const req = await fetch("/api/order", {
      method: "GET",
      cache: "force-cache",
    });
    if (!req?.ok) throw new Error("INTERNAL SERVER ERROR");

    const response = await req.json();
    return response;
  } catch (error) {
    return error;
  }
};

const getUsers = async () => {
  try {
    const req = await fetch("/api/account", {
      method: "GET",
      cache: "no-store",
    });
    if (!req?.ok) throw new Error("INTERNAL SERVER ERROR");
    return await req.json();
  } catch (error) {
    return error;
  }
};

export const clientApi = { getProducts, getOrders, getUsers };
