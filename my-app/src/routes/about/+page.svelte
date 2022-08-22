<script>
    export let data = {};
    let x = Math.floor(Math.random() * 100);
</script>

<svelte:head>
    <title>About</title>
</svelte:head>

<div class="container">
    <h1>about site [{x}]</h1>
    <p>/about/index.svelte</p>
    <p>number: {data.number}</p>

    <a href="/">Home</a>
</div>

<style lang="css">
    .container {
        background-color: rgb(181, 210, 247);
    }
</style>
