"use client";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import React, { useContext } from "react";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import cartApis from "@/app/_utils/cart-Apis";
import { cartContext } from "@/app/_context/CartContext";

function ProductInfo({ product }: any) {
  const { cart, setCart } = useContext(cartContext);
  const user = useUser();
  const router = useRouter();
  const hundelAddToCart = async function () {
    if (!user.isSignedIn) {
      router.push("/sign-in");
    } else {
      const data = {
        data: {
          userName: user.user.fullName,
          email: user.user.emailAddresses[0].emailAddress,
          products: [product?.id],
        },
      };
      console.log(data);
      try {
        const res = await cartApis.addToCart(data);
        console.log(res);
        setCart((oldCart: any) => [
          ...oldCart,
          {
            id: res?.data?.data?.id,
            product,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      {product?.id ? (
        <div>
          <h2 className="text-[22px] font-bold">
            {product?.attributes?.title}
          </h2>
          <h2 className="text-[16px] font-bold text-gray-400 my-4">
            {product?.attributes?.category}
          </h2>
          <h2 className="text-[20px]">{product?.attributes?.description}</h2>
          <h2 className=" flex gap-2 text-[12px mt-3 text-gray-500">
            {product?.attributes?.instantDelivery ? (
              <BadgeCheck className="text-green-600" />
            ) : (
              <AlertOctagon className="text-red-600" />
            )}{" "}
            Eligible For Instant Delivery
          </h2>
          <h2 className="text-[32px] font-bold mt-3 text-gray-800">
            ${product?.attributes?.price}
          </h2>
          <button
            // onClick={() => {
            //   hundelAddToCart();
            // }}
            onClick={() => {
              hundelAddToCart();
            }}
            className=" flex gap-2 p-3 text-white bg-teal-500 rounded-lg hover:bg-teal-700 mt-7"
          >
            <ShoppingCart />
            Add To Cart
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
}

export default ProductInfo;
