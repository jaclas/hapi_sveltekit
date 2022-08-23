<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <title>About</title>
</svelte:head>

<div class="container">
    <h1>about site</h1>
    <p>/about/index.svelte</p>
    <p>data: {JSON.stringify(data)}</p>

    <a href="/">Home</a>
</div>

<style lang="css">
    .container {
        background-color: rgb(181, 210, 247);
    }
</style>
