import { browser } from "$app/env";

/** @type {import('./$types').Load} */
export function load() {
    console.log("------load in /__layout.svelte-------");
    // input:
    //   url, params, props, fetch, session, stuff,  error
    console.log("load() /__layout.svelte => browser: ", browser);
    // const url = `http://localhost:5173/login/data.json`;
    // const response = await fetch(url);

    // output:
    //   status, props, stuff, dependencies, error, redirect and cache
    return {
        message: "stuff from /__layout.svelte",
        layout: "__layout.svelte"
    };
}
