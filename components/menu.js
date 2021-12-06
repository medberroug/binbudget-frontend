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
    id: 10,
    label: "Events",
    icon: "uil-schedule",
    link: "/clients/events",
    subItems: [
      {
        id: 11,
        label: "Planifier un événement",
        link: "/clients/events/planifier-un-evenement"
      },
      {
        id: 12,
        label: "Gérer les tickets",
        link: "/clients/events/gerer-les-tickets",
      },
      {
        id: 13,
        label: "Mes événements",
        link: "/clients/events/mes-evenements",
      },
      {
        id: 23,
        label: "Événements archivés",
        link: "/clients/events/archive",
      }
    ]
  },
  {
    id: 14,
    label: "Note De Frais",
    icon: "uil-moneybag",
    link: "/clients/note-de-frais",

    subItems: [
      {
        id: 15,
        label: "Nouvelle déclaration",
        link: "/clients/note-de-frais/declaration"
      },
      {
        id: 16,
        label: "Mes notes de frais",
        link: "/clients/note-de-frais/mes-notes-de-frais",
      }
    ]
  },
  {
    id: 17,
    label: "Market",
    icon: "uil-store",
    link: "/clients/market"
  },
  {
    id: 18,
    label: "My Account",
    isTitle: true
  },
  {
    id: 19,
    label: "Orders",
    icon: "uil-calender",
    link: "/clients/orders"
  },
  {
    id: 20,
    label: "Invoices and Billing",
    isTitle: true
  },
  {
    id: 21,
    label: "Invoices",
    icon: "uil-invoice",
    link: "/clients/invoices"
  },
  {
    id: 22,
    label: "Settings",
    icon: "uil-setting",
    link: "/clients/settings"
  }
];
