<template>
  <div>
    <PageHeader :title="title" :details="details" />
    <b-button @click="routerGo(-1)" class="mt-3" variant="primary">
      <i class="uil-arrow-left"> </i> Page précédente</b-button
    >
    <div class="row mt-3">
      <div class="col-lg-12" v-if="placeData">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-xl-5">
                <div class="product-detail">
                  <b-tabs pills vertical nav-wrapper-class="col-3">
                    <b-tab
                      v-for="(pic, index) in placeData.images"
                      :key="index"
                    >
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
                      serviceProvider.knownName
                    }}</a>
                  </h5>
                  <h4 class="font-size-20 mb-3">{{ placeData.name }}</h4>
                  <!-- <div class="text-muted">
                    <span class="badge bg-success font-size-14 me-1"
                      ><i class="mdi mdi-star"></i> 4.2</span
                    >
                    234 Reviews
                  </div> -->

                  <div v-if="placeData.disocunt">
                    <div
                      v-if="
                        placeData.price -
                          (placeData.price * placeData.disocunt.percentage) /
                            100 >
                        0
                      "
                    >
                      <h5 class="mb-4 pt-2">
                        <del class="text-muted me-2"
                          >{{ placeData.price }} dh / {{ placeData.unit }}</del
                        >{{
                          placeData.price -
                          (placeData.price * placeData.disocunt.percentage) /
                            100
                        }}
                        dh / {{ placeData.unit }}
                        <span class="text-danger font-size-14 ml-2"
                          >- {{ placeData.disocunt.percentage }} % Off</span
                        >
                      </h5>
                    </div>
                    <div v-else>
                      <h5 class="mb-4 pt-2 text-success">Gratuit</h5>
                    </div>
                  </div>
                  <h5 class="mb-4 pt-2" v-else>
                    <div v-if="placeData.price > 0">
                      {{ placeData.price }}
                      dh / {{ placeData.unit }}
                    </div>
                    <div v-if="placeData.price < 0">
                      <h5 class="mb-4 pt-2 text-primary">Sur devis</h5>
                    </div>
                    <div v-if="placeData.price == 0">
                      <h5 class="mb-4 pt-2 text-success">Gratuit</h5>
                    </div>
                  </h5>
                  <p class="text-muted mb-4">
                    {{ placeData.description }}
                  </p>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="mt-3">
                        <h5 class="font-size-14">Specification :</h5>

                        <ul class="list-unstyled product-desc-list text-muted">
                          <li
                            v-for="(spec, index) in placeData.specification"
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
                          Order option
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
                                <b-button
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
                                >
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
                                    placeholder="Enter the details for special order..."
                                  />
                                  <div class="input-group-append">
                                    <button
                                      @click="addItemtoCart"
                                      class="btn btn-light mx-2"
                                      type="button"
                                    >
                                      Add to cart
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-else>
                            <h6 class="text-success">
                              <i class="fas fa-check mx-3"></i> Added to cart
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

/**
 * Product-detail component
 */
