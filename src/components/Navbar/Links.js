export const links = [
  {
    name: "Browse",
    link: "/browse",
    isDropdown: false,
    submenu: false,
  },
  {
    name: "Sell Art",
    link: "/sell-art",
    isDropdown: true,
    submenu: false,
    sublinks: [
      {
        name: "How to Sell",
        link: "/sell-art/how-to-sell",
        sublinks: [],
        sublinkCount: 0,
      },
      {
        name: "Artwork Submission",
        link: "/dashboard/listings",
        sublinks: [],
        sublinkCount: 0,
      },
      // {
      //   name: "Pricing and Payments",
      //   link: "/sell-art/pricing-payments",
      //   sublinks: [],
      //   sublinkCount: 0,
      // },
      // {
      //   name: "Artist Resources",
      //   link: "/sell-art/artist-resources",
      //   sublinks: [],
      //   sublinkCount: 0,
      // },
    ],
  },
  {
    name: "Commissioned Orders",
    link: "/commissioned-orders",
    isDropdown: true,
    submenu: false,
    sublinks: [
      {
        name: "Custom Artwork Process",
        link: "/commissioned-orders/custom-artwork-process",
        sublinks: [],
        sublinkCount: 0,
      },
      {
        name: "Artists for Commissions",
        link: "/commissioned-orders/artists-for-commissions",
        sublinks: [],
        sublinkCount: 0,
      },
      {
        name: "Submit Commission Request",
        link: "/commissioned-orders/submit-commission-request",
        sublinks: [],
        sublinkCount: 0,
      },
    ],
  },
  {
    name: "About Us",
    link: "/about",
    isDropdown: false,
    submenu: false,
  },
  {
    name: "Contact",
    link: "/contact",
    isDropdown: false,
    submenu: false,
  },
];
