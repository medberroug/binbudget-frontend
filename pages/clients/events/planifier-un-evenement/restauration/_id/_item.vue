<template>
  <div>
    <PageHeader :title="title" :details="details" />
    <b-button @click="routerGo(-1)" class="mt-3" variant="primary">
      <i class="uil-arrow-left"> </i> Page précédente</b-button
    >
    <div class="row mt-3">
      <div class="col-lg-12" v-if="myItem">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-xl-5">
                <div class="product-detail">
                  <b-tabs pills vertical nav-wrapper-class="col-3">
                    <b-tab v-for="(pic, index) in myItem.images" :key="index">
                      <template v-slot:title>
                        <img
                          :src="baseUrl + pic.url"
                          alt
                          class="img-fluid mx-auto d-block tab-img rounded"
                        />
                      </template>
                      <div class="product-img">
                        <img
                          :src="baseUrl + pic.url"
                          alt
                          class="img-fluid mx-auto d-block"
                        />
                      </div>
                    </b-tab>
                  </b-tabs>
                </div>
              </div>

              <div class="col-xl-7">
                <div class="mt-4 mt-xl-3 pl-xl-4">
                  <h5 class="font-size-14">
                    <a href="#" class="text-muted">{{
                      restaurant.knownName
                    }}</a>
                  </h5>
                  <h4 class="font-size-20 mb-3">{{ myItem.name }}</h4>
                  <!-- <div class="text-muted">
                    <span class="badge bg-success font-size-14 me-1"
                      ><i class="mdi mdi-star"></i> 4.2</span
                    >
                    234 Reviews
                  </div> -->

                  <div v-if="myItem.disocunt">
                    <div
                      v-if="
                        myItem.price -
                          (myItem.price * myItem.disocunt.percentage) / 100 >
                        0
                      "
                    >
                      <h5 class="mb-4 pt-2">
                        <del class="text-muted me-2">{{ myItem.price }} dh</del
                        >{{
                          myItem.price -
                          (myItem.price * myItem.disocunt.percentage) / 100
                        }}
                        dh / {{ myItem.unit }}
                        <span class="text-danger font-size-14 ml-2"
                          >- {{ myItem.disocunt.percentage }} % Off</span
                        >
                      </h5>
                    </div>
                    <div v-else>
                      <h5 class="mb-4 pt-2 text-success">Gratuit</h5>
                    </div>
                  </div>
                  <h5 class="mb-4 pt-2" v-else>
                    <div v-if="myItem.price > 0">
                      {{ myItem.price }}
                      dh / {{ myItem.unit }}
                    </div>
                    <div v-if="myItem.price == 0">
                      <h5 class="mb-4 pt-2 text-success">Gratuit</h5>
                    </div>
                    <div v-if="myItem.price < 0">
                      <h5 class="mb-4 pt-2 text-primary">Sur devis</h5>
                    </div>
                  </h5>
                  <p class="text-muted mb-4">
                    {{ myItem.description }}
                  </p>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="mt-3">
                        <h5 class="font-size-14">Specification :</h5>

                        <ul class="list-unstyled product-desc-list text-muted">
                          <li
                            v-for="(spec, index) in myItem.specification"
                            :key="index"
                          >
                            <i
                              class="mdi mdi-circle-medium me-1 align-middle"
                            ></i>
                            {{ spec.specText }}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mt-3">
                        <h5 class="font-size-14 mb-3">
                          <i
                            class="
                              uil uil-shopping-basket
                              font-size-20
                              text-primary
                              align-middle
                              me-2
                            "
                          ></i>
                          Quantité :
                        </h5>
                        <div class="mt-3">
                          <div class="col" v-if="!itemAlreadyAdded">
                            <div
                              class="
                                d-flex
                                justify-content-start
                                align-items-start
                                my-4
                              "
                            >
                              <div class="d-flex align-items-center">
                                <!-- <b-button
                                  v-if="itemForOrder.quantity > 0"
                                  @click.prevent="calculateQuantity('sub')"
                                  variant="outline-primary"
                                  >-</b-button
                                >
                                <b-button
                                  v-else
                                  @click.prevent="calculateQuantity('sub')"
                                  disabled
                                  variant="outline-primary"
                                  >-</b-button
                                >
                                <span class="mx-2"
                                  >Quantity: {{ itemForOrder.quantity }}</span
                                >
                                <b-button
                                  @click.prevent="calculateQuantity('add')"
                                  variant="outline-primary"
                                  >+</b-button
                                > -->
                                  <NumberInputSpinner :min="0" :max="1000" :step="1" :integerOnly="true" v-model="itemForOrder.quantity" />
                              </div>
                            </div>
                            <div class="col-12 col-md-12">
                              <div class="form-inline">
                                <div
                                  class="input-group mb-3"
                                  v-if="itemForOrder.quantity > 0"
                                >
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="itemForOrder.comment"
                                    placeholder="Saisissez les renseignements concernant une commande spéciale..."
                                  />
                                  <div class="input-group-append">
                                    <button
                                      @click="addItemtoCart"
                                      class="btn btn-light mx-2"
                                      type="button"
                                    >
                                      Ajouter au panier
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-else>
                            <h6 class="text-success">
                              <i class="fas fa-check mx-3"></i>Ajouté au panier
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- <div class="row">
                    <div class="col-lg-7 col-sm-8">
                      <div class="product-desc-color mt-3">
                        <h5 class="font-size-14">Colors :</h5>
                        <ul class="list-inline">
                          <li class="list-inline-item">
                            <a
                              href="#"
                              class="active"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Gray"
                            >
                              <div class="product-color-item">
                                <img
                                  src="~/assets/images/product/img-1.png"
                                  alt=""
                                  class="avatar-md"
                                />
                              </div>
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              href="#"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Dark"
                            >
                              <div class="product-color-item">
                                <img
                                  src="~/assets/images/product/img-2.png"
                                  alt=""
                                  class="avatar-md"
                                />
                              </div>
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              href="#"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Purple"
                            >
                              <div class="product-color-item">
                                <img
                                  src="~/assets/images/product/img-3.png"
                                  alt=""
                                  class="avatar-md"
                                />
                              </div>
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a href="#" class="text-primary border-0 p-1">
                              2 + Colors
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="col-lg-5 col-sm-4">
                      <div class="mt-3">
                        <h5 class="font-size-14 mb-3">Select Sizes :</h5>

                        <div class="form-inline">
                          <select class="custom-select w-sm">
                            <option value="1">3</option>
                            <option value="2">4</option>
                            <option value="3">5</option>
                            <option value="4">6</option>
                            <option value="5" selected>7</option>
                            <option value="6">8</option>
                            <option value="7">9</option>
                            <option value="8">10</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
            <!-- end row -->

            <!-- <div class="mt-4">
              <h5 class="font-size-14 mb-3">Dish description:</h5>
              <div class="product-desc">
                <b-tabs
                  class="nav-tabs-custom"
                  content-class="border border-top-0 p-4"
                >
                  <b-tab title="Description">
                    <div class="row">
                      <div class="col-sm-3 col-md-2">
                        <div>
                          <img
                            src="~/assets/images/product/salad4.jpg"
                            alt=""
                            class="img-fluid mx-auto d-block"
                          />
                        </div>
                      </div>
                      <div class="col-sm-9 col-md-10">
                        <div class="text-muted p-2">
                          <p>
                            If several languages coalesce, the grammar of the
                            resulting language is more simple and regular
                          </p>
                          <p>
                            Everyone realizes why a new common language would be
                            desirable, one could refuse to pay expensive
                            translators.
                          </p>
                          <p>It will be as simple as occidental in fact.</p>

                          <div>
                            <ul
                              class="list-unstyled product-desc-list text-muted"
                            >
                              <li>
                                <i
                                  class="
                                    mdi mdi-circle-medium
                                    me-1
                                    align-middle
                                  "
                                ></i>
                                Sed ut perspiciatis omnis iste
                              </li>
                              <li>
                                <i
                                  class="
                                    mdi mdi-circle-medium
                                    me-1
                                    align-middle
                                  "
                                ></i>
                                Neque porro quisquam est
                              </li>
                              <li>
                                <i
                                  class="
                                    mdi mdi-circle-medium
                                    me-1
                                    align-middle
                                  "
                                ></i>
                                Quis autem vel eum iure
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Specifications" active>
                    <div class="table-responsive">
                      <table class="table table-nowrap mb-0">
                        <tbody>
                          <tr>
                            <th scope="row" style="width: 20%">Category</th>
                            <td>Meals</td>
                          </tr>
                          <tr>
                            <th scope="row">Name</th>
                            <td>Salad</td>
                          </tr>
                          <tr>
                            <th scope="row">Type</th>
                            <td>Vegetable</td>
                          </tr>
                          <tr>
                            <th scope="row">Nutritional Benefit</th>
                            <td>No Cholestrol</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </b-tab>
                </b-tabs>
              </div>
            </div> -->
          </div>
        </div>
        <!-- end card -->
      </div>
    </div>
    <!-- end row -->
  </div>
