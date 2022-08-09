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

    return {
      status: 200,
      headers: {
        'access-control-allow-origin': '*'
      },
      body: {
        number: Math.floor(Math.random() * 1000),
        message: "Hello World!"
      }
    };
  }