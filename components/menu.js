export const menuItems = [
  {
    id: 1,
    label: "menu",
    isTitle: true
  },
  {
    id: 2,
    label: "Dashboard",
    icon: "uil-home-alt",
    link: "/clients"
  },
  {
    id: 3,
    label: "services",
    isTitle: true
  },
  {
    id: 4,
    label: "Restauration",
    icon: "uil-restaurant",
    subItems: [
      {
        id: 1,
        label: "Sur carte",
        link: "/clients/restauration/sur-carte"
      },
      {
        id: 2,
        label: "Menu conventionné",
        link: "/clients/restauration/menu-conventionne"
      },
      {
        id: 3,
        label: "Réservation",
        link: "/clients/restauration/reservation-de-restaurant"
      }
    ]
  },
  {
    id: 5,
    label: "Events",
    icon: "uil-schedule",
    link: "/clients/events"
  },
  {
    id: 6,
    label: "Note De Frais",
    icon: "uil-moneybag",
    link: "/clients/note-de-frais"
  },
  {
    id: 6,
    label: "Market",
    icon: "uil-store",
    link: "/clients/note-de-frais"
  },
  {
    id: 7,
    label: "My Account",
    isTitle: true
  },
  {
    id: 8,
    label: "Orders",
    icon: "uil-calender",
    link: "/clients/orders"
  },
  {
    id: 9,
    label: "Invoices and Billing",
    isTitle: true
  },
  {
    id: 10,
    label: "Invoices",
    icon: "uil-invoice",
    link: "/clients/invoices"
  },
  {
    id: 11,
    label: "Settings",
    icon: "uil-setting",
    link: "/clients/settings"
  }
];
