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
                <a class="dropdown-item" href="#">Edit</a>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Remove</a>
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
                <span class="d-none d-sm-block">Services</span>
              </template>
              <div>
                <h5 class="font-size-16 mb-3">
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
                </div>
              </div>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="uil uil-envelope-alt font-size-20"></i>
                <span class="d-none d-sm-block">Messages</span>
              </template>
              <div>
                <div data-simplebar style="max-height: 430px">
                  <div class="media border-bottom py-4">
                    <img
                      class="me-2 rounded-circle avatar-xs"
                      src="~/assets/images/users/avatar-3.jpg"
                      alt
                    />
                    <div class="media-body">
                      <h5 class="font-size-15 mt-0 mb-1">
                        Marion Walker
                        <small class="text-muted float-end">1 hr ago</small>
                      </h5>
                      <p class="text-muted">
                        If several languages coalesce, the grammar of the
                        resulting .
                      </p>

                      <a
                        href="javascript: void(0);"
                        class="text-muted font-13 d-inline-block"
                      >
                        <i class="mdi mdi-reply"></i> Reply
                      </a>

                      <div class="media mt-4">
                        <img
                          class="me-2 rounded-circle avatar-xs"
                          src="~/assets/images/users/avatar-4.jpg"
                          alt
                        />
                        <div class="media-body">
                          <h5 class="font-size-15 mt-0 mb-1">
                            Shanon Marvin
                            <small class="text-muted float-end">1 hr ago</small>
                          </h5>
                          <p class="text-muted">
                            It will be as simple as in fact, it will be
                            Occidental. To it will seem like simplified .
                          </p>

                          <a
                            href="javascript: void(0);"
                            class="text-muted font-13 d-inline-block"
                          >
                            <i class="mdi mdi-reply"></i> Reply
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="media border-bottom py-4">
                    <img
                      class="me-2 rounded-circle avatar-xs"
                      src="~/assets/images/users/avatar-5.jpg"
                      alt
                    />
                    <div class="media-body">
                      <h5 class="font-size-15 mt-0 mb-1">
                        Janice Morgan
                        <small class="text-muted float-end">2 hrs ago</small>
                      </h5>
                      <p class="text-muted">
                        To achieve this, it would be necessary to have uniform
                        pronunciation.
                      </p>

                      <a
                        href="javascript: void(0);"
                        class="text-muted font-13 d-inline-block"
                      >
                        <i class="mdi mdi-reply"></i> Reply
                      </a>
                    </div>
                  </div>

                  <div class="media border-bottom py-4">
                    <img
                      class="me-2 rounded-circle avatar-xs"
                      src="~/assets/images/users/avatar-7.jpg"
                      alt
                    />
                    <div class="media-body">
                      <h5 class="font-size-15 mt-0 mb-1">
                        Patrick Petty
                        <small class="text-muted float-end">3 hrs ago</small>
                      </h5>
                      <p class="text-muted">
                        Sed ut perspiciatis unde omnis iste natus error sit
                      </p>

                      <a
                        href="javascript: void(0);"
                        class="text-muted font-13 d-inline-block"
                      >
                        <i class="mdi mdi-reply"></i> Reply
                      </a>
                    </div>
                  </div>
                </div>

                <div class="border rounded mt-4">
                  <form action="#">
                    <div class="px-2 py-1 bg-light">
                      <div class="btn-group" role="group">
                        <button
                          type="button"
                          class="
                            btn btn-sm btn-link
                            text-dark text-decoration-none
                          "
                        >
                          <i class="uil uil-link"></i>
                        </button>
                        <button
                          type="button"
                          class="
                            btn btn-sm btn-link
                            text-dark text-decoration-none
                          "
                        >
                          <i class="uil uil-smile"></i>
                        </button>
                        <button
                          type="button"
                          class="
                            btn btn-sm btn-link
                            text-dark text-decoration-none
                          "
                        >
                          <i class="uil uil-at"></i>
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows="3"
                      class="form-control border-0 resize-none"
                      placeholder="Your Message..."
                    ></textarea>
                  </form>
                </div>
                <!-- end .border-->
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
