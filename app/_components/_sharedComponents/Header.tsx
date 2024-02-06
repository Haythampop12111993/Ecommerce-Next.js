"use client";
import { cartContext } from "@/app/_context/CartContext";
import cartApis from "@/app/_utils/cart-Apis";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Cart from "../Cart";

function header() {
  const [isLogin, setisLogin] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { user } = useUser();
  const { cart, setCart } = useContext(cartContext);
  useEffect(() => {
    user && getUserCart();
  }, [user]);
  const getUserCart = async () => {
    cartApis
      .getUserCart(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        // setCart(res.data.data);
        console.log("log : ", res.data.data);
        res.data.data.forEach((item) => {
          setCart((oldCart) => [
            ...oldCart,
            {
              id: item.id,
              product: item?.attributes?.products?.data[0],
            },
          ]);
        });
      });
  };
  useEffect(() => {
    setisLogin(window.location.href.toString().includes("sign-in"));
  }, []);
  return (
    !isLogin && (
      <>
        <header className="bg-white shadow-md">
          <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 ">
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
            <div className="flex flex-1 items-center justify-end md:justify-between">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      {" "}
                      Home{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      {" "}
                      Explore{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      {" "}
                      Projects{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      {" "}
                      About Us{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      {" "}
                      Contact Us{" "}
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                {!user ? (
                  <div className="sm:flex sm:gap-4">
                    <a
                      className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                      href="/sign-in"
                    >
                      Login
                    </a>

                    <a
                      className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                      href="/"
                    >
                      Register
                    </a>
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-5">
                    <h2
                      onClick={() => setOpenCart(!openCart)}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingCart /> ({cart?.length})
                    </h2>
                    <UserButton afterSignOutUrl="/" />
                    {openCart && <Cart />}
                  </div>
                )}

                <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                  <span className="sr-only">Toggle menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  );
}

export default header;
