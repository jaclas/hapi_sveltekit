
/** @type {import('./$types').PageServerLoad} */
export async function load(loadParameters) {
    /* input:
    * clientAddress: string;
    * locals: App.Locals;
	* params: Params;
    * platform: Readonly<App.Platform>;
    * request: Request;
	* routeId: string | null;
	! setHeaders: (headers: ResponseHeaders) => void;
	* url: URL;
	! parent: () => Promise<ParentData>;
    */    
    const stuff = await loadParameters.parent();
    console.log("------load in /+page.server.js------");
    console.log("load() /+page.server.js => locals: ", loadParameters.locals);
    console.log("load() /+page.server.js => parent(): ", stuff);
    console.log("load() /+page.server.js => routeId: ", loadParameters.routeId);
    console.log("load() /+page.server.js => url.href: ", loadParameters.url.href);
    const output = {
        level1: {
            page: {
                server: "from /+page.server.js"        
            }
        }    
    };
    console.log("load() /+page.server.js => output: ", JSON.stringify(output));
    console.log("==========END of load in /+page.server.js =========");
    return output;
  }