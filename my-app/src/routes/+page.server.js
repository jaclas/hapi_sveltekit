
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
    console.log("------load() in /+page.server.js------");
    console.log("load() /+page.server.js => locals: ", loadParameters.locals);
    console.log("load() /+page.server.js => parent(): ", stuff);
    let output = {
        "/+page.server.js" : {
            locals: loadParameters.locals,
            parent: stuff,
            level: 1
        },
    };

    console.log("load() /+page.server.js => output: ")
    console.dir(output, {depth: 5});
    console.log("==========END of load() in /+page.server.js =========");
    return output;
  }