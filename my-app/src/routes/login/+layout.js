import { browser } from "$app/env";

/** @type {import('./$types').Load} */
export async function load({ parent }) {
    const stuff = await parent();
    console.log("------load in /login/__layout.svelte-------");
    console.log("load() /login/__layout.svelte => browser: ", browser);
    console.log("load() /login/__layout.svelte => parent() (stuff): ", stuff);
    // const url = `http://localhost:5173/login/data.json`;
    // const response = await fetch(url);

    // output:
    //   status, props, stuff, dependencies, error, redirect and cache
    return {
        stuff: { message: "stuff from /login/__layout.svelte", stuff },
        layout: "__layout.svelte",
    };
}
