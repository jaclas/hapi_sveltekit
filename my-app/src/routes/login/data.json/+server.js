
/** @type {import('./$types').RequestHandler} */
export async function GET(getParameters) {
    console.log("------GET in /login/data.json/+server.js -------");
    
    // console.log("locals: ", locals);
    // console.log("params: ", params);
    // console.log("platform: ", platform);
    // console.log("request: ", request);
    // console.log("routeId: ", routeId);
    // console.log("url: ", url);
    getParameters.setHeaders({ 
      "access-control-allow-origin": "*"
    });
  
    const output = {
      number: Math.floor(Math.random() * 1000),
      message: "Hello World!"
    };
    console.log("GET() /login/data.json/+server.js => output: ", JSON.stringify(output));
    console.log("==========END of GET() in /login/data.json/+server.js =========");

    return new Response(output);
  }