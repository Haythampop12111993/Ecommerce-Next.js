import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { use, useContext, useState } from "react";
import { cartContext } from "../_context/CartContext";
import { useUser } from "@clerk/nextjs";
import orderApis from "../_utils/order-Apis";
import cartApis from "../_utils/cart-Apis";

const CheckoutForm = ({ amount }: any) => {
  const { cart, setCart } = useContext(cartContext);
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [loding, setLoding] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const handleError = (error: any) => {
      //   const messageContainer = document.querySelector("#error-message");
      //   messageContainer.textContent = error.message;
      //   submitBtn.disabled = false;
      setLoding(false);
      setError(error.message);
    };
    // create order
    createOrder_();
    // send email
    sendEmail();
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch("api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    });
    const clientSecret = await res.json();
    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        // return_url: "https://example.com/order/123/complete",
        return_url: "http://localhost:3000/payment-confirm/",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
    }
  };
  const createOrder_ = () => {
    const productIds: any = [];
    cart.forEach((item: any) => {
      productIds.push(item?.product?.id);
    });
    const data = {
      data: {
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.firstName,
        amount,
        products: productIds,
      },
    };
    localStorage.setItem("data", JSON.stringify(data));
    orderApis.createOrder(data).then((res) => {
      if (res) {
        // setCart([]);
        cart.forEach((ele: any) => {
          cartApis.deleteUserCart(ele?.id).then((res) => {
            console.log(res);
          });
        });
      }
    });
    console.log(data);
  };

  // sendEmail
  const sendEmail = async () => {
    const res = await fetch("api/send-email", {
      method: "POST",
    });
    console.log(res);
  };
  return (
    <form className="md:w-[75%] m-auto" onSubmit={handleSubmit}>
      <div className="mx-32 md:mx[350px] mt-12">
        <PaymentElement />
        <button className="my-5 w-full bg-teal-400 p-2 rounded-md hover:bg-teal-600 text-white">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
