import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import UseReservation from "../../../Hooks/UseReservation";

const YourReservation = () => {
  const [reservationData, refetch] = UseReservation(); // Fetch reservation data
  const AxiosSecure = useAxiosSecure();

  const reservations = reservationData?.flatMap((item) => item.reserve) || [];

  
  return (
    <div>
      <Helmet>
        <title>Traveling | Your Reservation</title>
      </Helmet>
      <div className="p-5">
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table-auto w-full ">
            <thead className="text-lg border bg-[#08B3AB] text-white">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Guest Name</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Reservation Details</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length > 0 ? (
                reservations.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-3 px-4 text-center">{index + 1}</td>
                    <td className="py-3 px-4">
                      <img
                        src={item.image}
                        alt="Location"
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    </td>
                    <td className="py-3 px-4 text-center uppercase font-medium">
                      {item.guestName}
                    </td>
                    <td className="py-3 px-4 text-center">{item.location}</td>
                    <td className="py-3 px-4 text-center">{item.email}</td>
                    <td className="py-3 px-4 text-center">
                      <p>
                        <span className="font-semibold">Date:</span> {item.date}
                      </p>
                      <p>
                        <span className="font-semibold">Guests:</span> {item.guest}
                      </p>
                      <p>
                        <span className="font-semibold">Total Price:</span> ${item.totalPrice}
                      </p>
                      <p>
                        <span className="font-semibold">Service Charge:</span> ${item.serviceCharge}
                      </p>
                    </td>
                  
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-5 text-center text-gray-500">
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default YourReservation;
