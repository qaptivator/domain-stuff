<template>
  <div class="p-4 text-xl">
    <h1>> domain lookup</h1>
    <p>check the availability of a given domain name</p>
    <p class="mb-8 text-sm opacity-30">powered by Google Public DNS</p>
    <div class="flex w-full max-w-80">
      <input
        type="url"
        class="border p-2 grow w-40"
        placeholder="your domain name"
        v-model="domainName"
        @keyup.enter="submitForm"
      />
      <button
        type="button"
        class="border p-2 px-4 disabled:opacity-30"
        :disabled="!validateForm"
        @click="submitForm"
      >
        go
      </button>
    </div>
    <p v-if="loading" class="my-8">loading...</p>
    <p v-if="errorStatus" class="my-8 text-red-500">{{ errorStatus }}</p>
    <div v-if="submitted && domainResult" class="mt-8">
      the domain is <b>taken</b> :(
    </div>
    <div v-if="submitted && !domainResult" class="mt-8">
      the domain is <b>available</b>!! :D
    </div>
    <div v-if="submitted" class="mt-4">
      see the
      <a :href="`https://${actualDomainName}`" target="_blank">website</a>
      at the domain
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
export default {
  name: "Lookup",
  data() {
    return {
      domainName: "",
      domainResult: false,
      errorStatus: "",
      loading: false,
      submitted: false,
    };
  },
  mounted() {},
  computed: {
    validateForm() {
      return this.domainName && this.domainName !== "";
    },
    actualDomainName() {
      return this.domainName.replace(/(^\w+:|^)\/\//, "");
    },
  },
  methods: {
    routerPush(to: any) {
      this.$router.push(to);
    },
    openDomainWebsite() {
      this.openWindow(`https://${this.actualDomainName}`);
    },
    async submitForm() {
      if (!this.validateForm) {
        this.errorStatus = "form is invalid";
        return;
      }
      this.submitted = false;
      this.errorStatus = "";
      this.loading = true;

      this.domainToIpLookup(this.actualDomainName)
        .then((result) => {
          this.loading = false;
          this.domainResult = this.notEmpty(result); // string to boolean
          this.submitted = true;
        })
        .catch((error) => {
          this.loading = false;
          console.log("domainToIpLookup error status:", error);
          this.errorStatus =
            "an error occured when querying dns, try again later";
        });
    },
    async domainToIpLookup(domain: string): Promise<string> {
      return new Promise((resolve, reject) => {
        axios
          .get("https://dns.google/resolve", {
            params: {
              name: domain,
            },
          })
          .then((res) => {
            const data: any = res.data;
            const status: number = data.Status;

            // https://help.dnsfilter.com/hc/en-us/articles/4408415850003-DNS-return-codes
            switch (status) {
              case 0:
                if (data?.Answer && data?.Answer.length > 0) {
                  resolve(data.Answer[0].data);
                } else {
                  reject("NOANSWER");
                  //resolve("");
                }
                break;
              case 1:
                reject("FORMERR"); // DNS Query Format Error
                break;
              case 2:
                reject("SERVFAIL"); // Server failed to complete the DNS request
                break;
              case 3:
                resolve(""); // Domain name does not exist
                break;
              case 4:
                reject("NOTIMP"); // Function not implemented
                break;
              case 5:
                reject("REFUSED"); // The server refused to answer for the query
                break;
              case 6:
                reject("YXDOMAIN"); // Name that should not exist, does exist
                break;
              case 7:
                reject("XRRSET"); // RRset that should not exist, does exist
                break;
              case 8:
                reject("NOTAUTH"); // Server not authoritative for the zone
                break;
              case 9:
                reject("NOTZONE"); // Name not in zone
                break;
              default:
                reject("NOSTATUS"); // Invalid status, not in 0-9 range (made by me)
            }
          })
          .catch((error) => {
            if (error?.response) {
              reject(error.response);
            } else if (error?.request) {
              reject(error.request);
            } else {
              reject(error.message);
            }
          });
      });
    },
  },
};
</script>
