import {
  RiDashboard2Line,
  RiFileList3Fill,
  RiShoppingBasketLine,
  RiBarChart2Line,
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
    icon: <RiShoppingBasketLine />,
    title: "Wishlist",
    link: "/profile/wishlist",
  },
  {
    icon: <RiBarChart2Line />,
    title: "Account",
    link: "/profile/account",
  },
];

export default ProfileSidebarLinks;
