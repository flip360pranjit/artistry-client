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
          { name: "Portraits", link: "/browse/artworks/portraits" },
          { name: "Still Life", link: "/browse/artworks/still-life" },
          { name: "Contemporary", link: "/browse/artworks/contemporary" },
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
      {
        name: "Collections",
        link: "/browse/collections",
        sublinks: [
          { name: "Curated Collections", link: "/browse/collections/curated" },
          {
            name: "Trending Collections",
            link: "/browse/collections/trending",
          },
          {
            name: "Top-rated Collections",
            link: "/browse/collections/top-rated",
          },
        ],
        sublinkCount: 3,
      },
      {
        name: "Categories",
        link: "/browse/categories",
        sublinks: [
          { name: "Mediums", link: "/browse/categories/mediums" },
          { name: "Styles", link: "/browse/categories/styles" },
          { name: "Themes", link: "/browse/categories/themes" },
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
        link: "/sell-art/artwork-submission",
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
