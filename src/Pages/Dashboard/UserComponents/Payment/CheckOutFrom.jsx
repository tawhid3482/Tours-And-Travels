import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UseAuth from "../../../../Hooks/UseAuth";
import useAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import UseBooking from "../../../../Hooks/UseBooking";

const CheckOutForm = () => {
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const { user } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [booking, refetch] = UseBooking();

  const TotalPrice =
    booking?.reduce((total, item) => total + item.totalPrice, 0) || 0;

  useEffect(() => {
    if (TotalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { TotalPrice })
        .then((res) => {
          if (res.data?.clientSecret) {
            setClientSecret(res.data.clientSecret);
          } else {
            toast.error("Failed to fetch client secret");
          }
        })
        .catch((err) => {
          toast.error("An error occurred while preparing payment.");
        });
    }
  }, [axiosSecure, TotalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      toast.error(
        "Stripe is not properly initialized or client secret is missing"
      );
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card details are missing");
      return;
    }

    try {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent?.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        toast.success("Payment Successful!");

        const paymentData = {
          email: user.email,
          TotalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          bookingIds: booking.map((item) => item._id),
          status: "success",
        };
        const bookingUpdate = {
          status: "Confirmed",
        };
        const reserve = {
          email: user.email,
          reserve: booking,
        };

        await axiosSecure.post("/payment", paymentData);
        refetch();
        axiosSecure.delete(`/booking/${user.email}`);
        axiosSecure.post("/reservation", reserve);
        navigate("/dashboard/paymentHistory");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-2">
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
            Pay {TotalPrice ? `$${TotalPrice.toFixed(2)}` : ""}
          </button>

          {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
          {transactionId && (
            <p className="mt-3 text-[#08B3AB] text-sm">
              Payment successful! Transaction ID:{" "}
              <strong>{transactionId}</strong>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckOutForm;
