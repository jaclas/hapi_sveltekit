<script context="module">
    import { browser } from "$app/env";

    /** @type {import('./__types/__layout).Load} */
    export async function load({ params, fetch, session, stuff }) {
        // input:
        //   url, params, props, fetch, session, stuff, status and error
        console.log("------load in /login/__layout.svelte-------");
        console.log("load() /login/__layout.svelte => browser: ", browser);
        // const url = `http://localhost:5173/login/data.json`;
        // const response = await fetch(url);

        // output:
        //   status, props, stuff, dependencies, error, redirect and cache
        return {
            status: 200,
            stuff: { message: "stuff from /login/__layout.svelte", stuff },
            props: {
                layout: "__layout.svelte",
            },
        };
    }
</script>

<p>login/layout rendered in browser: {browser}</p>

<slot />
