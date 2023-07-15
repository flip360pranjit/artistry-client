import React, { useEffect, useState } from "react";
import { FaShareSquare } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Empty from "../../assets/images/success.png";
import UpdateSellerOrderModal from "../PopupModal/UpdateSellerOrderModal";
import { toast } from "react-toastify";

function Orders() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [search, setSearch] = useState("");
  const [sellerOrders, setSellerOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // Function to fetch seller artworks
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/seller-orders/${user._id}`
      );
      const fetchedOrders = response.data;
      const latestOrders = [...fetchedOrders].reverse();

      setSellerOrders(latestOrders);
    } catch (error) {
      // toast.error("Error! Try checking your connection.");
      // console.log(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    // Fetch seller artworks on component mount
    fetchOrders();
  }, []);

  const filteredOrders = sellerOrders.filter((order) => {
    return search.toLowerCase() === ""
      ? order
      : order.order.orderNo.toLowerCase().includes(search.toLowerCase()) ||
          order.customerName.toLowerCase().includes(search.toLowerCase()) ||
          order.orderDate.toLowerCase().includes(search.toLowerCase()) ||
          order.status.toLowerCase().includes(search.toLowerCase());
  });

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(10);

  const numberOfPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const lastIndex = currentPage * ordersPerPage;
  const firstIndex = lastIndex - ordersPerPage;
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  const orders = filteredOrders.slice(firstIndex, lastIndex);

  function handlePreviousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function handleNextPage() {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  function handlePageClick(n) {
    setCurrentPage(n);
  }

  function viewOrder(event, orderID) {
    event.preventDefault();
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/seller-orders/view-order/${orderID}`
      )
      .then((res) => {
        navigate("/view-seller-order", { state: { order: res.data } });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
        navigate("/");
      });
  }

  function openUpdate(event, order) {
    event.preventDefault();

    setIsOpen(true);
    setCurrentOrder(order);
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between px-6 gap-5">
        <div>
          <h1 className="text-xl font-poppins font-bold text-center md:text-left">
            Orders
          </h1>
          <p className="text-sm font-open-sans text-[#555555] text-center md:text-left">
            Manage and track your orders.
          </p>
        </div>
        {orders.length !== 0 && (
          <div className="flex gap-1 items-center">
            <label htmlFor="search" className="text-lg font-montserrat">
              Search:
            </label>
            <input
              type="search"
              name="search"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg h-7 text-poppins"
            />
          </div>
        )}
      </div>
      {orders.length === 0 ? (
        <div className="h-[90vh] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <img src={Empty} alt="Empty" className="w-2/3" />
            <h2 className="text-center text-3xl font-montserrat font-semibold mt-3">
              No orders! Be patient.
            </h2>
          </div>
        </div>
      ) : (
        <div className="font-montserrat mt-4 pb-5 shadow-2xl rounded-lg bg-white text-[10px]">
          <table className="w-full mt-1 text-center md:text-left">
            <thead className="bg-primary text-white mt-4">
              <tr>
                <th className="rounded-tl-lg p-3 pl-6">Order No</th>
                {windowWidth >= 768 && <th className="p-3">Customer Name</th>}
                {windowWidth >= 768 && <th className="p-3">Order Date</th>}
                <th className="p-3 text-center">Status</th>
                {windowWidth >= 768 && <th className="p-3">Total</th>}
                <th className="rounded-tr-lg p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, key) => (
                <tr key={key}>
                  <td className="px-2 py-1.5 pl-6">{order.order.orderNo}</td>
                  {windowWidth >= 768 && (
                    <td className="px-2 py-1.5">{order.customerName}</td>
                  )}
                  {windowWidth >= 768 && (
                    <td className="px-2 py-1.5">{order.orderedOn.date}</td>
                  )}
                  <td className="px-2 py-1.5">
                    <span
                      className={`text-white p-1 block text-center rounded-xl ${
                        order.deliveryStatus === "Delivered"
                          ? "bg-[#00c853]"
                          : order.deliveryStatus === "Shipped"
                          ? "bg-[#2196f3]"
                          : "bg-[#ff9800]"
                      }`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </td>
                  {windowWidth >= 768 && (
                    <td className="px-3 py-2 ">Rs. {order.totalAmount}</td>
                  )}
                  <td className="flex items-center gap-4 py-3 justify-center">
                    <h5
                      className="px-3 py-2 font-semibold text-primary flex items-center justify-center md:justify-start gap-2 cursor-pointer hover:gap-4"
                      onClick={(e) => viewOrder(e, order._id)}
                    >
                      <span className="underline"> View </span>
                      <FaShareSquare />
                    </h5>

                    <button
                      className="px-3 py-1 rounded-full font-semibold text-white bg-primary hover:bg-primary-hover"
                      onClick={(e) => openUpdate(e, order)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 flex items-center justify-around">
            <div className="flex items-center gap-2">
              <label
                htmlFor="perPage"
                className="font-semibold font-montserrat text-sm"
              >
                Show Orders:
              </label>
              <select
                name="perPage"
                id="perPage"
                value={ordersPerPage}
                onChange={(e) => setOrdersPerPage(e.target.value)}
                className="w-20 h-9 rounded-lg text-sm"
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
              </select>
            </div>
            <ul className="flex items-center justify-center gap-2">
              <li>
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1 ? true : false}
                  className={`p-2 bg-primary text-white rounded-l-lg hover:bg-primary-hover ${
                    currentPage === 1
                      ? "bg-gray-400"
                      : "bg-primary hover:bg-primary-hover"
                  }`}
                >
                  Previous
                </button>
              </li>
              {windowWidth >= 768 &&
                pageNumbers.map((n, i) => (
                  <li key={i}>
                    <button
                      onClick={() => {
                        handlePageClick(n);
                      }}
                      className={`py-2 px-4 hover:bg-primary hover:text-white ${
                        currentPage === n && "bg-primary-hover text-white"
                      }`}
                    >
                      {n}
                    </button>
                  </li>
                ))}
              <li>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === numberOfPages ? true : false}
                  className={`p-2 px-4 text-white rounded-r-lg ${
                    currentPage === numberOfPages
                      ? "bg-gray-400"
                      : "bg-primary hover:bg-primary-hover"
                  }`}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {isOpen && (
        <UpdateSellerOrderModal
          onClose={() => setIsOpen(false)}
          order={currentOrder}
          fetchOrders={fetchOrders}
        />
      )}
    </div>
  );
}

export default Orders;
