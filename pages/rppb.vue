<template>
  <div class="p-4 text-xl">
    <h1>> replicate prediction preview builder (rppb)</h1>
    <p class="mb-8">
      generates a fancy preview for your Replicate image model predictions.<br />
      it will include the generated image, used prompt, replicate logo and model
      name.<br />
      you need to provide the Replicate API token and prediction id.<br />
      <!--you can also customize it by changing options below:-->
    </p>
    <div class="flex flex-col space-y-4">
      <input
        type="password"
        class="border p-2 w-96"
        placeholder="replicate api token"
        v-model="replicateApiToken"
      />
      <input
        type="text"
        class="border p-2 w-96"
        placeholder="prediction id"
        v-model="predictionId"
      />
      <button
        type="button"
        class="border p-2 px-4 disabled:opacity-30 w-min"
        :disabled="!validateForm"
        @click="submitForm"
      >
        go
      </button>
    </div>
    <p v-if="loading" class="my-8">loading...</p>
    <p v-if="errorStatus" class="my-8 text-red-500">{{ errorStatus }}</p>
  </div>
</template>
<script lang="js">
import Replicate from "replicate"
export default {
    name: 'Rppb',
    data() {
        return {
            replicateApiToken: "",
            predictionId: "",
            errorStatus: "",
            loading: false,
            submitted: false,
            replicateClient: null,
            prediction: null,
            model: null,
        };
    },
    computed: {
        validateForm() {
            return this.replicateApiToken && this.replicateApiToken !== "" && this.predictionId && this.predictionId !== "";
        },
    },
    methods: {
        async submitForm() {
            if (!this.validateForm) {
                this.errorStatus = "form is invalid";
                return;
            }
            this.submitted = false;
            this.errorStatus = "";
            this.loading = true;

            this.replicateClient = new Replicate({
                auth: this.replicateApiToken
            })
            if (!this.replicateClient) {
                this.errorStatus = "api token is invalid";
                return;
            }

            this.prediction = await this.replicateClient.predictions.get(this.predictionId)
            console.log(this.prediction)
        }
    },

};
</script>
<style lang="css"></style>
