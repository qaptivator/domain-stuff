//import { nodePolyfills } from "vite-plugin-node-polyfills";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	app: {
		head: {
			title: 'domain stuff',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{
					hid: 'description',
					name: 'description',
					content: 'a bunch of tools for domain names',
				},
			],
			link: [
				{ rel: 'shortcut icon', type: 'image/x-icon', href: 'favicon.ico' },
				{
					rel: 'stylesheet',
					href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.15.6/katex.min.css',
				},
			],
			script: [
				{
					src: 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.js',
					defer: true,
					crossorigin: 'anonymous',
					integrity:
						'sha384-Rma6DA2IPUwhNxmrB/7S3Tno0YY7sFu9WSYMCuulLhIqYSGZ2gKCJWIqhBWqMQfh',
				},
				{
					src: 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/contrib/auto-render.min.js',
					defer: true,
					crossorigin: 'anonymous',
					integrity:
						'sha384-hCXGrW6PitJEwbkoStFjeJxv+fSOOQKOPbJxSfM6G5sWZjAyWhXiTIIAmQqnlLlh',
					onload: 'renderMathInElement(document.body);',
				},
			],
		},
		baseURL: '/domain-stuff/',
		buildAssetsDir: 'assets',
	},
	vite: {
		//plugins: [nodePolyfills()],
	},
	modules: ['@nuxtjs/tailwindcss'], // "@nuxt/test-utils/module"
	css: ['~/assets/css/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
})
