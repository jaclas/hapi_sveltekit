<script>
    import { browser } from "$app/env";
    export let data = {};
    console.log("data in /login/+layout.svelte: ", JSON.stringify(data));
</script>

<p>login/layout rendered in browser: {browser}</p>

<slot />
