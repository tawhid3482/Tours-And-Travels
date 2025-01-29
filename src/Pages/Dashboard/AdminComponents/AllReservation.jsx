import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseReservation from "../../../Hooks/UseReservation";
import { useQuery } from "@tanstack/react-query";

const AllReservation = () => {
  const AxiosSecure = useAxiosSecure();
  // const [reservationData, refetch] = UseReservation();

  const { data: reservationData, refetch } = useQuery({
    queryKey: ["reservation"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/reservation");
      return res.data;
    },
  });

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
        AxiosSecure.delete(`/reservation/${id}`)
          .then((res) => {
            if (res.data?.deletedCount > 0) {
              refetch(); // Refetch data after successful delete
              Swal.fire(
                "Deleted!",
                "Your reservation has been deleted.",
                "success"
              );
            } else {
              Swal.fire("Error!", "Failed to delete the reservation.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting reservation:", error);
            toast.error("Failed to delete reservation!");
          });
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-medium">
        Total All Reservations: {reservationData?.length}
      </h1>
      <div className="p-5">
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table-auto w-full">
            <thead className="text-lg border bg-[#08B3AB] text-white">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Guest Email</th>
                <th className="py-3 px-4">Reservations</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservationData?.length > 0 ? (
                reservationData?.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-3 px-4 text-center">{index + 1}</td>
                    <td className="py-3 px-4 text-center">{item.email}</td>
                    <td className="py-3 px-4">
                      {item.reserve.map((res, idx) => (
                        <div key={res._id} className="mb-4">
                          <p>
                            <span className="font-semibold">Guest:</span>{" "}
                            {res.guestName}
                          </p>
                          <p>
                            <span className="font-semibold">Location:</span>{" "}
                            {res.location}
                          </p>
                          <p>
                            <span className="font-semibold">Date:</span>{" "}
                            {res.date}
                          </p>
                          <p>
                            <span className="font-semibold">Total Price:</span>{" "}
                            ${res.totalPrice}
                          </p>
                          <hr className="my-2" />
                        </div>
                      ))}
                    </td>
                    <td className="py-3  text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn bg-red-500 text-white hover:bg-red-600 rounded-md p-2 flex items-center gap-2"
                        title="Delete Reservation"
                      >
                        <FaTrash className="text-lg" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-5 text-center text-gray-500">
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

export default AllReservation;
