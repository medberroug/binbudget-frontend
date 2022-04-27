
var menuItemsForAdmin = [
  {
    id: 2000,
    label: "menu",
    isTitle: true
  },
  {
    id: 2001,
    label: "Tableau de bord",
    icon: "uil-home-alt",
    link: "/admin"
  },
  {
    id: 2002,
    label: "Gestion des clients",
    isTitle: true
  },
  {
    id: 2003,
    label: "T.B. Clients",
    icon: "uil-chart-pie",
    link: "/admin/clients/dashboard"
  },
  {
    id: 2004,
    label: "Clients",
    icon: "uil-users-alt",
    link: "/admin/clients/",
    subItems: [
      {
        id: 2005,
        label: "List des clients",
        link: "/admin/clients/"
      },
      {
        id: 2006,
        label: "Comptes clients",
        link: "/admin/clients/",
      }
    ]
  },
  {
    id: 2002,
    label: "Gestion des événements",
    isTitle: true
  },
   {
    id: 2003,
    label: "T.B. événements",
    icon: "uil-chart-pie",
    link: "/admin/clients/dashboard"
  },
  {
    id: 2004,
    label: "Four. événementiels",
    icon: "uil-users-alt",
    link: "/admin/clients/",
    subItems: [
      {
        id: 2005,
        label: "List des fournisseurs",
        link: "/admin/clients/"
      },
      {
        id: 2006,
        label: "Comptes événementiels",
        link: "/admin/clients/",
      }
    ]
  },{
    id: 2004,
    label: "Com. événementiels",
    icon: "uil-shopping-cart-alt",
    link: "/admin/clients/",
    subItems: [
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
    ]
  },
  {
    id: 2002,
    label: "Gestion de la restauration",
    isTitle: true
  },
   {
    id: 2003,
    label: "T.B. restauration",
    icon: "uil-chart-pie",
    link: "/admin/clients/dashboard"
  },
  {
    id: 2004,
    label: "Four. restauration",
    icon: "uil-users-alt",
    link: "/admin/clients/",
    subItems: [
      {
        id: 2005,
        label: "List des fournisseurs",
        link: "/admin/clients/"
      },
      {
        id: 2006,
        label: "Comptes restauration",
        link: "/admin/clients/",
      }
    ]
  },{
    id: 2004,
    label: "Com. Restauration",
    icon: "uil-shopping-cart-alt",
    link: "/admin/clients/",
    subItems: [
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
    ]
  }
  ,{
    id: 2002,
    label: "Gestion de la livraison",
    isTitle: true
  },
  {
    id: 2003,
    label: "T.B. livraison",
    icon: "uil-chart-pie",
    link: "/admin/clients/dashboard"
  },{
    id: 2004,
    label: "Livreurs",
    icon: "uil-users-alt",
    link: "/admin/clients/",
    subItems: [
      {
        id: 2005,
        label: "List des livreurs",
        link: "/admin/clients/"
      },
      {
        id: 2006,
        label: "Comptes livreurs",
        link: "/admin/clients/",
      }
    ]
  },{
    id: 2004,
    label: "Com. Livraisons",
    icon: "uil-shopping-cart-alt",
    link: "/admin/clients/",
    subItems: [
      {
        id: 93,
        label: "Livraisons en cours",
        icon: "uil-shopping-basket",
        link: "/supplier/orders/active"
      },
      {
        id: 94,
        label: "Livraisons archivées",
        icon: "uil-archive",
        link: "/supplier/orders/archive"
      },
    ]
  },
  {
    id: 2002,
    label: "Market",
    isTitle: true
  },
  {
    id: 2003,
    label: "T.B. Market",
    icon: "uil-chart-pie",
    link: "/admin/clients/dashboard"
  },
  {
    id: 2004,
    label: "Commandes Market",
    icon: "uil-shopping-cart-alt",
    link: "/admin/clients/",
    subItems: [
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
    ]
  },
  {
    id: 2004,
    label: "Produits et stocks",
    icon: "uil-archive",
    link: "/admin/clients/",
    subItems: [
      {
        id: 93,
        label: "Produits",
        icon: "uil-shopping-basket",
        link: "/supplier/orders/active"
      },
      {
        id: 94,
        label: "Inventaire des produits",
        icon: "uil-archive",
        link: "/supplier/orders/archive"
      },
    ]
  },
  {
    id: 2004,
    label: "Paramètres Market",
    icon: "uil-shop",
    link: "/admin/clients/",
    subItems: [
      {
        id: 93,
        label: "Catégories",
        icon: "uil-shopping-basket",
        link: "/supplier/orders/active"
      },
      {
        id: 94,
        label: "Entrepôts",
        icon: "uil-archive",
        link: "/supplier/orders/archive"
      },
    ]
  },{
    id: 2002,
    label: "Devis et factures",
    isTitle: true
  },{
    id: 2003,
    label: "T.B. Comptable",
    icon: "uil-chart-pie",
    link: "/admin/clients/dashboard"
  }, {
    id: 2004,
    label: "Factures",
    icon: "uil-money-insert",
    link: "/admin/clients/",
    subItems: [
      {
        id: 93,
        label: "Factures en cours",
        icon: "uil-shopping-basket",
        link: "/supplier/orders/active"
      },
      {
        id: 94,
        label: "Factures archivées",
        icon: "uil-archive",
        link: "/supplier/orders/archive"
      },
    ]
  },{
    id: 2004,
    label: "Devis",
    icon: "uil-receipt",
    link: "/admin/clients/",
    subItems: [
      {
        id: 93,
        label: "Devis en cours",
        icon: "uil-shopping-basket",
        link: "/supplier/orders/active"
      },
      {
        id: 94,
        label: "Devis archivées",
        icon: "uil-archive",
        link: "/supplier/orders/archive"
      },
    ]
  },{
    id: 2004,
    label: "Paiments",
    icon: "uil-money-withdraw",
    link: "/admin/clients/",
    subItems: [
      {
        id: 93,
        label: "Saisir un paiment",
        icon: "uil-shopping-basket",
        link: "/supplier/orders/active"
      },
      {
        id: 94,
        label: "Paiments en attente",
        icon: "uil-archive",
        link: "/supplier/orders/archive"
      },{
        id: 94,
        label: "liste des paiments",
        icon: "uil-archive",
        link: "/supplier/orders/archive"
      },{
        id: 94,
        label: "Modalités des paiments",
        icon: "uil-archive",
        link: "/supplier/orders/archive"
      },
    ]
  },{
    id: 2002,
    label: "Paramètres système",
    isTitle: true
  }
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
  {
    id: 1001,
    label: "Paramètres",
    isTitle: true
  },

  {
    id: 250,
    label: "Settings",
    icon: "uil-setting",
    link: "/clients/settings"
  }
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
import { getData, persistData , removeData } from "../components/controllers/savingData"

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

if (account == "admin") {
  menuItems = menuItemsForAdmin
  // persistData("accountinfo", {
  //   id:"6196730106b47e37eca51d28",
  //   type:"event"
  // })
}


// CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC

if (account == "client") {
  if(getData("clientinfo").menu){
    let result = getData("clientinfo").menu
    
    
    let dynamicMenu = [{
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
    },]
  
    // RESTAURATION
    let restaurationHeader = {
      id: 4,
      label: "Restauration",
      icon: "uil-restaurant",
      subItems: [
      ]
    }
    for (let i = 0; i < result.length; i++) {
      if (result[i].name == "livraison-de-repas") {
  
        restaurationHeader.subItems.push({
          id: 5,
          label: "Livraison de repas",
          link: "/clients/restauration/livraison-de-repas"
        })
  
      }
    }
    for (let i = 0; i < result.length; i++) {
      if (result[i].name == "repas-emporte") {
  
        restaurationHeader.subItems.push({
          id: 6,
          label: "Repas emporté",
          link: "/clients/restauration/repas-emporte"
        })
  
      }
    }
    for (let i = 0; i < result.length; i++) {
      if (result[i].name == "menu-conventionne") {
  
        restaurationHeader.subItems.push({
          id: 7,
          label: "Menu conventionné",
          link: "/clients/restauration/menu-conventionne"
        })
  
      }
    }
    for (let i = 0; i < result.length; i++) {
      if (result[i].name == "reservation-de-restaurant") {
  
        restaurationHeader.subItems.push({
          id: 9,
          label: "Réservation de restaurant",
          link: "/clients/restauration/reservation-de-restaurant"
        })
  
      }
    }
    if (restaurationHeader.subItems.length > 0) {
      dynamicMenu.push(restaurationHeader)
    }
    //Events
    let eventsHeader = {
      id: 10,
      label: "Événements",
      icon: "uil-schedule",
      link: "/clients/events",
      subItems: [
  
      ]
    }
  
    for (let i = 0; i < result.length; i++) {
      if (result[i].name == "event") {
  
        eventsHeader.subItems.push({
          id: 24,
          label: "Planifier un événement",
          link: "/clients/events/planifier-un-evenement"
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
          })
  
      }
    }
  
    for (let i = 0; i < result.length; i++) {
      if (result[i].name == "tms") {
  
        eventsHeader.subItems.push(
          {
            id: 25,
            label: "Gérer les tickets",
            link: "/clients/events/gerer-les-tickets",
          }
        )
  
      }
    }
    if (eventsHeader.subItems.length > 0) {
      dynamicMenu.push(eventsHeader)
    }
  
    // Ticket Management System
    for (let i = 0; i < result.length; i++) {
      if (result[i].name == "ndf") {
  
        dynamicMenu.push(
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
          }
        )
  
      }
    }
    // Market
    for (let i = 0; i < result.length; i++) {
      if (result[i].name == "market") {
  
        dynamicMenu.push(
          {
            id: 17,
            label: "Market",
            icon: "uil-store",
            link: "/clients/market"
          }
        )
  
      }
    }
  
    //Push Factures
  
    dynamicMenu.push({
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
    )
    //Resto collectif
    for (let i = 0; i < result.length; i++) {
      if (result[i].name == "restauration-collectif") {
  
        dynamicMenu.push(
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
        )
  
      }
    }
  
    menuItems = dynamicMenu
  
  } else{
    removeData("clientinfo")
    removeData("account")
  }
  

}




export { menuItems }


