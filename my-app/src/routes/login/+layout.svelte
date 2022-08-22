<script>
    export let data = {};
    console.log("data in /login/+layout.svelte: ", JSON.stringify(data));
</script>

<div class="container">
    <div>/login/layout</div>
    <p>data in login/layout: {JSON.stringify(data)}</p>
    <slot />
</div>

<style lang="css">
    .container {
        background-color: rgb(170, 255, 213);
    }
</style>
