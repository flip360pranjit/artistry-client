import React, { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { addUser } from "../../store/slices/AuthSlice";
import Empty from "../../assets/images/success.png";
import EmptyWebp from "../../assets/images/success.webp";
import { MdClose } from "react-icons/md";
import PopupModal from "../PopupModal/PopupModal";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { isWebpSupported } from "react-image-webp/dist/utils";

function CommissionedOrders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [fLoading, setFLoading] = useState(false);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aLoading, setALoading] = useState(false);
  const [rLoading, setRLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopop] = useState({
    type: "",
    orderId: null,
  });

  // Function to fetch seller artworks
  const fetchOrders = async () => {
    setFLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/commissioned/seller/${
          user._id
        }`
      );
      setFLoading(false);
      const fetchedOrders = response.data;
      const commissionedOrders = [...fetchedOrders].reverse();
      setOrders(commissionedOrders);
    } catch (error) {
      setFLoading(false);
      toast.error("Error! Try checking your connection.");
      // console.log(error);
    }
  };

  useEffect(() => {
    // Fetch seller artworks on component mount
    fetchOrders();
  }, []);

  async function handleAcceptClick(event) {
    event.preventDefault();
    setLoading(true);

    try {
      await axios
        .put(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/users/accept-commisioned-work/${user._id}`
        )
        .then((res) => {
          dispatch(addUser(res.data));

          toast.success("Congrats! You have now started commissioned works.");
          setLoading(false);
        });
    } catch (err) {
      // console.log(err);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  }

  function handleAcceptButton(event, orderId) {
    event.preventDefault();

    setPopop({ type: "Accept", orderId });
    setIsOpen(true);
  }
  function handleRejectButton(event, orderId) {
    event.preventDefault();

    setPopop({ type: "Reject", orderId });
    setIsOpen(true);
  }

  async function handleAccept(event, orderId) {
    event.preventDefault();
    setIsOpen(false);
    setALoading(true);

    try {
      await axios
        .put(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/commissioned/accept/${orderId}`
        )
        .then((res) => {
          setALoading(false);
          fetchOrders();
          toast.success("Request accepted!");
        });
    } catch (err) {
      setALoading(false);
      // console.log(err);
      toast.error(err.response.data.error);
    }
  }

  async function handleReject(event, orderId) {
    event.preventDefault();
    setIsOpen(false);
    setRLoading(true);

    try {
      await axios
        .put(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/commissioned/reject/${orderId}`
        )
        .then((res) => {
          setRLoading(false);
          toast.info("Request rejected!");
        });
    } catch (err) {
      setRLoading(false);
      // console.log(err);
      toast.error(err.response.data.error);
    }
  }

  return (
    <div className="px-6">
      {loading || aLoading || rLoading ? (
        <div className="h-[90vh] flex items-center justify-center">
          <div className="flex-flex-col-items-center">
            <LoadingAnimation />
            <h2 className="font-poppins text-xl mt-5">Please Wait ...</h2>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-xl font-poppins font-bold text-center md:text-left">
              Commissioned Requests
            </h1>
            <p className="text-sm font-open-sans text-[#555555] text-center md:text-left">
              Accept and Reject commissioned requests.
            </p>
          </div>

          {user.acceptCommisionedOrder ? (
            fLoading ? (
              <div className="h-[80vh] flex justify-center items-center">
                <LoadingAnimation />
              </div>
            ) : orders.length === 0 ? (
              <div className="h-[90vh] flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <img
                    src={isWebpSupported() ? EmptyWebp : Empty}
                    alt="Empty"
                    className="w-2/3"
                  />
                  <h2 className="text-center text-3xl font-montserrat font-semibold mt-3">
                    No orders! Be patient.
                  </h2>
                </div>
              </div>
            ) : (
              <div className="font-poppins mt-7">
                <div className="grid grid-cols-5 text-center">
                  <h2 className="text-xl">Full Name</h2>
                  <h2 className="text-xl">Desired Date</h2>
                  <h2 className="text-xl col-span-2">Status</h2>
                  <h2 className="text-xl">View Order</h2>
                </div>

                <div className="mt-5">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="grid grid-cols-5 text-center bg-white p-5 rounded-xl mt-3"
                    >
                      <h2 className="">{order.fullName}</h2>
                      <h2 className="">{order.desiredCompletionDate}</h2>
                      <h2 className="col-span-2 flex gap-2 justify-center items-center">
                        {order.status === "Accepted" ? (
                          <span className="bg-blue-500 text-white py-1 px-4 rounded-2xl">
                            Accepted
                          </span>
                        ) : order.status === "rejected" ? (
                          <span className="bg-red-500 text-white py-1 px-4 rounded-2xl">
                            Rejected
                          </span>
                        ) : (
                          <>
                            {" "}
                            <button
                              disabled={aLoading || rLoading}
                              onClick={(e) => handleAcceptButton(e, order._id)}
                              className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-2xl flex items-center"
                            >
                              {aLoading ? (
                                "Loading..."
                              ) : (
                                <>
                                  <FiCheck />
                                  Accept
                                </>
                              )}
                            </button>
                            <button
                              disabled={aLoading || rLoading}
                              onClick={(e) => handleRejectButton(e, order._id)}
                              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-2xl flex items-center"
                            >
                              {rLoading ? (
                                "Loading..."
                              ) : (
                                <>
                                  <MdClose />
                                  Reject
                                </>
                              )}
                            </button>
                          </>
                        )}
                      </h2>
                      <h2
                        onClick={() =>
                          navigate("/dashboard/view-commissioned-order", {
                            state: { order },
                          })
                        }
                        className="underline text-primary cursor-pointer"
                      >
                        View
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="font-poppins mt-10 bg-white p-10 flex flex-col items-center rounded-xl shadow-xl">
              <h3 className="text-xl">Start accepting commissioned works:</h3>
              <button
                disabled={loading}
                onClick={handleAcceptClick}
                className="mt-5 py-2 px-10 rounded-full cursor-pointer text-lg text-white bg-primary hover:bg-primary-hover"
              >
                {loading ? "Loading..." : "Start Accepting"}
              </button>
            </div>
          )}
          {isOpen && (
            <PopupModal
              onClose={() => setIsOpen(false)}
              orderId={popup.orderId}
              type={popup.type}
              title={
                popup.type === "Accept"
                  ? "Accept Commissioned Work?"
                  : "Reject Commissioned Work?"
              }
              content={
                popup.type === "Accept"
                  ? "Make sure to contact the client after accepting."
                  : "Are you sure you want to reject the commissioned work?"
              }
              onClick={popup.type === "Accept" ? handleAccept : handleReject}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CommissionedOrders;