import {
  getData,
  eventStepperCalculator,
  persistData,
} from "../../../../../components/controllers/savingData";
export default {
  head() {
    return {
      title: `${this.title} |  Admin Dashboard`,
    };
  },

  async mounted() {
    this.myEvent = getData("event");
    if (this.myEvent.eventOrderDetails) {
      for (let i = 0; i < this.myEvent.eventOrderDetails.length; i++) {
        if (
          this.myEvent.eventOrderDetails[i].eventServiceProvider ==
          this.$route.params.service.split("++")[1]
        ) {
          for (
            let j = 0;
            j < this.myEvent.eventOrderDetails[i].articles.length;
            j++
          ) {
            if (
              this.myEvent.eventOrderDetails[i].articles[j].itemId ==
              this.$route.params.service.split("++")[0]
            ) {
              this.itemAlreadyAdded = true;
              break;
            }
          }
        }
      }
    }
    
    this.stepperTotal = eventStepperCalculator();
    this.stepperText =
      ": Autre services | " +
      this.myEvent.whereIam +
      "/" +
      this.stepperTotal;
    this.title = this.title + this.stepperText;
    console.log(this.$route.param);
    
    let placeID = this.$route.params.service.split("++")[0];
    let serviceProviderID = this.$route.params.service.split("++")[1];
    this.placeID = placeID;
    this.baseUrl = process.env.baseUrl;

    try {
      // /Eventserviceproviders/6196730106b47e37eca51d28
      let result = await axios.get(
        this.baseUrl + "/Eventserviceproviders/" + serviceProviderID
      );
      result = result.data;
      this.serviceProvider = result;
      this.placeData = null;
      for (let i = 0; i < this.serviceProvider.items.length; i++) {
        if (result.items[i].id == this.placeID) {
          this.placeData = result.items[i];
          break;
        }
      }
      console.log(this.placeData);
      this.itemForOrder.name = this.placeData.name;
      this.itemForOrder.itemId = this.placeData.id;
      this.itemForOrder.price = this.placeData.price;
      if (this.placeData.disocunt) {
        this.itemForOrder.discount = this.placeData.disocunt.percentage;
      } else {
        this.itemForOrder.discount = 0;
      }

      this.itemForOrder.unit = this.placeData.unit;
    } catch (error) {}
  },
  data() {
    return {
      myEvent: null,
      stepperTotal: null,
      stepperText: null,
      title: null,
      placeID: null,
      baseUrl: null,
      itemForOrder: {
        itemId: null,
        name: null,
        price: null,
        discount: null,
        quantity: 0,
        comment: null,
        unit: null,
        subTotal: null,
      },
      serviceProvider: null,
      placeData: null,
      itemAlreadyAdded: false,
      title: "Planifier mon evenement",
      details: [
        {
          text: "Planifier mon evenement",
        },
        {
          text: "Autre Services",
          active: true,
        },
      ],
    };
  },
  middleware: "authentication",
  computed: {},
  methods: {
    //dddddddddddddddddddddddddddddddddddd Bellow are my own methods
    routerGo(pages) {
      this.$router.go(pages);
    },
    calculateQuantity(operation) {
      if (operation == "add") {
        this.itemForOrder.quantity = this.itemForOrder.quantity + 1;
        if (this.itemForOrder.price > 0) {
          this.itemForOrder.subTotal =
            this.itemForOrder.quantity *
            (this.itemForOrder.price -
              (this.itemForOrder.price * this.itemForOrder.discount) / 100);
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
              this.itemForOrder.quantity *
              (this.itemForOrder.price -
                (this.itemForOrder.price * this.itemForOrder.discount) / 100);
          } else {
            this.itemForOrder.subTotal = -1;
          }
        }
      }
    },

    addItemtoCart() {
      console.log(this.itemForOrder);
      let myEvent = getData("event");
      console.log(myEvent);
      if (myEvent.eventOrderDetails) {
        let foundSP = false;
        for (let i = 0; i < myEvent.eventOrderDetails.length; i++) {
          if (
            myEvent.eventOrderDetails[i].eventServiceProvider ==
            this.$route.params.service.split("++")[1]
          ) {
            foundSP = true;
            myEvent.eventOrderDetails[i].articles.push(this.itemForOrder);
            if (this.itemForOrder.subTotal > 0) {
              myEvent.eventOrderDetails[i].subTotal =
                myEvent.eventOrderDetails[i].subTotal +
                this.itemForOrder.subTotal;
            }
          }
        }
        if (!foundSP) {
          let toInseretSubTotal = 0;
          if (this.itemForOrder.subTotal > 0) {
            toInseretSubTotal = this.itemForOrder.subTotal;
          }
          let newEventOrderDetails = {
            eventServiceProvider: this.$route.params.service.split("++")[1],
               eventServiceProviderName: this.serviceProvider.knownName,
            articles: [this.itemForOrder],
            subTotal: toInseretSubTotal,
            discount: null,
            status: [
              {
                name: "created",
                comment: "La commande a été créée par le client",
                date: new Date(),
              },
            ],
            type: "service",
          };
          myEvent.eventOrderDetails.push(newEventOrderDetails);
        }
      } else {
        let toInseretSubTotal = 0;
        if (this.itemForOrder.subTotal > 0) {
          toInseretSubTotal = this.itemForOrder.subTotal;
        }
        let newEventOrderDetails = {
          eventServiceProvider: this.$route.params.service.split("++")[1],
             eventServiceProviderName: this.serviceProvider.knownName,
          articles: [this.itemForOrder],
          subTotal: toInseretSubTotal,
          discount: null,
          status: [
            {
              name: "created",
              comment: "La commande a été créée par le client",
              date: new Date(),
            },
          ],
          type: "service",
        };
        myEvent.eventOrderDetails = [newEventOrderDetails];
      }
      this.itemAlreadyAdded = true;
      // console.log(myEvent);
      persistData("event", myEvent);
      this.$router.go()
      console.log(getData("event"));
    },
  },
};
</script>