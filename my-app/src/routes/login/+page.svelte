<script>
    import { browser } from "$app/environment";

    /** @type {import('./$types').PageData} */
    export let data;
    export let errors = null;

    import { enhance } from "$lib/form";
    import { goto, beforeNavigate } from "$app/navigation";

    beforeNavigate((navigation) => {
        console.log("beforeNavigate() /login/+page.svelte => navigation: ", navigation);
    });

    const _result = async () => {
        console.log('load() /login/+page.svelte => goto("/about")');
        await goto("/about");
    };

    function _error({ error }) {
        // show for example alert "invalid password or email"
    }
</script>

<div class="container">
    <!-- <div>logged in: {JSON.stringify(data.loggedin)}</div> -->
    <div>data: {JSON.stringify(data)}</div>
    <form method="POST" use:enhance="{{ _result, _error }}">
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
