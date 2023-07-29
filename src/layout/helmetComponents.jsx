import Head from "./Head";

const helmetComponents = [
  {
    route: "/",
    title: "Home",
    description: "Discover and explore amazing artworks on Artistry.",
  },
  {
    route: "/about",
    title: "About",
    description:
      "Learn more about Artistry - the leading platform for artists and art enthusiasts.",
  },
  {
    route: "/careers",
    title: "Careers",
    description: "Join our team and help shape the future of Artistry.",
  },
  {
    route: "/contact",
    title: "Contact Us",
    description:
      "Get in touch with the Artistry team for any inquiries or feedback.",
  },
  {
    route: "*",
    title: "Error",
    description: "Oops! Something went wrong on Artistry.",
  },
  {
    route: "/auth",
    title: "Authenticate",
    description: "Sign in or create an account on Artistry.",
  },
  {
    route: "/forgot-password",
    title: "Forgot Password",
    description: "Recover your password on Artistry.",
  },
  {
    route: "/view-artwork",
    title: "View Artwork",
    description: "Explore and admire breathtaking artworks on Artistry.",
  },
  {
    route: "/sell-art/how-to-sell",
    title: "How to Sell",
    description:
      "Learn how to sell your artwork on Artistry and reach a global audience.",
  },
  {
    route: "/sell-art/become-a-seller",
    title: "Become a Seller",
    description:
      "Join Artistry as a seller and start showcasing and selling your artwork.",
  },
  {
    route: "/browse",
    title: "Browse",
    description:
      "Browse and discover a wide range of stunning artworks on Artistry.",
  },
  {
    route: "/artwork/reviews",
    title: "Artwork Reviews",
    description:
      "Read reviews and feedback from customers about artwork on Artistry.",
  },
  {
    route: "/wishlist",
    title: "Wishlist",
    description: "View and manage your wishlist on Artistry.",
  },
  {
    route: "/cart",
    title: "Cart",
    description: "View and manage your shopping cart on Artistry.",
  },
  {
    route: "/checkout",
    title: "Checkout",
    description: "Complete your order and checkout on Artistry.",
  },
  {
    route: "/checkout/review",
    title: "Review Order",
    description:
      "Review your order details before finalizing the checkout on Artistry.",
  },
  {
    route: "/checkout/shipping",
    title: "Shipping",
    description:
      "Provide your shipping details during the checkout process on Artistry.",
  },
  {
    route: "/checkout/payment",
    title: "Payment",
    description:
      "Select a payment method and complete the payment on Artistry.",
  },
  {
    route: "/profile",
    title: "Profile",
    description: "Manage your profile and settings on Artistry.",
  },
  {
    route: "/profile/orders",
    title: "Orders",
    description: "View and track your orders on Artistry.",
  },
  {
    route: "/dashboard",
    title: "Dashboard",
    description: "Manage your dashboard and track your sales on Artistry.",
  },
  {
    route: "/dashboard/listings",
    title: "Listings",
    description: "Manage your artwork listings on Artistry.",
  },
  {
    route: "/dashboard/commissioned-orders",
    title: "Commissioned Orders",
    description: "Manage your commissioned orders on Artistry.",
  },
  {
    route: "/dashboard/orders",
    title: "Orders",
    description: "View and track your orders on Artistry.",
  },
  {
    route: "/dashboard/orders/view-seller-order",
    title: "Order",
    description: "View customer order.",
  },
  {
    route: "/dashboard/analytics",
    title: "Analytics",
    description: "Analyze your sales and performance metrics on Artistry.",
  },
  {
    route: "/dashboard/add-artwork",
    title: "Add Artwork",
    description: "Add and list your artwork on Artistry.",
  },
  {
    route: "/commissioned-orders/custom-artwork-process",
    title: "Custom Artwork Process",
    description:
      "Learn about the process of commissioning custom artwork on Artistry.",
  },
  {
    route: "/commissioned-orders/submit-commission-request",
    title: "Submit Commission Request",
    description:
      "Submit your commission request and connect with talented artists on Artistry.",
  },
  {
    route: "/commissioned-orders/artists-for-commissions",
    title: "Artists for Commissions",
    description:
      "Discover talented artists available for commissioned artwork on Artistry.",
  },
  {
    route: "/commissioned-orders/submit-commission-request/success",
    title: "Commission Request Success",
    description:
      "Your commission request has been successfully submitted on Artistry.",
  },
  {
    route: "/checkout/confirmation",
    title: "Order Confirmation",
    description: "Your order has been successfully placed on Artistry.",
  },
  {
    route: "/view-artist",
    title: "View Artist",
    description: "Explore and learn more about talented artists on Artistry.",
  },
  {
    route: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "Read our privacy policy to understand how we protect your data on Artistry.",
  },
  {
    route: "/faq",
    title: "FAQ",
    description: "Frequently asked questions about Artistry and our services.",
  },
];

const getHeadComponent = (route) => {
  const headComponent = helmetComponents.find((item) => item.route === route);

  if (headComponent) {
    return (
      <Head
        title={headComponent.title}
        description={headComponent.description}
        url={`${import.meta.env.VITE_REACT_APP_CLIENT_URL}${
          headComponent.route
        }`}
      />
    );
  }

  return (
    <Head
      title="Page Not Found"
      description="Oops! The page you're looking for could not be found."
      url={import.meta.env.VITE_REACT_APP_CLIENT_URL}
    />
  );
};

export default getHeadComponent;
