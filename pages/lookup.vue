<template>
  <div class="p-4 text-xl">
    <div>> domain lookup</div>
    <p class="mb-8">check the availability of a given domain name</p>
    <input
      type="url"
      class="border p-2 w-80"
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
    <p v-if="loading" class="my-8">loading...</p>
    <p v-if="errorStatus" class="my-8 text-red-500">{{ errorStatus }}</p>
    <div v-if="submitted && domainResult" class="mt-8">
      the domain is <i>taken</i> :(
    </div>
    <div v-if="submitted && !domainResult" class="mt-8">
      the domain is <i>available</i>!! :D
    </div>
    <div v-if="submitted" class="mt-4">
      see the
      <a class="font-bold cursor-pointer" @click="openNewTab(domainName)"
        >website</a
      >
      at the domain
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
export default {
  name: "IndexPage",
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
  },
  methods: {
    openNewTab(url) {
      window.open(`https://${url}`, "_blank");
    },
    pushto(to: any) {
      this.$router.push(to);
    },
    async submitForm() {
      if (!this.validateForm) return;
      this.submitted = false;
      this.errorStatus = "";

      this.loading = true;
      let [result, error, status] = await this.domainToIpLookup(
        this.domainName
      );
      this.loading = false;

      if (error) {
        this.errorStatus =
          "an error occured when querying dns, try again later";
        console.log("dns error, status:", status);
        return;
      }

      this.domainResult = result!!; // string to boolean
      this.submitted = true;
    },
    async domainToIpLookup(domain: string): Promise<[string, boolean, string]> {
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
                  resolve([data.Answer[0].data, false, "NOERROR"]);
                } else {
                  resolve(["", false, "NOERROR"]); // DNS Query completed successfully
                }
                break;
              case 1:
                resolve(["", true, "FORMERR"]); // DNS Query Format Error
                break;
              case 2:
                resolve(["", true, "FORMERR"]); // Server failed to complete the DNS request
                break;
              case 3:
                resolve(["", false, "NXDOMAIN"]); // Domain name does not exist
                break;
              case 4:
                resolve(["", true, "NOTIMP"]); // Function not implemented
                break;
              case 5:
                resolve(["", true, "REFUSED"]); // The server refused to answer for the query
                break;
              case 6:
                resolve(["", true, "YXDOMAIN"]); // Name that should not exist, does exist
                break;
              case 7:
                resolve(["", true, "XRRSET"]); // RRset that should not exist, does exist
                break;
              case 8:
                resolve(["", true, "NOTAUTH"]); // Server not authoritative for the zone
                break;
              case 9:
                resolve(["", true, "NOTZONE"]); // Name not in zone
                break;
              default:
                resolve(["", true, "NOSTATUS"]); // Invalid status, not in 0-9 range (made by me)
            }
          })
          .catch((error) => {
            if (error?.response) {
              resolve(["", true, error.response]);
            } else if (error?.request) {
              resolve(["", true, error.request]);
            } else {
              resolve(["", true, error.message]);
            }
          });
      });
    },
  },
};
</script>
