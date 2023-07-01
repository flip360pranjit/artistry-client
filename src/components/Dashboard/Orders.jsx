import React, { useEffect, useState } from "react";
import sellerOrders from "../../api/sellerOrders";
import { FaShareSquare } from "react-icons/fa";
import axios from "axios";
import { setOrder } from "../../store/slices/OrderSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Orders() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [search, setSearch] = useState("");
  const [sellerOrders, setSellerOrders] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
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
        console.log(error);
      }
    };

    // Fetch seller artworks on component mount
    fetchOrders();
  }, []);

  const filteredOrders = sellerOrders.filter((order) => {
    return search.toLowerCase() === ""
      ? order
      : order._id.toLowerCase().includes(search.toLowerCase()) ||
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
      .catch((err) => console.log(error));
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
      </div>
      <div className="font-montserrat mt-4 pb-5 shadow-2xl rounded-lg bg-white text-[10px]">
        <table className="w-full mt-1 text-center md:text-left">
          <thead className="bg-primary text-white mt-4">
            <tr>
              <th className="rounded-tl-lg p-3 pl-6">Order ID</th>
              {windowWidth >= 768 && <th className="p-3">Customer Name</th>}
              {windowWidth >= 768 && <th className="p-3">Order Date</th>}
              <th className="p-3">Status</th>
              {windowWidth >= 768 && <th className="p-3">Total</th>}
              <th className="rounded-tr-lg p-3">View Order</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, key) => (
              <tr key={key}>
                <td className="px-2 py-1.5 pl-6">{order._id}</td>
                {windowWidth >= 768 && (
                  <td className="px-2 py-1.5">{order.customerName}</td>
                )}
                {windowWidth >= 768 && (
                  <td className="px-2 py-1.5">{order.orderDate}</td>
                )}
                <td className="px-2 py-1.5">
                  <span
                    className={`text-white p-1 block text-center rounded-xl ${
                      order.status === "Delivered"
                        ? "bg-[#00c853]"
                        : order.status === "Shipped"
                        ? "bg-[#2196f3]"
                        : "bg-[#ff9800]"
                    }`}
                  >
                    {order.deliveryStatus}
                  </span>
                </td>
                {windowWidth >= 768 && (
                  <td className="px-3 py-2 ">Rs. {order.total}</td>
                )}
                <td
                  className="px-3 py-2 font-semibold text-primary flex items-center justify-center md:justify-start gap-2 cursor-pointer hover:gap-4"
                  onClick={(e) => viewOrder(e, order._id)}
                >
                  <span className="underline"> View </span>
                  <FaShareSquare />
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
    </div>
  );
}

export default Orders;
