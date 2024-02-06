import axiosClient from "./axiosClient";

const addToCart = (data: any) => axiosClient.post("/carts", data);
const getUserCart = (email: string) =>
  axiosClient.get(
    `/carts?populate[products][populate]=img&filter[email][$eq]=${email}`
  );
const deleteUserCart = (id: string) => axiosClient.delete(`/carts/${id}`);
export default {
  addToCart,
  getUserCart,
  deleteUserCart,
};
