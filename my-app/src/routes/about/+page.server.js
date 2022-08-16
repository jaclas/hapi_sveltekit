import { browser } from "$app/env";

/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load({clientAddress, locals, params, platform, request, routeId, url, setHeaders}) {
    console.log("------GET in about/index.js------");
    console.log("GET() /about/index.js => browser: ", browser);
    // console.log("clientAddress: ", clientAddress);
    // console.log("locals: ", locals);
    // console.log("params: ", params);
    // console.log("platform: ", platform);
    // console.log("request: ", request);
    // console.log("routeId: ", routeId);
    // console.log("url: ", url);

    //throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
    setHeaders({
      'access-control-allow-origin': '*'
    });
    return {
        number: Math.floor(Math.random() * 1000)
    };
  }