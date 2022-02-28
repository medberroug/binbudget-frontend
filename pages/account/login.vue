<script>
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";
import { getData, persistData } from "../../components/controllers/savingData";
/**
 * Login component
 */
export default {
  layout: "auth",
  head() {
    return {
      title: `Login | Clients - Binbudget`,
    };
  },
  data() {
    return {
      baseUrl: null,
      email: "",
      password: "",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
    };
  },
  validations: {
    email: {
      required,
    },
    password: {
      required,
    },
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 5 : 0;
    },
  },
  methods: {
    // Try to log the user in with the username
    // and password they provided.

    async tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        try {
          let result = await axios.post(process.env.baseUrl + "/auth/local", {
            identifier: this.email,
            password: this.password,
          });
          console.log(result.data);
          result = result.data;
          // console.log(result.data);
          if (result.user.role.name == "suppevent") {
            persistData("account", "event");
            let result2 = await axios.get(
              process.env.baseUrl +
                "/eventserviceproviders/" +
                result.user.userAccountId
            );
            let logo = process.env.baseUrl + result2.data.logo.url;
            let knowenName = result2.data.knownName;
            persistData("accountinfo", {
              id: result.user.userAccountId,
              type: "event",
              jwt: result.jwt,
              logo: logo,
              knowenName: knowenName,
              userName: result.user.username,
            });
            this.$router.push("/supplierevent");
          } else if (result.user.role.name == "supp") {
            persistData("account", "supplier");
            let result2 = await axios.get(
              process.env.baseUrl +
                "/restaurations/" +
                result.user.userAccountId
            );
            let logo = process.env.baseUrl + result2.data.logo.url;
            let knowenName = result2.data.knownName;
            persistData("accountinfo", {
              id: result.user.userAccountId,
              type: "restaurations",
              jwt: result.jwt,
              logo: logo,
              knowenName: knowenName,
              userName: result.user.username,
            });
            this.$router.push("/supplier");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<template>
  <div>
    <!-- <div class="home-btn d-none d-sm-block">
      <nuxt-link to="/" class="text-dark">
        <i class="mdi mdi-home-variant h2"></i>
      </nuxt-link>
    </div> -->
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <nuxt-link to="/" class="mb-5 d-block auth-logo">
                <img
                  src="~/assets/images/logo-large.png"
                  alt="logo"
                  width="20%"
                />
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Bienvenue !</h5>
                  <p class="text-muted">
                    Connectez-vous pour continuer à Binbudget.
                  </p>
                </div>
                <div class="p-2 mt-4">
                  <b-alert
                    v-model="isAuthError"
                    variant="danger"
                    class="mt-3"
                    dismissible
                    >{{ authError }}</b-alert
                  >

                  <div
                    v-if="notification.message"
                    :class="'alert ' + notification.type"
                  >
                    {{ notification.message }}
                  </div>

                  <b-form @submit.prevent="tryToLogIn">
                    <b-form-group
                      id="input-group-1"
                      label="Identifiant du compte"
                      label-for="input-1"
                      class="mb-3"
                    >
                      <b-form-input
                        id="input-1"
                        v-model="email"
                        type="text"
                        placeholder="Entrez le nom de l'utilisateur"
                        :class="{ 'is-invalid': submitted && $v.email.$error }"
                      ></b-form-input>
                      <div
                        v-if="submitted && $v.email.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.email.required"
                          >L'identifiant du compte est obligatoire.</span
                        >
                        <span v-if="!$v.email.email"
                          >Veuillez entrer un ID valide.</span
                        >
                      </div>
                    </b-form-group>

                    <b-form-group id="input-group-2" class="mb-3">
                      <div class="float-end">
                        <nuxt-link
                          to="/account/forgot-password"
                          class="text-muted"
                          >Mot de passe oublié ?</nuxt-link
                        >
                      </div>
                      <label for="input-2">Mot de passe</label>
                      <b-form-input
                        id="input-2"
                        v-model="password"
                        type="password"
                        placeholder="Entrez le mot de passe"
                        :class="{
                          'is-invalid': submitted && $v.password.$error,
                        }"
                      ></b-form-input>
                      <div
                        v-if="submitted && !$v.password.required"
                        class="invalid-feedback"
                      >
                        Un mot de passe est requis.
                      </div>
                    </b-form-group>
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="auth-remember-check"
                      />
                      <label class="form-check-label" for="auth-remember-check"
                        >Rappelez-vous de moi</label
                      >
                    </div>
                    <div class="mt-3 text-end">
                      <b-button
                        type="submit"
                        variant="primary"
                        class="w-sm"
                        @click="tryToLogIn()"
                        >Se connecter</b-button
                      >
                    </div>
                    <!-- <div class="mt-4 text-center">
                      <div class="signin-other-title">
                        <h5 class="font-size-14 mb-3 title">Connectez-vous avec</h5>
                      </div>

                      <ul class="list-inline">
                        <li class="list-inline-item">
                          <a
                            href="javascript:void()"
                            class="social-list-item bg-primary text-white border-primary"
                          >
                            <i class="mdi mdi-facebook"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="javascript:void()"
                            class="social-list-item bg-info text-white border-info"
                          >
                            <i class="mdi mdi-twitter"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="javascript:void()"
                            class="social-list-item bg-danger text-white border-danger"
                          >
                            <i class="mdi mdi-google"></i>
                          </a>
                        </li>
                      </ul>
                    </div> -->

                    <div class="mt-4 text-center">
                      <p class="mb-0">
                        Vous n'avez pas de compte ?
                        <nuxt-link
                          to="/account/register"
                          class="fw-medium text-primary"
                          >S'inscrire maintenant</nuxt-link
                        >
                      </p>
                    </div>
                  </b-form>
                </div>
                <!-- end card-body -->
              </div>
              <!-- end card -->
            </div>
            <div class="mt-5 text-center">
              <p>© {{ new Date().getFullYear() }} Binbudget</p>
            </div>
            <!-- end row -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" module></style>
