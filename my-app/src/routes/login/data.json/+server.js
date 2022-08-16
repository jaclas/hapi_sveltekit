import { json as json$1 } from '@sveltejs/kit';
import { browser } from "$app/env";


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({clientAddress, locals, params, platform, request, routeId, url}) {
    console.log("------GET in /login/data.json-------");
    console.log("GET() /login/data.json => browser: ", browser);
    // console.log("locals: ", locals);
    // console.log("params: ", params);
    // console.log("platform: ", platform);
    // console.log("request: ", request);
    // console.log("routeId: ", routeId);
    // console.log("url: ", url);

    return json$1({
  number: Math.floor(Math.random() * 1000),
  message: "Hello World!"
}, {
      headers: {
        'access-control-allow-origin': '*'
      }
    });
  }