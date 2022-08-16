import { browser } from "$app/env";

/** @type {import('./$types').Load} */
export async function load({data, parent}) {
    const stuff = await parent();
    console.log("------load in /login/index.svelte-------");
    console.log("load() /login/index.svelte => browser: ", browser);
    console.log("load() /login/index.svelte => data (props): ", data);
    console.log("load() /login/index.svelte => parent() (stuff): ", stuff);
    let url = `http://localhost:5173/login/data.json`;
    //console.log("load() /login/index.svelte => call fetch(%s)", url);
    //const response = await fetch(url);

    let res = "jakieś coś";
    //res = response.ok && (await response.json());
    //console.log("load() /login/index.svelte => response: ", res);
    return {
        ...data,
        stuff
    };
}
