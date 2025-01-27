import toast from "react-hot-toast";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseBooking from "../../../Hooks/UseBooking";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const yourReservation = () => {
  const [booking, refetch] = UseBooking();
  const totalPrices = booking?.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
  console.log(totalPrices);
  const AxiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosSecure.delete(`/booking/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            toast.success("contest deleted successfully");
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="">
        <Helmet>
            <title>Traveling | Your Reservation</title>
        </Helmet>
      <div className="text-center">
        <div className="md:flex md:justify-between md:items-center space-y-3 md:space-y-0 ">
          <p className="text-xl lg:text-3xl font-semibold uppercase">
            Your bookings:{" "}
            <span className="text-[#08B3AB]">{booking?.length}</span>{" "}
          </p>
          <p className="text-xl lg:text-3xl font-semibold uppercase">
            Total Price : <span className="text-[#08B3AB]">${totalPrices}</span>
          </p>
          <div className="uppercase flex justify-center items-center gap-3">
            <p className="text-xl  lg:text-3xl font-semibold">Confirm:</p>
            {booking?.length ? (
              <Link to="/dashboard/payment">
                <button
                  className="btn text-xl
            bg-[#08B3AB] text-white uppercase"
                >
                  Pay
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="btn text-xl
        btn-secondary uppercase"
              >
                Pay
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto mt-5">
          <table className="table md:w-full    ">
            {/* head */}
            <thead className="text-lg border bg-[#08B3AB] text-white">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Place location</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {booking?.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="uppercase">{item?.guestName}</p>
                  </td>
                  <td>
                    <p>{item?.location}</p>
                  </td>
                  <td>{item?.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      className="btn"
                    >
                      <FaTrash className="text-xl text-[#08B3AB]"></FaTrash>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default yourReservation;
