import Swal from "sweetalert2";
import { CiDeliveryTruck } from "react-icons/ci";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseReservation from "../../../Hooks/UseReservation";

const AllReservation = () => {
  const AxiosSecure = useAxiosSecure();
const [reserve]=UseReservation()
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
        AxiosSecure.delete(`/reservation/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your order has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleConfirmed = (id) => {
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
        AxiosSecure.patch(`/order/${id}`, {
          isOrderConfirmed: true,
          isDelivered: true,
        }).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success("Delivery Confirmed");
          }
        });
      }
    });
  };

  const confirmedOrders = reserve?.filter((item) => item.isOrderConfirmed);
  const unconfirmedOrders = reserve?.filter(
    (item) => !item.isOrderConfirmed
  );

  return (
    <div>
      <h1 className="text-2xl font-medium">
        Total All Orders: {orderData?.length}
      </h1>
      {/* Confirmed Orders Section */}
      <div>
        <h2 className="text-xl font-semibold my-4">Confirmed Orders</h2>
        <div className="overflow-x-auto my-5">
          <table className="table">
            <thead>
              <tr className="text-lg">
                <th># No</th>
                <th>Email</th>
                <th>Order Items</th>
                <th>Total</th>
                <th>Pay Mod</th>
                <th>Delivery Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {confirmedOrders?.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}.</th>
                  <td>{item.email}</td>
                  <td>
                    <ul>
                      {item?.cart?.map((cartItem) => (
                        <li key={cartItem._id} className="mb-2">
                          <div className="flex items-center gap-2 border p-1 rounded-lg w-60">
                            <img
                              src={cartItem.img}
                              alt={cartItem.name}
                              className="h-12 w-12 rounded"
                            />
                            <span>{cartItem.name}</span>
                            <span>
                              ({cartItem.count} {cartItem.unit_of_measure})
                            </span>
                            <span>${cartItem.price}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>${item.total[0]}</td>
                  <td>{item.bank_name ? "Bank" : item.paymentMethod}</td>
                  <td>
                    <div className="font-bold uppercase">
                      <div className="relative h-12 w-full flex items-center overflow-hidden">
                        <div className="flex items-center text-4xl">
                          <CiDeliveryTruck />
                        </div>
                        <span className="ml-4">
                          {item.isDelivered ? (
                            <>{item.isDelivered}</>
                          ) : (
                            <>Pending</>
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm bg-[#019267] text-white flex items-center gap-1"
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unconfirmed Orders Section */}
      <div>
        <h2 className="text-xl font-semibold my-4">Pending Orders</h2>
        <div className="overflow-x-auto my-5">
          <table className="table">
            <thead>
              <tr className="text-lg">
                <th># No</th>
                <th>Email</th>
                <th>Order Items</th>
                <th>Total</th>
                <th>Pay Mod</th>
                <th>Delivery Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {unconfirmedOrders?.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}.</th>
                  <td>{item.email}</td>
                  <td>
                    <ul>
                      {item?.cart?.map((cartItem) => (
                        <li key={cartItem._id} className="mb-2">
                          <div className="flex items-center gap-2 border p-1 rounded-lg w-60">
                            <img
                              src={cartItem.img}
                              alt={cartItem.name}
                              className="h-12 w-12 rounded"
                            />
                            <span>{cartItem.name}</span>
                            <span>
                              ({cartItem.count} {cartItem.unit_of_measure})
                            </span>
                            <span>${cartItem.price}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>${item.total[0]}</td>
                  <td>{item.bank_name ? "Bank" : item.paymentMethod}</td>
                  <td>
                    <div className="font-bold uppercase">
                      <div className="relative h-12 w-full flex items-center overflow-hidden">
                        <div className="flex items-center text-4xl">
                          <CiDeliveryTruck />
                        </div>
                        <span className="ml-4">Pending</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Link to={"/payment"}>
                      <button className="btn btn-sm bg-[#019267] text-white flex items-center gap-1">
                        Pay
                      </button>
                    </Link>
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

export default AllReservation;
