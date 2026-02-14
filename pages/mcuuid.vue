<template>
	<div class="p-4 text-xl">
		<h1>> mcuuid</h1>
		<p class="mb-8">
			get player UUID from username, with support for both official and pirated
			accounts, or get the username from the UUID! (official only)
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
				<option value="pretty">Pretty/Dashed</option>
				<option value="raw">Raw/Undashed</option>
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
		formMode() {
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
				this.formString,
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
		async convertMcuuid(
			nameOrId: string,
			mode: 'online' | 'offline' | 'format',
			format: 'pretty' | 'raw'
		): Promise<string | undefined> {
			const dashify = (str: string | undefined) => {
				return str
					? str.replace(
							/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/,
							'$1-$2-$3-$4-$5'
					  )
					: undefined
			}
			const dedashify = (str: string | undefined) => {
				return str ? str.replace(/-/g, '') : undefined
			}
			if (mode === 'online') {
				let fetchRes
				try {
					fetchRes = await axios.get(
						`https://corsproxy.io/?https://api.mojang.com/users/profiles/minecraft/${nameOrId}`
					)
				} catch (error) {}
				let returnRes = fetchRes?.data?.id ? fetchRes.data.id : undefined
				if (!returnRes) {
					try {
						fetchRes = await axios.get(
							`https://corsproxy.io/?https://sessionserver.mojang.com/session/minecraft/profile/${nameOrId}`
						)
					} catch (error) {
						//console.error('Error fetching data from Mojang API:', error)
					}
					returnRes = fetchRes?.data?.name ? fetchRes.data.name : undefined
				}
				returnRes = dedashify(returnRes)
				return format === 'pretty' ? dashify(returnRes) : returnRes

				// console.error('Error fetching data from Mojang API:', error)
			} else if (mode === 'offline') {
				const raw = CryptoJS.MD5(`OfflinePlayer:${nameOrId}`).toString()
				return format === 'pretty' ? dashify(raw) : raw
			} else if (mode === 'format') {
				const raw = dedashify(nameOrId)
				return format === 'pretty' ? dashify(raw) : raw
			}
			return
		},
		routerPush(to: any) {
			this.$router.push(to)
		},
	},
}
</script>
