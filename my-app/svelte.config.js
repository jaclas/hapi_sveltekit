import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".page"],
	kit: {
		adapter: adapter(),
		files: {
			assets: 'static',
			hooks: 'src/hooks',
			lib: 'src/lib'
		}
	}
};

export default config;
