import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UseAuth from "../../../../Hooks/UseAuth";
import useAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import UseBooking from "../../../../Hooks/UseBooking";

const CheckOutFrom = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const { user } = UseAuth();
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const [booking, refetch] = UseBooking();
  const totalPrice = booking?.reduce((total, item) => total + item.totalPrice, 0);
  console.log(totalPrice)
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { TotalPrice: totalPrice })
        .then((res) => {
          console.log("Client Secret:", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.error("Error fetching client secret:", err));
    } else {
      console.error("Total price is invalid or zero:", totalPrice);
    }
  }, [axiosSecure, totalPrice]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (cardError) {
      setError(cardError.message);
      return;
    }
    setError("");

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user.email,
        TotalPrice: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: booking.map((item) => item._id),
        status: "pending",
      };
      const reserve = {
        Reservation:booking
      }

      const res = await axiosSecure.post("/payment", payment);
      refetch();
      axiosSecure.post('/reservation',reserve)
      if (res.data?.paymentResult?.insertedId) {
        toast.success("Payment Successful");
        navigate("/dashboard/paymentHistory");
      }
    }
  };

  return (
    <div className=" p-2">
      <div className="max-w-lg h-screen mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4">
        Complete Your Payment
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#08B3AB",
                  "::placeholder": { color: "#08B3AB" },
                },
                invalid: { color: "#e74c3c" },
              },
            }}
            className="p-2 border rounded bg-gray-200 dark:bg-gray-700"
          />
        </div>
        <button
          className="w-full py-2 px-4 text-white bg-[#08B3AB] rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition disabled:opacity-50"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay {totalPrice ? `$${totalPrice.toFixed(2)}` : ""}
        </button>
        {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
        {transactionId && (
          <p className="mt-3 text-[#08B3AB] text-sm">
            Payment successful! Transaction ID: <strong>{transactionId}</strong>
          </p>
        )}
      </form>
    </div>
    </div>
  );
};

export default CheckOutFrom;
