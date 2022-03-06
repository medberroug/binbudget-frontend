<script>
import axios from "axios";
import { getData } from "../../../components/controllers/savingData";
import { format, parseISO } from "date-fns";
/**
 * Profile component
 */
export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  async mounted() {
    let result = await axios.get(
      process.env.baseUrl +
        "/eventserviceproviders/" +
        getData("accountinfo").id
    );
    let result2 = await axios.get(
      process.env.baseUrl + "/employees/" + result.data.accountManager
    );
    this.accountManager = result2.data;
    this.baseUrl = process.env.baseUrl;
    this.supplierData = result.data;

    console.log(this.supplierData);
    console.log(getData("accountinfo").id);
  },
  methods: {
    formatMyDate(date) {
      // return date
      return format(parseISO(date), "dd/MM/yyyy, HH:MM");
    },
    checkIfServiceExists(serviceList, refService) {
      for (let i = 0; i < serviceList.length; i++) {
        if (serviceList[i].serviceName == refService) {
          return true;
        }
      }
      return false;
    },
  },
  data() {
    return {
      title: "Profile",
      items: [
        {
          text: "Contacts",
        },
        {
          text: "Profile",
          active: true,
        },
      ],
      supplierData: null,
      baseUrl: null,
      accountManager: null,
    };
  },
  middleware: "authentication",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="row my-4" v-if="supplierData">
      <div class="col-xl-4">
        <div class="card h-100">
          <div class="card-body">
            <div class="text-center">
              <b-dropdown
                class="float-end"
                variant="white"
                right
                toggle-class="font-size-16 text-body p-0"
              >
                <template v-slot:button-content>
                  <i class="uil uil-ellipsis-v"></i>
                </template>
                <a class="dropdown-item text-primary" href="#">Modifier</a>
                <a class="dropdown-item text-danger" href="#">Désactiver le profil </a>
                
              </b-dropdown>
              <div class="clearfix"></div>
              <div>
                <img
                  :src="baseUrl + supplierData.logo.url"
                  alt
                  class="avatar-lg rounded-circle img-thumbnail"
                />
              </div>
              <h5 class="mt-3 mb-1">{{ supplierData.knownName }}</h5>
              <p class="text-muted">Prestataire de services événementiels</p>

              <!-- <div class="mt-4">
                <button type="button" class="btn btn-light btn-sm">
                  <i class="uil uil-envelope-alt me-2"></i> Message
                </button>
              </div> -->
            </div>

            <hr class="my-4" />

            <div class="text-muted">
              <h5 class="font-size-16">À propos</h5>
              <p>
                {{ supplierData.smallDescription }}
              </p>
              <div class="table-responsive mt-4 mb-0">
                <div>
                  <p class="mb-1">Créé le :</p>
                  <h5 class="font-size-16">
                    {{ formatMyDate(supplierData.createdAt) }}
                  </h5>
                </div>
                <div class="mt-4">
                  <p class="mb-1">Dernière mise à jour :</p>
                  <h5 class="font-size-16">
                    {{ formatMyDate(supplierData.updatedAt) }}
                  </h5>
                </div>
                <div class="mt-4">
                  <p class="mb-1">Status :</p>
                  <h5 class="font-size-16">
                    <div
                      class="badge badge-pill font-size-16 mx-4 bg-success"
                      v-if="supplierData.status"
                    >
                      <span> Actif</span>
                    </div>
                    <div
                      class="badge badge-pill font-size-16 mx-4 bg-danger"
                      v-if="!supplierData.status"
                    >
                      <span> Inactif</span>
                    </div>
                  </h5>
                </div>
              </div>
            </div>
            <hr class="my-4" />
            <div class="text-muted">
              <h5 class="font-size-16">Mon chargé de relations</h5>
              <div class="font-size-12 mt-3">
                <b-alert variant="secondary" show
                  >Contactez votre chargé de relations par téléphone uniquement
                  si votre demande est urgente. Il est conseillé de vous en
                  tenir à des e-mails ou à des appels téléphoniques durant les
                  heures de travail occasionnelles.
                </b-alert>
              </div>
              <div class="table-responsive mt-4 mb-0">
                <div>
                  <p class="mb-1">Nom :</p>
                  <h5 class="font-size-16">
                    {{ accountManager.lastName }},
                    {{ accountManager.firstName }}
                  </h5>
                </div>
                <div class="mt-4">
                  <p class="mb-1">E-mail :</p>
                  <h5 class="font-size-16">
                    {{ accountManager.email }}
                  </h5>
                </div>
                <div class="mt-4">
                  <p class="mb-1">Numéro de téléphone :</p>

                  <h5 class="font-size-16">
                    {{ accountManager.phoneNumber }}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-8">
        <div class="card mb-0">
          <b-tabs content-class="p-4" justified class="nav-tabs-custom">
            <b-tab active>
              <template v-slot:title>
                <i class="uil uil-briefcase-alt font-size-20"></i>
                <span class="d-none d-sm-block">Renseignements juridiques</span>
              </template>
              <div>
                <div>
                  <div class="text-muted">
                    <b-alert variant="warning" show
                      >Les informations juridiques ci-dessous sont essentielles
                      pour le bon déroulement de vos services, si vous constatez
                      une erreur dans une des données ci-dessous ou si vous
                      souhaitez modifier celles-ci, veuillez vous adresser
                      directement et " prioritairement " à votre chargé de
                      relations BinBudget.</b-alert
                    >
                    <div class="table-responsive mt-4 mb-0">
                      <div>
                        <p class="mb-1">Dénomination légale :</p>
                        <h5 class="font-size-16">
                          {{ supplierData.legalName }}
                        </h5>
                      </div>
                      <div class="mt-4">
                        <p class="mb-1">ICE :</p>
                        <h5 class="font-size-16">
                          {{ supplierData.ICE }}
                        </h5>
                      </div>
                      <div class="mt-4">
                        <p class="mb-1">IF :</p>
                        <h5 class="font-size-16">
                          {{ supplierData.IF }}
                        </h5>
                      </div>
                      <div class="mt-4">
                        <p class="mb-1">RC :</p>
                        <h5 class="font-size-16">
                          {{ supplierData.RC }}
                        </h5>
                      </div>

                      <div class="mt-4">
                        <p class="mb-1">Adresse :</p>
                        <h5 class="font-size-16">
                          {{ supplierData.address.street }}
                        </h5>
                        <h5 class="font-size-16">
                          {{ supplierData.address.city }} ,
                          {{ supplierData.address.state }}
                        </h5>
                        <h5 class="font-size-16">
                          {{ supplierData.address.country }}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="uil uil-clipboard-notes font-size-20"></i>
                <span class="d-none d-sm-block">Offre commerciale</span>
              </template>
              <div>
                <h5 class="font-size-16 my-3">
                  Catégorie de services: Evénementiel
                </h5>

                <div class="table-responsive">
                  <table class="table table-nowrap table-centered">
                    <tbody>
                      <tr>
                        <td>
                          <a href="#" class="font-weight-bold text-dark"
                            >Salle d'événements</a
                          >
                        </td>
                        <td>
                          <a
                            href="#"
                            class="font-weight-bold text-dark"
                            v-if="
                              checkIfServiceExists(
                                supplierData.whatServicesHeCanOffer,
                                'event-hosting'
                              )
                            "
                          >
                            {{
                              Intl.NumberFormat("fr-MA", {
                                style: "currency",
                                currency: "MAD",
                              }).format(
                                supplierData.monthlyServiceCost.eventSalle
                              )
                            }}
                            / mois</a
                          >
                          <a
                            href="#"
                            class="font-weight-bold text-dark"
                            v-if="
                              !checkIfServiceExists(
                                supplierData.whatServicesHeCanOffer,
                                'event-salle'
                              )
                            "
                            >-</a
                          >
                        </td>
                        <td style="width: 160px">
                          <span
                            class="badge bg-soft-success font-size-12"
                            v-if="
                              checkIfServiceExists(
                                supplierData.whatServicesHeCanOffer,
                                'event-salle'
                              )
                            "
                            >Active</span
                          >
                          <span
                            class="badge bg-soft-secondary font-size-12"
                            v-else
                            >Inactif</span
                          >
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <a href="#" class="font-weight-bold text-dark"
                            >Hébergement</a
                          >
                        </td>
                        <td>
                          <a
                            href="#"
                            class="font-weight-bold text-dark"
                            v-if="
                              checkIfServiceExists(
                                supplierData.whatServicesHeCanOffer,
                                'event-hosting'
                              )
                            "
                          >
                            {{
                              Intl.NumberFormat("fr-MA", {
                                style: "currency",
                                currency: "MAD",
                              }).format(
                                supplierData.monthlyServiceCost.eventHosting
                              )
                            }}
                            / mois</a
                          >
                          <a
                            href="#"
                            class="font-weight-bold text-dark"
                            v-if="
                              !checkIfServiceExists(
                                supplierData.whatServicesHeCanOffer,
                                'event-hosting'
                              )
                            "
                            >-</a
                          >
                        </td>

                        <td style="width: 160px">
                          <span
                            class="badge bg-soft-success font-size-12"
                            v-if="
                              checkIfServiceExists(
                                supplierData.whatServicesHeCanOffer,
                                'event-hosting'
                              )
                            "
                            >Active</span
                          >
                          <span
                            class="badge bg-soft-secondary font-size-12"
                            v-else
                            >Inactif</span
                          >
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <a href="#" class="font-weight-bold text-dark"
                            >Restauration</a
                          >
                        </td>
                        <td>
                          <a
                            href="#"
                            class="font-weight-bold text-dark"
                            v-if="
                              checkIfServiceExists(
                                supplierData.whatServicesHeCanOffer,
                                'event-restauration'
                              )
                            "
                          >
                            {{
                              Intl.NumberFormat("fr-MA", {
                                style: "currency",
                                currency: "MAD",
                              }).format(
                                supplierData.monthlyServiceCost
                                  .eventRestauration
                              )
                            }}
                            / mois</a
                          >
                          <a
                            href="#"
                            class="font-weight-bold text-dark"
                            v-if="
                              !checkIfServiceExists(
                                supplierData.whatServicesHeCanOffer,
                                'event-restauration'
                              )
                            "
                            >-</a
                          >
                        </td>
                        <td style="width: 160px">
                          <span
                            class="badge bg-soft-success font-size-12"
                            v-if="
                              checkIfServiceExists(
                                supplierData.whatServicesHeCanOffer,
                                'event-restauration'
                              )
                            "
                            >Active</span
                          >
                          <span
                            class="badge bg-soft-secondary font-size-12"
                            v-else
                            >Inactif</span
                          >
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <a href="#" class="font-weight-bold text-dark"
                            >Services complémentaires</a
                          >
                        </td>
                        <td>
                          <a
                            href="#"
                            class="font-weight-bold text-dark"
                            v-if="
                              checkIfServiceExists(
                                supplierData.whatServicesHeCanOffer,
                                'event-service'
                              )
                            "
                          >
                            {{
                              Intl.NumberFormat("fr-MA", {
                                style: "currency",
                                currency: "MAD",
                              }).format(
                                supplierData.monthlyServiceCost.eventService
                              )
                            }}
                            / mois</a
                          >
                          <a
                            href="#"
                            class="font-weight-bold text-dark"
                            v-if="
                              !checkIfServiceExists(
                                supplierData.whatServicesHeCanOffer,
                                'event-service'
                              )
                            "
                            >-</a
                          >
                        </td>
                        <td style="width: 160px">
                          <span
                            class="badge bg-soft-success font-size-12"
                            v-if="
                              checkIfServiceExists(
                                supplierData.whatServicesHeCanOffer,
                                'event-service'
                              )
                            "
                            >Active</span
                          >
                          <span
                            class="badge bg-soft-secondary font-size-12"
                            v-else
                            >Inactif</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
    <hr class="my-4" />
                  <h5 class="font-size-16 mb-3 mt-5">Facturation et rentabilité</h5>
                  <div class="table-responsive mb-0">
                  <div class="">
                    <p class="mb-1">Pourcentage de bénéfices BinBudget:</p>
                    <h5 class="font-size-16">
                      {{ supplierData.percentageTaking }}%
                    </h5>
                  </div>
                  <div class="mt-4">
                    <p class="mb-1">Jours d'échéance des factures :</p>
                    <h5 class="font-size-16">
                      {{ supplierData.dueDatesAfter }} Jours
                    </h5>
                  </div>

                 
                </div>
                </div>
              </div>
            </b-tab>
        
          </b-tabs>
          <!-- Nav tabs -->
          <!-- Tab content -->
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>
