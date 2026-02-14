<template>
	<div class="p-4 text-xl">
		<h1>> mcuuid</h1>
		<p class="mb-8">
			get player UUID from username, with support for both official and pirated
			accounts,<br />or get the username from the UUID! (official only)
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
		<div class="mb-4 flex items-center gap-2">
			<p>Type</p>
			<select
				v-model="formMode"
				class="border p-1 rounded-lg bg-slate-100"
			>
				<option value="online">Official Minecraft / Online Mode</option>
				<option value="offline">
					Pirated/Cracked Minecraft / Offline Mode
				</option>
				<option value="format">Format/prettify the UUID</option>
			</select>
		</div>
		<div class="mb-16 flex items-center gap-2">
			<p>Format</p>
			<select
				v-model="formFormat"
				class="border p-1 rounded-lg bg-slate-100"
			>
				<option value="pretty">Pretty / Dashes</option>
				<option value="raw">Raw / No dashes</option>
			</select>
		</div>
		<div>
			<p class="mb-1">Result</p>
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
// @ts-ignore
import CryptoJS from 'crypto-js'
import axios from 'axios'
export default {
	name: 'Encrypt',
	data() {
		return {
			formString: '',
			formMode: 'online' as 'online' | 'offline' | 'format',
			formFormat: 'pretty' as 'pretty' | 'raw',
			formResult: '',
			typingTimer: null as NodeJS.Timeout | null,
		}
	},
	mounted() {},
	computed: {
		validateForm() {},
	},
	watch: {
		formString() {
			if (this.typingTimer) clearTimeout(this.typingTimer)
			this.typingTimer = setTimeout(() => {
				this.submitForm()
			}, 500)
		},
		formMode() {
			this.submitForm()
		},
		formFormat() {
			this.submitForm()
		},
	},
	methods: {
		async submitForm() {
			if (!this.formString || !this.formMode) {
				this.formResult = ''
				return
			}

			const result = await this.convertMcuuid(
				this.formString.trim(),
				this.formMode,
				this.formFormat
			)
			if (!result) {
				this.formResult = 'Failed to get the UUID!'
				console.error('Failed to get the UUID!')
				return
			}

			this.formResult = result
		},
		async fetchGet(url: string): Promise<{ data: any }> {
			try {
				const res = await fetch(url)
				if (!res.ok) return { data: undefined }
				const data = await res.json()
				return { data }
			} catch (e) {
				return { data: undefined }
			}
		},
		async convertMcuuid(
			nameOrId: string,
			mode: 'online' | 'offline' | 'format',
			format: 'pretty' | 'raw'
		): Promise<string | undefined> {
			const dashify = (str: string) =>
				str.replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5')
			const dedashify = (str: string) => str.replace(/-/g, '')

			if (mode === 'online') {
				try {
					// First attempt: Treat input as Username -> Get UUID
					const res = await this.fetchGet(
						`https://corsproxy.io/?https://api.mojang.com/users/profiles/minecraft/${nameOrId}`
					)
					let id = res.data?.id

					// Second attempt: Treat input as UUID -> Get Username
					if (!id) {
						const res2 = await this.fetchGet(
							`https://corsproxy.io/?https://sessionserver.mojang.com/session/minecraft/profile/${dedashify(
								nameOrId
							)}`
						)
						return res2.data?.name || undefined
					}

					return format === 'pretty' ? dashify(id) : id
				} catch (e) {
					return undefined
				}
			} else if (mode === 'offline') {
				// 1. Get MD5 Bytes
				const hash = CryptoJS.MD5(`OfflinePlayer:${nameOrId}`)
				const words = hash.words

				// 2. UUID v3 specific bit-flipping (Minecraft requirement)
				// Set version to 3 (Name-based MD5)
				words[1] = (words[1] & 0xffff0fff) | 0x00003000
				// Set variant to IETF
				words[2] = (words[2] & 0x3fffffff) | 0x80000000

				const raw = hash.toString(CryptoJS.enc.Hex)
				return format === 'pretty' ? dashify(raw) : raw
			} else if (mode === 'format') {
				const raw = dedashify(nameOrId)
				return format === 'pretty' ? dashify(raw) : raw
			}
			return undefined
		},
		routerPush(to: any) {
			this.$router.push(to)
		},
	},
}
</script>
