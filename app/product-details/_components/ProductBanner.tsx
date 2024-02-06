import Image from "next/image";
import React from "react";

function ProductBanner({ product }: any) {
  return (
    <div>
      {product?.attributes?.img?.data?.attributes?.url ? (
        <Image
          src={product?.attributes?.img?.data?.attributes?.url}
          alt="product image"
          width={400}
          height={300}
          className="rounded-lg w-[350px] sm:w-[700px] h-[250px] sm:h-[350px]   "
        />
      ) : (
        <div className=" w-[350px] sm:w-[625px] md:w-[700px] h-[250px] sm:h-[350px]  bg-slate-200 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
}

export default ProductBanner;
