<script>
    //throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

    import { browser } from "$app/env";
    //throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

    export let loggedin = "empty";
    export let data = "empty";

    import { enhance } from "$lib/form";
    import { goto, beforeNavigate } from "$app/navigation";

    beforeNavigate((navigation) => {
        console.log("beforeNavigate() /login/index.svelte => navigation: ", navigation);
    });

    const result = async () => {
        console.log('load() /login/index.svelte => goto("/about")');
        await goto("/about");
    };

    function error({ error }) {
        // show for example alert "invalid password or email"
    }
</script>

<div class="container">
    <div>logged in: {JSON.stringify(data.loggedin)}</div>
    <div>zgeta in: {JSON.stringify(data)}</div>
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
