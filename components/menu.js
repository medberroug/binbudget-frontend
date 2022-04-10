var menuItemsForClient = [
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
  // {
  //   id: 22,
  //   label: "Settings",
  //   icon: "uil-setting",
  //   link: "/clients/settings"
  // }
];


var menuItemsForSupplier = [
  {
    id: 90,
    label: "menu",
    isTitle: true
  },
  {
    id: 91,
    label: "Tableau de bord",
    icon: "uil-home-alt",
    link: "/supplier/dashboard"
  },
  {
    id: 92,
    label: "Mes commandes",
    isTitle: true
  },
  {
    id: 93,
    label: "Commandes en cours",
    icon: "uil-shopping-basket",
    link: "/supplier/orders/active"
  },
  {
    id: 94,
    label: "Commandes archivées",
    icon: "uil-archive",
    link: "/supplier/orders/archive"
  },
  {
    id: 95,
    label: "Offres et services",
    isTitle: true
  },
  {
    id: 96,
    label: "Produits et services",
    icon: "uil-tag-alt",
    link: "/supplier/myproducts",
    subItems: [
      {
        id: 1213515,
        label: "Produits",
        link: "/supplier/myproducts"
      },
      {
        id: 13266,
        label: "Catégories",
        link: "/supplier/myproducts/categories",
      }
    ]
  },

  {
    id: 97,
    label: "Factures",
    isTitle: true
  },
  {
    id: 98,
    label: "Factures de vente",
    icon: "uil-invoice",
    link: "/supplier/invoices/selling"
  },
  {
    id: 99,
    label: "Factures d'achat",
    icon: "uil-money-withdrawal",
    link: "/supplier/invoices/buying"
  },
  // {
  //   id: 1001,
  //   label: "Paramètres",
  //   isTitle: true
  // },

  // {
  //   id: 250,
  //   label: "Settings",
  //   icon: "uil-setting",
  //   link: "/clients/settings"
  // }
];
var menuItemsForEvent = [
  {
    id: 90,
    label: "menu",
    isTitle: true
  },
  {
    id: 91,
    label: "Tableau de bord",
    icon: "uil-home-alt",
    link: "/supplierevent/dashboard"
  },
  {
    id: 92,
    label: "Mes commandes",
    isTitle: true
  },
  {
    id: 93,
    label: "Commandes en cours",
    icon: "uil-shopping-basket",
    link: "/supplierevent/orders/active"
  },
  {
    id: 94,
    label: "Commandes archivées",
    icon: "uil-archive",
    link: "/supplierevent/orders/archive"
  },
  {
    id: 95,
    label: "Offres et services",
    isTitle: true
  },
  {
    id: 96,
    label: "Produits et services",
    icon: "uil-tag-alt",
    link: "/supplierevent/myproducts",
    subItems: [
      {
        id: 1213515,
        label: "Produits",
        link: "/supplierevent/myproducts"
      },
      {
        id: 13266,
        label: "Catégories",
        link: "/supplierevent/myproducts/categories",
      }
    ]
  },

  {
    id: 97,
    label: "Factures",
    isTitle: true
  },
  {
    id: 98,
    label: "Factures de vente",
    icon: "uil-invoice",
    link: "/supplierevent/invoices/selling"
  },
  {
    id: 99,
    label: "Factures d'achat",
    icon: "uil-money-withdrawal",
    link: "/supplierevent/invoices/buying"
  },
  // {
  //   id: 1001,
  //   label: "Paramètres",
  //   isTitle: true
  // },

  // {
  //   id: 250,
  //   label: "Settings",
  //   icon: "uil-setting",
  //   link: "/clients/settings"
  // }
];
import { getData, persistData } from "../components/controllers/savingData"

console.log("XXXXXXXXXXXXXXXXXXACCOUNTXXXXXXXXXXXXXXX");
// persistData("account", "supplier")
console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
// window.localStorage.setItem("'account'", "supplier")
let menuItems = null
let account = getData('account')  
let myMenuType = null

if (account == "supplier") {
  menuItems = menuItemsForSupplier
  // persistData("accountinfo", {
  //   id:"6165a1dedb4fc0357013de8f",
  //   type:"restaurations"
  // })
  
}
if (account == "event") {
  menuItems = menuItemsForEvent
  // persistData("accountinfo", {
  //   id:"6196730106b47e37eca51d28",
  //   type:"event"
  // })
}
if (account=="client" ) {
  menuItems = menuItemsForClient
  // persistData("clientinfo", {
  //   id:"61d6ef9da87fba4628e55138",
  
  // })
}




export { menuItems }


