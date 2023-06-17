export const links = [
  {
    name: "Browse",
    link: "/browse",
    isDropdown: true,
    submenu: true,
    sublinks: [
      {
        name: "Artworks",
        link: "/browse/artworks",
        sublinks: [
          { name: "Abstract", link: "/browse/artworks/abstract" },
          { name: "Landscape", link: "/browse/artworks/landscape" },
          { name: "Portrait", link: "/browse/artworks/portrait" },
          { name: "Still Life", link: "/browse/artworks/still-life" },
          { name: "Anime", link: "/browse/artworks/anime" },
        ],
        sublinkCount: 5,
      },
      {
        name: "Artists",
        link: "/browse/artists",
        sublinks: [
          { name: "Featured Artists", link: "/browse/artists/featured" },
          { name: "New Artists", link: "/browse/artists/new" },
          { name: "All Artists", link: "/browse/artists/all" },
        ],
        sublinkCount: 3,
      },
    ],
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
      {
        name: "Pricing and Payments",
        link: "/sell-art/pricing-payments",
        sublinks: [],
        sublinkCount: 0,
      },
      {
        name: "Artist Resources",
        link: "/sell-art/artist-resources",
        sublinks: [],
        sublinkCount: 0,
      },
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
    name: "Blog/News",
    link: "/blog",
    isDropdown: false,
    submenu: false,
  },
];
