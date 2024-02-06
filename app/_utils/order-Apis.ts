import axiosClient from "./axiosClient";

const createOrder = (data: any) => axiosClient.post("/orders", data);
export default {
  createOrder,
};
