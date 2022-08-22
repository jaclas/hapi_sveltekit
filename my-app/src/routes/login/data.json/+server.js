
/** @type {import('./$types').RequestHandler} */
export async function GET(getParameters) {
    /* input:
    * clientAddress: string;
    * locals: App.Locals;
	  * params: Params;
    * platform: Readonly<App.Platform>;
    * request: Request;
	  * routeId: string | null;
   	! setHeaders: (headers: ResponseHeaders) => void;
	  * url: URL;
    */    
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
  
    let output = {
      "/login/data.json/+server.js" : {
          locals: getParameters.locals,
          level: 2
      },
    };
    console.log("GET() /login/data.json/+server.js => output: ");
    console.dir(output, {depth: 5});
    console.log("==========END of GET() in /login/data.json/+server.js =========");

    return new Response(output);
  }