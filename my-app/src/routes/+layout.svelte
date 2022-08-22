<script>
    import { browser } from "$app/env";

    /** @type {import('./$types').LayoutData} */
    export let data;
    console.log("data in /+layout.svelte: ", data);
</script>

<div class="container">
    <div>layout menu</div>
    <p>rendered in browser: {browser}</p>
    <p>data in root layout: {JSON.stringify(data)}</p>
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
