import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { RiFileList3Line, RiShoppingCart2Line } from "react-icons/ri";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import Empty from "../../assets/images/success.png";
import EmptyWebp from "../../assets/images/success.webp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { isWebpSupported } from "react-image-webp/dist/utils";

function Overview() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sellerOrders, setSellerOrders] = useState([]);
  const [sellerListings, setSellerListings] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle resize
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
        // console.log(error);
        toast.error("Something went wrong!");
      }
    };

    // Fetch seller artworks on component mount
    fetchOrders();
  }, []);

  useEffect(() => {
    // Function to fetch seller artworks
    const fetchsellerListings = async () => {
      try {
        const sellerId = user._id; // Replace with the actual seller ID
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/artworks/seller-artworks/${sellerId}`
        );
        const artworks = response.data;
        setSellerListings(artworks);
      } catch (error) {
        // console.log(error);
        toast.error("Something went wrong!");
      }
    };

    // Fetch seller artworks on component mount
    fetchsellerListings();
  }, []);

  function calculateTotalEarnings(orders) {
    // Iterate over each order and sum the total amount
    const totalAmounts = orders.map((order) => order.totalAmount);
    const totalEarnings = totalAmounts.reduce(
      (accumulator, amount) => accumulator + amount,
      0
    );

    return totalEarnings;
  }

  // Get Data for Bar Chart
  function getBarData(data) {
    const categoryMap = new Map();

    // Calculate the sum of prices for each category
    data.forEach((item) => {
      item.products.forEach((product) => {
        const { category, price } = product.product;
        const quantity = product.quantity;
        if (categoryMap.has(category)) {
          categoryMap.set(
            category,
            categoryMap.get(category) + price * quantity
          );
        } else {
          categoryMap.set(category, price * quantity);
        }
      });
      // if (categoryMap.has(category)) {
      //   categoryMap.set(category, categoryMap.get(category) + price);
      // } else {
      //   categoryMap.set(category, price);
      // }
    });

    // Convert the map to an array of objects
    const result = Array.from(categoryMap, ([id, value]) => ({
      id,
      value,
    }));

    return result;
  }

  function viewOrder(event, orderID) {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/get-order`, {
        orderID,
      })
      .then((res) => {
        dispatch(setOrder(res));
        navigate("/view-order");
      })
      .catch((err) => toast.error("Oops, something went wrong!"));
  }

  return (
    <div>
      <div className="ml-2 mb-5">
        <h1 className="text-3xl font-poppins font-bold text-center md:text-left">
          Overview
        </h1>
      </div>
      <IconContext.Provider value={{ size: "1.2rem" }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center justify-around gap-5 bg-white rounded-lg shadow-lg py-7">
            <div className="bg-[#aee2ff] p-4 rounded-full">
              <RiShoppingCart2Line />
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-poppins text-sm text-[#555555]">
                Total Orders
              </h5>
              <h1 className="font-montserrat font-semibold text-xl ml-1">
                {sellerOrders.length}
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-around gap-5 bg-white rounded-lg shadow-lg py-7">
            <div className="bg-[#fea1a1] p-4 rounded-full">
              <RiFileList3Line />
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-poppins text-sm text-[#555555]">
                Active Listings
              </h5>
              <h1 className="font-montserrat font-semibold text-xl ml-1">
                {sellerListings.length}
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-around gap-5 bg-white rounded-lg shadow-lg py-7">
            <div className="bg-[#ddffbb] p-4 rounded-full">
              <HiOutlineCurrencyRupee />
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-poppins text-sm text-[#555555]">
                Total Earnings
              </h5>
              <h1 className="font-montserrat font-semibold text-xl ml-1">
                {calculateTotalEarnings(sellerOrders)}
              </h1>
            </div>
          </div>
        </div>
      </IconContext.Provider>
      {sellerOrders.length === 0 ? (
        <div className="h-[70vh] flex items-center justify-center">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="col-span-2 h-[60vh] bg-white p-3 pl-5 rounded-lg shadow-lg">
            <ResponsiveBar
              data={getBarData(sellerOrders)}
              layout={windowWidth >= 768 ? "vertical" : "horizontal"}
              keys={["value"]}
              indexBy="id"
              margin={{
                top: 50,
                bottom: 50,
                left: windowWidth >= 768 ? 50 : 70,
                right: windowWidth >= 768 ? 50 : 10,
              }}
              padding={0.3}
              colors="#3c166d"
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                legend: "Total",
                legendPosition: "middle",
                legendOffset: windowWidth >= 768 ? -45 : -60,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor="#ffffff"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
            <h2 className="relative -top-5 text-lg text-center font-playfair-display font-semibold">
              Revenue by Art Category
            </h2>
          </div>
          <div className="flex flex-col gap-4 relative left-3 lg:left-0">
            <div className="relative row-span-2 bg-white rounded-lg shadow-lg min-h-[30vh]">
              <ResponsivePie
                data={getBarData(sellerOrders)}
                colors={[
                  "#4a7ebb",
                  "#83c167",
                  "#f9b64e",
                  "#d386ac",
                  "#ffa500",
                  "#8f5f9a",
                  "#ff6666",
                ]}
                enableArcLabels={false}
                margin={{
                  right: 90,
                  left: 90,
                  bottom: windowWidth >= 1024 ? 10 : 50,
                  top: windowWidth >= 1024 ? 0 : 50,
                }}
                innerRadius={0.5}
                padAngle={0.7}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                  from: "color",
                  modifiers: [["darker", 2]],
                }}
                animate={true}
              />
              <h2 className="absolute bottom-0 w-full text-sm text-center font-playfair-display font-semibold">
                Revenue by Art Category
              </h2>
            </div>
            <div className="relative bg-white p-2 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-center font-playfair-display font-semibold">
                  Recent Orders
                </h2>
                <Link to="/dashboard/orders">
                  <p className="text-xs text-primary underline">View All</p>
                </Link>
              </div>
              <ul>
                {sellerOrders.slice(0, 3).map((order) => (
                  <li
                    key={order._id}
                    className="flex items-center justify-between text-xs mt-2"
                  >
                    <p
                      className="font-semibold hover:scale-105"
                      onClick={(e) => viewOrder(e, order._id)}
                    >
                      {/* Order ID:{" "} */}
                      <span className="text-primary underline cursor-pointer">
                        {order.order.orderNo}
                      </span>
                    </p>
                    <p
                      className={`text-white px-2 py-1 rounded-2xl ${
                        order.deliveryStatus === "Delivered"
                          ? "bg-[#00c853]"
                          : order.status === "Shipped"
                          ? "bg-[#2196f3]"
                          : "bg-[#ff9800]"
                      }`}
                    >
                      {order.deliveryStatus}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Overview;
