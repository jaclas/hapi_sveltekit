<script context="module">
    import { browser } from "$app/env";

    /** @type {import('./__types/index).Load} */
    export async function load({ params, fetch, session, props, stuff }) {
        console.log("------load in /login/index.svelte-------");

        console.log("load() /login/index.svelte => browser: ", browser);
        console.log("load() /login/index.svelte => props: ", props);
        console.log("load() /login/index.svelte => stuff: ", stuff);
        let url = `http://localhost:5173/login/data.json`;
        //console.log("load() /login/index.svelte => call fetch(%s)", url);
        //const response = await fetch(url);

        let res = "jakieś coś";
        //res = response.ok && (await response.json());
        //console.log("load() /login/index.svelte => response: ", res);
        return {
            //status: response.status,
            status: 200,
            props,
        };
    }
</script>

<script>
    export let loggedin = "empty";
    export let zgeta = "empty";

    import { enhance } from "$lib/form";
    import { goto } from "$app/navigation";

    const result = async () => {
        console.log('load() /login/index.svelte => goto("/about")');
        const endpoint = new URL(`http://localhost:5173/about`);
        await goto(endpoint);
    };

    function error({ error }) {
        // show for example alert "invalid password or email"
    }
</script>

<div class="container">
    <div>logged in: {JSON.stringify(loggedin)}</div>
    <div>zgeta in: {JSON.stringify(zgeta)}</div>
    <form method="POST" use:enhance="{{ result, error }}">
        <fieldset>
            <input autocomplete="email" name="email" type="email" required placeholder="Email" value="email@post.pl" />
        </fieldset>
        <fieldset>
            <input
                autocomplete="current-password"
                name="password"
                type="password"
                required
                placeholder="Password"
                value="haseło"
            />
        </fieldset>
        <button class="btn" type="submit"> Sign in </button>
    </form>
</div>

<style lang="css">
    .container {
        background-color: rgb(255, 229, 225);
    }
    .btn {
        background-color: rgb(255, 165, 0);
        min-width: 100px;
    }
</style>