</template>

<script>
import axios from "axios";
import NumberInputSpinner from "vue-number-input-spinner";
import {
  getData,
  eventStepperCalculator,
  removeData,
  eventNextStep,
  persistData,
} from "../../../../../../components/controllers/savingData";
/**
 * Product-detail component
 */
export default {
  head() {
    return {
      title: `${this.title} |  Admin Dashboard`,
    };
  },
 components: {
       
        NumberInputSpinner,
    },
  async mounted() {
    try {
      this.myEvent = getData("event");
      console.log(this.$route.params.id);
      this.nextPage = eventNextStep(false);
      this.stepperTotal = eventStepperCalculator();
      this.stepperText =
        ": Services de restauration | " +
        this.myEvent.whereIam +
        "/" +
        this.stepperTotal;
      this.title = this.title + this.stepperText;
      let result = await axios.get(
        process.env.baseUrl + "/Eventserviceproviders/" + this.$route.params.id
      );
      this.restaurant = result.data;
      let allItems = result.data.items;
      if (this.myEvent.eventOrderDetails) {
        console.log("this.myEvent.eventOrderDetails");
        for (let i = 0; i < this.myEvent.eventOrderDetails.length; i++) {
          console.log(
            " for (let i = 0; i < this.myEvent.eventOrderDetails.length; i++)"
          );
          if (
            this.myEvent.eventOrderDetails[i].eventServiceProvider ==
            this.$route.params.id
          ) {
            console.log(
              "this.myEvent.eventOrderDetails[i].eventServiceProvider == this.$route.params.id"
            );
            console.log(this.myEvent.eventOrderDetails[i].articles.length);
            for (
              let j = 0;
              j < this.myEvent.eventOrderDetails[i].articles.length;
              j++
            ) {
              console.log("Articles ");
              if (
                this.myEvent.eventOrderDetails[i].articles[j].itemId ==
                this.$route.params.id
              ) {
                console.log("YES TRUUUE");
                this.itemAlreadyAdded = true;
                break;
              }
            }
          }
        }
      }
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id == this.$route.params.item) {
          this.myItem = allItems[i];
        }
      }
      console.log(this.restaurant);
      console.log(this.myItem);
      let myItemPrice = null;
      let myItemDiscount = null;
      if (this.myItem.disocunt) {
        myItemPrice =
          this.myItem.price -
          (this.myItem.price * this.myItem.disocunt.percentage) / 100;
        myItemDiscount = this.myItem.disocunt.percentage;
      } else {
        myItemPrice = this.myItem.price;
        myItemDiscount = 0;
      }
      this.itemForOrder = {
        firstImage: process.env.baseUrl + this.myItem.firstImage.url,
        itemId: this.myItem.id,
        name: this.myItem.name,
        price: myItemPrice,
        quantity: 0,
        comment: null,
        discount: myItemDiscount,
        unit: this.myItem.unit,
      };
      console.log("item");
      console.log(this.itemForOrder);
    } catch (error) {}
  },
  data() {
    return {
      order: {},
      dummyThing: {
        name: "dzd",
      },
      itemAlreadyAdded: false,
      itemForOrder: null,
      myItem: null,
      restaurant: null,
      myEvent: null,
      myItems: null,
      stepperTotal: null,
      stepperText: null,
      baseUrl: process.env.baseUrl,
      title: "Planifier mon evenement ",
      details: [
        {
          text: "Planifier mon evenement",
        },
        {
          text: "Services de restauration",
        },
        {
          text: "Dish-detail",
          active: true,
        },
      ],
    };
  },
  middleware: "authentication",
  computed: {},
  methods: {
    routerGo(pages) {
      this.$router.go(pages);
    },
    calculateQuantity(operation) {
      if (operation == "add") {
        this.itemForOrder.quantity = this.itemForOrder.quantity + 1;
        if (this.itemForOrder.price > 0) {
          this.itemForOrder.subTotal =
            this.itemForOrder.quantity * this.itemForOrder.price;
        } else if (this.itemForOrder.pric < 0) {
          this.itemForOrder.subTotal = -1;
        } else {
          this.itemForOrder.subTotal = 0;
        }
      } else {
        if (this.itemForOrder.quantity > 0) {
          this.itemForOrder.quantity = this.itemForOrder.quantity - 1;
          if (this.itemForOrder.price > 0) {
            this.itemForOrder.subTotal =
              this.itemForOrder.quantity * this.itemForOrder.price;
          } else {
            this.itemForOrder.subTotal = -1;
          }
        }
      }
    },

    //dddddddddddddddddddddddddddddddddddd Bellow are my own methods

    addItemtoCart() {
      console.log(this.itemForOrder);
      let myEvent = getData("event");
      console.log(myEvent);
      if (this.itemForOrder.price > 0) {
          this.itemForOrder.subTotal =
            this.itemForOrder.quantity * this.itemForOrder.price;
        } else if (this.itemForOrder.pric < 0) {
          this.itemForOrder.subTotal = -1;
        } else {
          this.itemForOrder.subTotal = 0;
        }
      if (myEvent.eventOrderDetails) {
        let foundSP = false;
        for (let i = 0; i < myEvent.eventOrderDetails.length; i++) {
          if (
            myEvent.eventOrderDetails[i].eventServiceProvider ==
            this.$route.params.id
          ) {
            foundSP = true;
            myEvent.eventOrderDetails[i].articles.push(this.itemForOrder);

            if (this.itemForOrder.subTotal > 0) {
              myEvent.eventOrderDetails[i].subTotal =
                myEvent.eventOrderDetails[i].subTotal +
                this.itemForOrder.subTotal;
            } else {
              myEvent.eventOrderDetails[i].status.push({
              name: "pendingQuote",
              comment:
                "En attendant la révision finale et la validation du fournisseur. ",
              date: new Date(),
            });
            }
          }
        }
        if (!foundSP) {
          let toInseretSubTotal = 0;
          let myNextStatus = [
            {
              name: "created",
              comment: "La commande a été créée par le client",
              date: new Date(),
            },
            {
              name: "pendingQuote",
              comment:
                "En attendant la révision finale et la validation du fournisseur. ",
              date: new Date(),
            },
          ];
          if (this.itemForOrder.subTotal > 0) {
            toInseretSubTotal = this.itemForOrder.subTotal;
            myNextStatus = [
              {
                name: "created",
                comment: "La commande a été créée par le client",
                date: new Date(),
              },
              {
                name: "pendingValidation",
                comment: "Article ajouté, en attente du devis du fournisseur",
                date: new Date(),
              },
            ];
          }

          let newEventOrderDetails = {
            eventServiceProvider: this.$route.params.id,
            eventServiceProviderName: this.restaurant.knownName,
            articles: [this.itemForOrder],
            subTotal: toInseretSubTotal,
            discount: null,
            status: myNextStatus,
            type: "restauration",
          };

          myEvent.eventOrderDetails.push(newEventOrderDetails);
        }
        persistData("event", myEvent);
      } else {
        let toInseretSubTotal = 0;
        let myNextStatus = [
          {
            name: "created",
            comment: "La commande a été créée par le client",
            date: new Date(),
          },
          {
            name: "pendingValidation",
            comment:
              "En attendant la révision finale et la validation du fournisseur. ",
            date: new Date(),
          },
        ];
        if (this.itemForOrder.subTotal > 0) {
          toInseretSubTotal = this.itemForOrder.subTotal;
        } else {
          myNextStatus = [
            {
              name: "created",
              comment: "La commande a été créée par le client",
              date: new Date(),
            },
            {
              name: "pendingQuote",
              comment: "Article ajouté, en attente du devis du fournisseur",
              date: new Date(),
            },
          ];
        }
        let newEventOrderDetails = {
          eventServiceProvider: this.$route.params.id,
          eventServiceProviderName: this.restaurant.knownName,
          articles: [this.itemForOrder],
          subTotal: toInseretSubTotal,
          discount: null,
          status: myNextStatus,
          type: "restauration",
        };
        myEvent.eventOrderDetails = [newEventOrderDetails];
      }
      this.itemAlreadyAdded = true;
      // console.log(myEvent);
      persistData("event", myEvent);
      this.$router.go();
      console.log(getData("event"));
    },
  },
};
</script>