<template>
	<div class="p-4 text-xl">
		<h1>> domain lookup</h1>
		<p>check the availability of a given domain name</p>
		<p class="mb-8 text-sm opacity-30">
			powered by
			<NuxtLink
				to="https://1.1.1.1/"
				target="_blank"
			>
				Cloudflare DNS
			</NuxtLink>
		</p>
		<div class="flex w-full max-w-80">
			<input
				type="url"
				autocomplete="off"
				class="border p-2 grow w-40 rounded-l-lg bg-slate-100"
				placeholder="your domain name"
				v-model="domainName"
				@keyup.enter="submitForm"
			/>
			<button
				type="button"
				class="border p-2 px-4 disabled:opacity-30 rounded-r-lg bg-slate-200"
				:disabled="!validateForm"
				@click="submitForm"
			>
				go
			</button>
		</div>
		<p
			v-if="loading"
			class="my-8"
		>
			loading...
		</p>
		<p
			v-if="errorStatus"
			class="my-8 text-red-500"
		>
			{{ errorStatus }}
		</p>
		<div
			v-if="submitted && domainResult"
			class="mt-8"
		>
			the domain is <b>taken</b> :(
		</div>
		<div
			v-if="submitted && !domainResult"
			class="mt-8"
		>
			the domain is <b>available</b>!! :D
		</div>
		<div
			v-if="submitted"
			class="mt-4"
		>
			see the
			<a
				:href="`https://${actualDomainName}`"
				target="_blank"
				>website</a
			>
			at the domain
		</div>
	</div>
</template>

<script lang="ts">
import axios from 'axios'
export default {
	name: 'Lookup',
	data() {
		return {
			domainName: '',
			domainResult: false,
			errorStatus: '',
			loading: false,
			submitted: false,
		}
	},
	mounted() {},
	computed: {
		validateForm() {
			return this.domainName && this.domainName !== ''
		},
		actualDomainName() {
			return this.domainName.replace(/(^\w+:|^)\/\//, '')
		},
	},
	methods: {
		openWindow(url: string | URL) {
			if (window) window.open(url, '_blank')
		},
		notEmpty(v: any): boolean {
			return v ? true : false
		},
		routerPush(to: any) {
			this.$router.push(to)
		},
		openDomainWebsite() {
			this.openWindow(`https://${this.actualDomainName}`)
		},
		async submitForm() {
			if (!this.validateForm) {
				this.errorStatus = 'form is invalid'
				return
			}
			this.submitted = false
			this.errorStatus = ''
			this.loading = true

			this.domainToIpLookup(this.actualDomainName)
				.then((result) => {
					this.loading = false
					this.domainResult = this.notEmpty(result) // string to boolean
					this.submitted = true
				})
				.catch((error) => {
					this.loading = false
					console.log('domainToIpLookup error status:', error)
					this.errorStatus =
						'an error occured when querying dns, try again later'
				})
		},
		async domainToIpLookup(domain: string): Promise<string> {
			return new Promise((resolve, reject) => {
				axios
					.get('https://cloudflare-dns.com/dns-query', {
						params: {
							name: domain,
							type: 'A',
						},
						headers: {
							Accept: 'application/dns-json',
						},
						timeout: 5000,
					})
					.then((res) => {
						const data: any = res.data
						const status: number = data.Status

						switch (status) {
							case 0:
								if (data?.Answer && data?.Answer.length > 0) {
									resolve(data.Answer[0].data)
								} else {
									reject('NOANSWER')
								}
								break
							case 1:
								reject('FORMERR')
								break
							case 2:
								reject('SERVFAIL')
								break
							case 3:
								resolve('') // NXDOMAIN -> Domain does not exist
								break
							case 4:
								reject('NOTIMP')
								break
							case 5:
								reject('REFUSED')
								break
							case 6:
								reject('YXDOMAIN')
								break
							case 7:
								reject('XRRSET')
								break
							case 8:
								reject('NOTAUTH')
								break
							case 9:
								reject('NOTZONE')
								break
							default:
								reject('NOSTATUS')
						}
					})
					.catch((error) => {
						if (error?.response) {
							reject(error.response)
						} else if (error?.request) {
							reject(error.request)
						} else {
							reject(error.message)
						}
					})
			})
		},
	},
}
</script>
