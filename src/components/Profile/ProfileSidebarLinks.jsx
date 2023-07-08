import {
  RiDashboard2Line,
  RiFileList3Fill,
  RiShoppingBasketLine,
  RiShoppingBagFill,
} from "react-icons/ri";
const ProfileSidebarLinks = [
  {
    icon: <RiDashboard2Line />,
    title: "Account",
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
];

export default ProfileSidebarLinks;
