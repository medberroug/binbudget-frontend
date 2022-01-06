<template>
  <div>
    <PageHeader :title="title" :details="details" />
    <div>
      <nuxt-link :to="'/clients/restauration/livraison-de-repas/' + supplierID"
        ><button type="button" class="btn btn-primary btn-sm mt-3">
          <i class="mdi mdi-arrow-left me-1"></i> Retourner vers le fournisseur
        </button></nuxt-link
      >
    </div>
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
                        dh
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
                      dh
                    </div>
                    <div v-else>
                      <h5 class="mb-4 pt-2 text-success">Gratuit</h5>
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
                          Order option
                        </h5>
                        <div class="mt-3" v-if="!anotherSupplier">
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
                                  
                                   v-if="itemForOrder.quantity < 10"
                                  >+</b-button
                                >
                                  <b-button
                                  @click.prevent="calculateQuantity('add')"
                                  variant="outline-primary"
                                  disabled
                                     v-else
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
                             <b-alert show dismissible variant="primary" v-if="itemForOrder.quantity==10">Vous ne pouvez pas ajouter plus de 10 éléments dans ce type d'articles.</b-alert>
                          </div>
                           
                          <div v-else>
                            <h6 class="text-success" v-if="!anotherSupplier">
                              <i class="fas fa-check mx-3"></i> Already added to
                              cart
                            </h6>
                          </div>
                        </div>
                        <b-alert show variant="warning" v-if="anotherSupplier"
                          >Vous ne pouvez pas ajouter un article d'un autre
                          fournisseur à cette commande, vous devez créer une
                          autre commande.
                        </b-alert>
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
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import {
  persistData,
  getData,
} from "../../../../../components/controllers/savingData";

export default {
  head() {
    return {
      title: `${this.title} |  Admin Dashboard`,
    };
  },

  async mounted() {
    try {
      let result = await axios.get(
        process.env.baseUrl + "/restaurations/" + this.$route.params.id
      );
      this.restaurant = result.data;
      let allItems = result.data.items;
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
        itemID: this.myItem.id,
        name: this.myItem.name,
        price: myItemPrice,
        quantity: 0,
        comment: null,
        discount: myItemDiscount,
      };
      console.log("item");
      console.log(this.itemForOrder);
      this.supplierID = this.$route.params.id;
      if (getData("restauration")) {
        let myOrder = getData("restauration");
        console.log(this.$route.params.id != myOrder.linkedToSPItem.spID);
        if (this.$route.params.id != myOrder.linkedToSPItem.spID) {
          this.anotherSupplier = true;
        }
        for (let i = 0; i < myOrder.items.length; i++) {
          if (myOrder.items[i].itemID == this.$route.params.item) {
            this.itemAlreadyAdded = true;
          }
        }
      }
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
      supplierID: null,
      baseUrl: process.env.baseUrl,
      anotherSupplier: false,
      title: "Dish detail",
      details: [
        {
          text: "Dishes",
        },
        {
          text: "Dish-detail",
          active: true,
        },
      ],
    };
  },
  middleware: "authentication",
  computed: {
    ...mapGetters("products", {
      isItemInCart: "isProductInCart",
      getThisProductInCart: "fetchOneProduct",
    }),
  },
  methods: {
    ...mapActions("products", {
      addItemToCart: "addToCart",
      updateProductQuantity: "updateCartQuantity",
    }),
    addToCart() {
      this.addItemToCart({ product: this.dummyThing, quantity: 1 });
    },
    updateQuantity(type) {
      this.updateProductQuantity(type);
    },

    //dddddddddddddddddddddddddddddddddddd Bellow are my own methods
   
    calculateQuantity(operation) {
      if (operation == "add") {
        this.itemForOrder.quantity = this.itemForOrder.quantity + 1;
      } else {
        if (this.itemForOrder.quantity > 0) {
          this.itemForOrder.quantity = this.itemForOrder.quantity - 1;
        }
      }
    },

    async addItemtoCart() {
      let tvaRestauration = 0;
      try {
        let result = await axios.get(
          process.env.baseUrl + "/generalsettingsdefaults"
        );
        tvaRestauration = result.data.tvaRestauration;
      } catch (error) {}
      console.log(this.itemForOrder);
      if (!getData("restauration")) {
        let order = {
          type: "restauration",
          subType: "livraison-de-repas",
          byClient:getData('clientinfo').id,
          items: [this.itemForOrder],
          subTotal: this.itemForOrder.price * this.itemForOrder.quantity,
          tax: 0,
          total: 0,
          withDelivery: {
            city: null,
            state: null,
            street: null,
            country: null,
            fullName: null,
            phone: null,
          },
          linkedToSPItem: { type: "restauration", spID: this.$route.params.id },
          status: [{
            name: "created",
            comment: "Articles ajoutés au panier",
            date: new Date(),
          }],
          deliveryPrice: 15,
        };

        persistData("restauration", order);
        this.$router.go();
        this.itemAlreadyAdded = true;
      } else {
        let myOrder = getData("restauration");
        if (this.$route.params.id == myOrder.linkedToSPItem.spID) {
          myOrder.items.push(this.itemForOrder);
          myOrder.subTotal =
            myOrder.subTotal +
            this.itemForOrder.price * this.itemForOrder.quantity;
          persistData("restauration", myOrder);
          this.$router.go();
          this.itemAlreadyAdded = true;
        } else {
       
        }
      }
    },
  },
};
</script>