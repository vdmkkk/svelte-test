import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
	plugins: [
		sveltekit(),
		svgLoader({
		  }),
	]
});
