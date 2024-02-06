"use client";
import Breadcrumb from "@/app/_components/Breadcrumb";
import productApis from "@/app/_utils/product-Apis";
import React, { useEffect, useState } from "react";
import ProductBanner from "../_components/ProductBanner";
import ProductInfo from "../_components/ProductInfo";
import ProductList from "@/app/_components/ProductList";
import { usePathname } from "next/navigation";

function productDetails({ params }: any) {
  const path = usePathname();
  console.log("path", path);
  const [productDetails, setproductDetails] = useState({});
  const [productList, setproductList] = useState([]);
  useEffect(() => {
    productDetails_();
  }, [params?.productId]);
  const productDetails_ = async () => {
    const res = await productApis.getProductById(params.productId);
    setproductDetails(res.data.data);
    getProductListByCategory(res.data.data);
  };
  const getProductListByCategory = async (product: any) => {
    const res = await productApis.getProducByCategory(
      product?.attributes?.category
    );
    // console.log(res.data.data);
    setproductList(res.data.data);
  };
  return (
    <div className="px-8 md:px-28 py-8">
      <Breadcrumb path={path} />
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 justify-around gap-4 ">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <h2 className="my-5 mt-24 text-xl">Similar Products</h2>
      <ProductList productList={productList} />
    </div>
  );
}

export default productDetails;
