import axiosClient from "./axiosClient";
// const { default: axiosClient } = require("./axiosClient");
// const getLatestProducts = async () => {
//     const response = await axiosClient.get("/products");
//     return response;
// }
const getLatestProducts = () => axiosClient.get("/products?populate=*");
const getProductById = (id: number) =>
  axiosClient.get(`/products/${id}?populate=*`);
const getProducByCategory = (category: string) =>
  axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);
export default {
  getLatestProducts,
  getProductById,
  getProducByCategory,
};
