var menuItems = [
  {
    id: 1,
    label: "menu",
    isTitle: true
  },
  {
    id: 2,
    label: "Tableau de bord",
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
        id: 9,
        label: "Réservation de restaurant",
        link: "/clients/restauration/reservation-de-restaurant"
      }
    ]
  },
  {
    id: 10,
    label: "Événements",
    icon: "uil-schedule",
    link: "/clients/events",
    subItems: [
      {
        id: 24,
        label: "Planifier un événement",
        link: "/clients/events/planifier-un-evenement"
      },
      {
        id: 25,
        label: "Gérer les tickets",
        link: "/clients/events/gerer-les-tickets",
      },
      {
        id: 26,
        label: "Mes événements",
        link: "/clients/events/mes-evenements",
      },
      {
        id: 27,
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
    label: "Commandes et factures",
    isTitle: true
  },
  {
    id: 19,
    label: "Commandes",
    icon: "uil-calender",
    link: "/clients/orders",
    subItems: [
      {
        id: 32,
        label: "Commandes actives",
        link: "/clients/orders/active"
      },
      {
        id: 33,
        label: "Commandes archivées",
        link: "/clients/orders/archive"
      },
    ]
  },
  {
    id: 21,
    label: "Factures",
    icon: "uil-invoice",
    link: "/clients/invoices"
  },

  
  
  {
    id: 180,
    label: "Paramètres",
    isTitle: true
  },
  {
    id: 8,
    label: "Restauration collectif",
    icon: "uil-users-alt",
    subItems: [
      {
        id: 28,
        label: "Statistiques",
        link: "/clients/restauration-collectif/statistiques"
      },
      {
        id: 29,
        label: "Mes employés",
        link: "/clients/restauration-collectif/mes-employes"
      },
      {
        id: 30,
        label: "Paramètres",
        link: "/clients/restauration-collectif/parametres"
      }
    ]
  },
  {
    id: 22,
    label: "Settings",
    icon: "uil-setting",
    link: "/clients/settings"
  }
];





export { menuItems }

import axios from 'axios'