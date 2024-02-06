import React from "react";
import Image from "next/image";
import { List } from "lucide-react";
import Link from "next/link";

function ProductItem({ product }: any) {
  //   return <div>{product.attributes.title}</div>;
  return (
    <Link
      href={`/product-details/${product?.id}`}
      className="p-1 border-teal-400 rounded-lg  hover:border hover:shadow-md hover:cursor-pointer my-4"
    >
      <Image
        src={product?.attributes?.img?.data?.attributes?.url}
        alt="product Image"
        width={400}
        height={350}
        className="rounded-t-lg w-full h-[180px] object-cover"
      />
      <div className="flex justify-between  items-center py-4 px-2 md:px-4 bg-gray-50 rounded-b-lg">
        <div className="flex flex-col items-start ">
          <h3 className="text-lg font-semibold line-clamp-1">
            {product.attributes.title}
          </h3>
          <p className="pb-3 mb-1 text-xs font-medium tracking-wide text-gray-500 flex justify-center items-center  gap-1 ">
            <List /> {product.attributes.category.toUpperCase()}
          </p>
        </div>
        <h3>${product?.attributes?.price}</h3>
      </div>
    </Link>
  );
}

export default ProductItem;
