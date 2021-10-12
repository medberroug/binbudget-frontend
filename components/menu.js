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
        id: 5,
        label: "Livraison de repas",
        link: "/clients/restauration/livraison-de-repas"
      },
      {
        id: 6,
        label: "Repas emporté",
        link: "/clients/restauration/repas-emporte"
      },
      {
        id: 7,
        label: "Menu conventionné",
        link: "/clients/restauration/menu-conventionne"
      },
      {
        id: 8,
        label: "Restauration collectif",
        link: "/clients/restauration/restauration-collectif"
      },
      {
        id: 9,
        label: "Réservation de restaurant",
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
    link: "/clients/note-de-frais",

    subItems: [
      {
        id: 1,
        label: "Nouvelle déclaration",
        link: "/clients/note-de-frais/declaration"
      },
      {
        id: 2,
        label: "Mes notes de frais",
        link: "/clients/note-de-frais/mes-notes-de-frais",
      }
    ]
  },
  {
    id: 6,
    label: "Market",
    icon: "uil-store",
    link: "/clients/market"
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
