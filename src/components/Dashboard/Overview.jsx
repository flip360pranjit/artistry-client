import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { RiFileList3Line, RiShoppingCart2Line } from "react-icons/ri";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import sellerListings from "../../api/sellerListings.json";
import sellerOrders from "../../api/sellerOrders.json";
import viewOrder from "./ViewOrder";
import { Link } from "react-router-dom";

function Overview() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  // Get Data for Bar Chart
  function getBarData(data) {
    const categoryMap = new Map();

    // Calculate the sum of prices for each category
    data.forEach((item) => {
      const { category, price } = item;
      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category) + price);
      } else {
        categoryMap.set(category, price);
      }
    });

    // Convert the map to an array of objects
    const result = Array.from(categoryMap, ([id, value]) => ({
      id,
      value,
    }));

    return result;
  }

  return (
    <div>
      <div className="ml-2 mb-5">
        <h1 className="text-3xl font-poppins font-bold text-center md:text-left">
          Dashboard
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
              <h1 className="font-montserrat font-semibold text-xl ml-1">47</h1>
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
              <h1 className="font-montserrat font-semibold text-xl ml-1">17</h1>
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
                320000
              </h1>
            </div>
          </div>
        </div>
      </IconContext.Provider>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="col-span-2 h-[60vh] bg-white p-3 pl-5 rounded-lg shadow-lg">
          <ResponsiveBar
            data={getBarData(sellerListings)}
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
              data={getBarData(sellerListings)}
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
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
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
                    Order ID:{" "}
                    <span className="text-primary underline cursor-pointer">
                      {order._id}
                    </span>
                  </p>
                  <p
                    className={`text-white px-2 py-1 rounded-2xl ${
                      order.status === "Delivered"
                        ? "bg-[#00c853]"
                        : order.status === "Shipped"
                        ? "bg-[#2196f3]"
                        : "bg-[#ff9800]"
                    }`}
                  >
                    {order.status}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
