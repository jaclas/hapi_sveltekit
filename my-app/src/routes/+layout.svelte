<script>
    //throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

    import { browser } from "$app/env";

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
