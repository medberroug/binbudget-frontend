<template src="../../static/suppCongrats.html"></template>

<script>
import axios from "axios";
export default {
  layout: "home",
  data() {
    return {
      fields: [],
      file: "",
      file2: "",
      formData: new FormData(),
      accountType: "events",
      uploadLoader: false,
      fileMissing: false,

      accountInfo: {
        agreed: false,
        knowenName: null,
        legalName: null,
        description: null,
        email: null,
        ICE: null,
        IF: null,
        RC: null,
        logoPath: null,
        bannerPath: null,
        address: {
          city: null,
          street: null,
        },
      },
    };
  },
  methods: {
    changeAccountType(account) {
      if (account == "events") {
        this.accountType = "events";
      } else {
        this.accountType = "restauration";
      }
      console.log(this.accountInfo);
    },
    async addSupplier() {
      if (
        !this.accountInfo.knowenName ||
        !this.accountInfo.legalName ||
        !this.accountInfo.description ||
        !this.accountInfo.email ||
        !this.accountInfo.ICE ||
        !this.accountInfo.IF ||
        !this.accountInfo.RC ||
        !this.accountInfo.logoPath ||
        !this.accountInfo.bannerPath ||
        !this.accountInfo.agreed ||
        !this.accountInfo.address.city ||
        !this.accountInfo.address.street
      ) {
        this.fileMissing = true;
      } else {
        if ((this.accountType = "events")) {
          let result = await axios.post(
            process.env.baseUrl + "/eventserviceproviders",
            {
              status: false,
              ratingTotal: 5,
              knownName: this.accountInfo.knowenName,
              smallDescription: this.accountInfo.description,
              knownName: this.accountInfo.knowenName,
              address: {
                street: this.accountInfo.address.street,
                city: this.accountInfo.address.city,
                state: this.accountInfo.address.city,
                country: "Maroc",
              },
              email: this.accountInfo.email,
              rating: [
                {
                  rating: 5,
                  comment: "Évaluation initiale",
                },
              ],
              logo: {
                id: this.accountInfo.logoPath,
              },
              topImage: {
                id: this.accountInfo.bannerPath,
              },
              ICE: this.accountInfo.ICE,
              IF: this.accountInfo.IF,
              RC: this.accountInfo.RC,
              legalName: this.accountInfo.legalName,
              accountManager: "621d2f0f3539334bd4a092e4",
            }
          );
        } else {
            let result = await axios.post(
            process.env.baseUrl + "/restauration",
            {
              status: false,
              ratingTotal: 5,
              knownName: this.accountInfo.knowenName,
              smallDescription: this.accountInfo.description,
              knownName: this.accountInfo.knowenName,
              address: {
                street: this.accountInfo.address.street,
                city: this.accountInfo.address.city,
                state: this.accountInfo.address.city,
                country: "Maroc",
              },
              email: this.accountInfo.email,
              rating: [
                {
                  rating: 5,
                  comment: "Évaluation initiale",
                },
              ],
              logo: {
                id: this.accountInfo.logoPath,
              },
              topImage: {
                id: this.accountInfo.bannerPath,
              },
              ICE: this.accountInfo.ICE,
              IF: this.accountInfo.IF,
              RC: this.accountInfo.RC,
              legalName: this.accountInfo.legalName,
              accountManager: "621d2f0f3539334bd4a092e4",
            }
          );
        }
      }
    },
    async handleFileUpload(type) {
      this.uploadLoader = true;
      let formData = new FormData();
      formData.append("files", this.$refs.file.files[0]);
      let myImage = await axios
        .post(process.env.baseUrl + "/upload", formData)
        .catch((err) => {
          this.fileMissing = true;
        });
      myImage = myImage.data[0];
      console.log(myImage);
      this.fields.push({
        id: myImage.id,
        name: myImage.name,
        url: process.env.baseUrl + myImage.url,
      });
      if (type == "logo") {
        this.accountInfo.logoPath = myImage.id;
      } else {
        this.accountInfo.bannerPath = myImage.id;
      }
      this.uploadLoader = false;
    },
    async handleFileUpload2(type) {
      this.uploadLoader = true;
      let formData = new FormData();
      formData.append("files", this.$refs.file2.files[0]);
      let myImage = await axios
        .post(process.env.baseUrl + "/upload", formData)
        .catch((err) => {
          this.fileMissing = true;
        });
      myImage = myImage.data[0];
      console.log(myImage);
      this.fields.push({
        id: myImage.id,
        name: myImage.name,
        url: process.env.baseUrl + myImage.url,
      });
      if (type == "logo") {
        this.accountInfo.logoPath = myImage.id;
      } else {
        this.accountInfo.bannerPath = myImage.id;
      }
      this.uploadLoader = false;
    },
  },
};
</script>
