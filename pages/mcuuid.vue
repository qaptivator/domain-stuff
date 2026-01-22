<template>
	<div class="p-4 text-xl">
		<h1>> mcuuid</h1>
		<p class="mb-8">
			get player UUID from username, with support for both official and pirated
			accounts
		</p>
		<div class="mb-4">
			<p class="mb-1">Username/UUID</p>
			<textarea
				v-model="formString"
				type="text"
				autocomplete="off"
				placeholder="Paste/type your plain or encrypted string"
				class="border p-2 w-full max-w-[30rem] rounded-lg bg-slate-100"
			/>
		</div>
		<div class="mb-4">
			<p class="mb-1">Password</p>
			<input
				v-model="formPassword"
				type="password"
				autocomplete="off"
				placeholder="Type your password"
				class="border p-2 w-full max-w-[30rem] rounded-lg bg-slate-100"
			/>
		</div>
		<div class="mb-16 flex items-center gap-2">
			<p>Type</p>
			<select
				v-model="formMode"
				class="border p-1 rounded-lg bg-slate-100"
			>
				<option value="auto">Official Minecraft / Online Mode</option>
				<option value="encrypt">
					Pirated/Cracked Minecraft / Offline Mode
				</option>
				<option value="decrypt">Decrypt</option>
			</select>
		</div>
		<div>
			<p class="mb-1">Your encrypted or decrypted string</p>
			<textarea
				readonly
				v-model="formResult"
				autocomplete="off"
				class="border p-2 w-full max-w-[30rem] rounded-lg bg-slate-100"
			/>
		</div>
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
			formMode: 'auto', // auto, encrypt, decrypt
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
		formMode() {
			this.submitForm()
		},
	},
	methods: {
		autoEncryptDecrypt(input: string, key: string): string {
			if (this.formMode === 'encrypt') {
				return CryptoJS.AES.encrypt(input, key).toString()
			} else if (this.formMode === 'decrypt') {
				const bytes = CryptoJS.AES.decrypt(input, key)
				const decryptedText = bytes.toString(CryptoJS.enc.Utf8)
				return decryptedText
			} else {
				// auto
				try {
					const bytes = CryptoJS.AES.decrypt(input, key)
					const decryptedText = bytes.toString(CryptoJS.enc.Utf8)

					if (decryptedText) {
						return decryptedText
					}
				} catch (error) {}
				return CryptoJS.AES.encrypt(input, key).toString()
			}
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
