"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../_components/CheckoutForm";
import { useSearchParams } from "next/navigation";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);
function Checkout() {
  const searchParams = useSearchParams();
  const options = {
    // clientSecret: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    mode: "payment",
    currency: "usd",
    amount: Number(searchParams.get("amount")),
  };
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={Number(searchParams.get("amount"))} />
      </Elements>
    </div>
  );
}

export default Checkout;
