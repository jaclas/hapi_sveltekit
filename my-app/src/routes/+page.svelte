<script>
    /** @type {import('./$types').PageData} */
    export let data;
    console.log("data in /+page.svelte: ", JSON.stringify(data));
</script>

<div class="container">
    <h1>root index</h1>
    <p>/index.svelte</p>

    <a href="/about">About</a>
</div>

<style lang="css">
    .container {
        background-color: rgb(216, 252, 209);
    }
</style>
