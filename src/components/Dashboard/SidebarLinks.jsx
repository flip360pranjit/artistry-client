import { FaPaintBrush } from "react-icons/fa";
import {
  RiDashboard2Line,
  RiFileList3Fill,
  RiShoppingBasketLine,
  RiBarChart2Line,
} from "react-icons/ri";

const SidebarLinks = [
  {
    icon: <RiDashboard2Line />,
    title: "Overview",
    link: "/dashboard",
  },
  {
    icon: <RiFileList3Fill />,
    title: "Listings",
    link: "/dashboard/listings",
  },
  {
    icon: <RiShoppingBasketLine />,
    title: "Orders",
    link: "/dashboard/orders",
  },
  {
    icon: <FaPaintBrush />,
    title: "Commissioned Requests",
    link: "/dashboard/commissioned-orders",
  },
  {
    icon: <RiBarChart2Line />,
    title: "Analytics",
    link: "/dashboard/analytics",
  },
];

export default SidebarLinks;
