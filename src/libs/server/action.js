"use client";

const getProducts = async () => {
  try {
    const req = await fetch("/api/products", {
      method: "GET",
      cache: "no-store",
    });
    if (!req?.ok) throw new Error("INTERNAL SERVER ERROR");

    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error?.message || "");
  }
};

const getOrders = async () => {
  try {
    const req = await fetch("/api/order", {
      method: "GET",
      cache: "no-store",
    });
    if (!req?.ok) throw new Error("INTERNAL SERVER ERROR");

    const response = await req.json();
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error?.message || "");
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
    throw new Error(error?.message || "");
  }
};

const deleteProduct = async (id) => {
  try {
    const req = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!req.ok) throw new Error(req?.statusText || "");
    const res = await req.json();

    return res;
  } catch (error) {
    throw new Error(error?.message || "");
  }
};

const deleteOrder = async (id) => {
  try {
    const req = await fetch(`/api/order/${id}`, { method: "DELETE" });
    if (!req.ok) throw new Error(req?.statusText || "");

    const res = await req.json();
    return res;
  } catch (error) {
    throw new Error(error?.message || "");
  }
};

const onUpdateStatus = async ({ status, id }) => {
  try {
    const req = await fetch(`/api/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    });

    if (!req.ok) throw new Error(req?.statusText || "");

    const res = await req.json();
    return res;
  } catch (error) {
    throw new Error(error?.message || "");
  }
};

const deleteUser = async (id) => {
  try {
    const req = await fetch(`/api/account/${id}`, { method: "DELETE" });
    if (!req.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await req.json();

    return res;
  } catch (error) {
    throw new Error(error?.message);
  }
};

const onUpdateRole = async ({ role, id }) => {
  try {
    const req = await fetch(`/api/account/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        role,
      }),
    });

    if (!req.ok) {
      throw new Error("Network response was not ok");
    }

    return await req.json();
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const clientApi = {
  getProducts,
  getOrders,
  getUsers,
  deleteProduct,
  deleteOrder,
  onUpdateStatus,
  deleteUser,
  onUpdateRole,
};
