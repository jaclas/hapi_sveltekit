<script context="module">
    import { browser } from "$app/env";

    /** @type {import('./__types/__layout).Load} */
    export async function load({ params, fetch, session, stuff }) {
        console.log("------load in /__layout.svelte-------");

        // input:
        //   url, params, props, fetch, session, stuff,  error
        console.log("load() /__layout.svelte => browser: ", browser);
        // const url = `http://localhost:5173/login/data.json`;
        // const response = await fetch(url);

        // output:
        //   status, props, stuff, dependencies, error, redirect and cache
        return {
            status: 200,
            stuff: {
                message: "stuff from /__layout.svelte",
            },
            props: {
                layout: "__layout.svelte",
            },
        };
    }
</script>

<script>
    let x = Math.floor(Math.random() * 100);
</script>

<div class="container">
    <div>layout menu [{x}]</div>
    <p>rendered in browser: {browser}</p>
    <nav class="menu">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/login">Login</a>
    </nav>
    <slot />
</div>

<style lang="css">
    .menu {
        display: flex;
        background-color: orange;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
    .container {
        background-color: bisque;
    }
</style>
