import {
  RiDashboard2Line,
  RiFileList3Fill,
  RiShoppingBasketLine,
  RiBarChart2Line,
  RiShoppingBagFill,
} from "react-icons/ri";
const ProfileSidebarLinks = [
  {
    icon: <RiDashboard2Line />,
    title: "Overview",
    link: "/profile",
  },
  {
    icon: <RiFileList3Fill />,
    title: "Orders",
    link: "/profile/orders",
  },
  {
    icon: <RiShoppingBagFill />,
    title: "Cart",
    link: "/cart",
  },
  {
    icon: <RiShoppingBasketLine />,
    title: "Wishlist",
    link: "/wishlist",
  },
  {
    icon: <RiBarChart2Line />,
    title: "Account",
    link: "/profile/account",
  },
];

export default ProfileSidebarLinks;
