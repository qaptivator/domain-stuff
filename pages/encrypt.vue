<template>
	<div class="p-4 text-xl">
		<h1>> encrypt/decrypt string</h1>
		<p>encrypt or decrypt a string with a key using AES-256</p>
		<p class="mb-8 text-sm opacity-30">
			heavily inspired by
			<NuxtLink
				to="https://encryptstring.com/"
				target="_blank"
			>
				encryptstring.com
			</NuxtLink>
		</p>
		<p class="mb-1">String</p>
		<textarea
			v-model="formString"
			type="text"
			autocomplete="off"
			placeholder="Paste/type your plain or encrypted string"
			class="mb-4 border p-2 w-full max-w-[30rem] rounded-lg bg-slate-100"
		/>
		<p class="mb-1">Password</p>
		<input
			v-model="formPassword"
			type="password"
			autocomplete="off"
			placeholder="Type your password"
			class="border p-2 w-full max-w-[30rem] rounded-lg bg-slate-100 mb-16"
		/>
		<p class="mb-1">Your encrypted or decrypted string</p>
		<textarea
			readonly
			v-model="formResult"
			autocomplete="off"
			class="border p-2 w-full max-w-[30rem] rounded-lg bg-slate-100"
		/>
	</div>
</template>
<script lang="ts">
import CryptoJS from 'crypto-js'
export default {
	name: 'Encrypt',
	data() {
		return {
			formString: '',
			formPassword: '',
			formResult: '',
		}
	},
	mounted() {},
	computed: {
		validateForm() {},
	},
	watch: {
		formString() {
			this.submitForm()
		},
		formPassword() {
			this.submitForm()
		},
	},
	methods: {
		autoEncryptDecrypt(input: string, key: string): string {
			try {
				const bytes = CryptoJS.AES.decrypt(input, key)
				const decryptedText = bytes.toString(CryptoJS.enc.Utf8)

				if (decryptedText) {
					return decryptedText
				}
			} catch (error) {}

			return CryptoJS.AES.encrypt(input, key).toString()
		},
		submitForm() {
			if (!this.formString || !this.formPassword) {
				this.formResult = ''
				return
			}

			const result = this.autoEncryptDecrypt(this.formString, this.formPassword)
			if (!result) {
				console.error('Failed to encrypt/decrypt string!')
				return
			}

			this.formResult = result
		},
		routerPush(to: any) {
			this.$router.push(to)
		},
	},
}
</script>
