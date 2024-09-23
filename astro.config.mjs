import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import tailwind from '@astrojs/tailwind'
import storyblok from '@storyblok/astro'

const { STORYBLOK_LOCAL, STORYBLOK_ACCESS_TOKEN, STORYBLOK_REGION } = loadEnv(process.env.NODE_ENV, process.cwd(), '')

const isLocal = STORYBLOK_LOCAL === 'yes'
const localConfig = {
	server: {
		https: true,
	},
	vite: {
		plugins: [mkcert()],
	},
}

// https://astro.build/config
export default defineConfig({
	integrations: [
		storyblok({
			accessToken: STORYBLOK_ACCESS_TOKEN,
			apiOptions: {
				region: STORYBLOK_REGION,
			},
			components: {
				page: 'storyblok/Page',
				feature: 'storyblok/Feature',
				grid: 'storyblok/Grid',
				teaser: 'storyblok/Teaser',
			},
		}),
		tailwind(),
	],
	...(isLocal && localConfig),
})
