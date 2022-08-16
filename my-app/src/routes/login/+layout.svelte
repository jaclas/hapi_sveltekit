<script>
    //throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");
    import { browser } from "$app/env";
</script>

<p>login/layout rendered in browser: {browser}</p>

<slot />
