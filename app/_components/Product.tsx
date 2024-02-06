"use client";

import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import productApis from "../_utils/product-Apis";

function Product() {
  const [productList, setproductList] = useState([]);
  useEffect(() => {
    getLatestProducts_();
  }, []);
  const getLatestProducts_ = async () => {
    // productApis.getLatestProducts().then((res: any) => {
    //   console.log(res.data);
    // });
    const res = await productApis.getLatestProducts();
    setproductList(res.data.data);
  };
  console.log(productList);
  return (
    <div className="px-10 md:px-20">
      <h1 className="text-3xl my-5 font-bold">Latest Products</h1>
      <ProductList productList={productList} />
    </div>
  );
}

export default Product;
