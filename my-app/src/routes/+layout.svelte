<script>
    /** @type {import('./$types').LayoutData} */
    export let data;
    console.log("data in /+layout.svelte: ", JSON.stringify(data));
</script>

<div class="container">
    <div>/layout</div>
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
        background-color: rgb(248, 216, 177);
        border: 1px solid black;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
    .container {
        background-color: bisque;
    }
</style>
