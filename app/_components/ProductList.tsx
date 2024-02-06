import React from "react";
import ProductItem from "./ProductItem";

function ProductList(props: any) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {props.productList.map((product: any) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
