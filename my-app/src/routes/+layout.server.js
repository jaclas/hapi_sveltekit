
/** @type {import('./$types').LayoutServerLoad} */
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
    console.log("------load in /+layout.server.js------");
    const stuff = await loadParameters.parent();
    console.log("load() /+layout.server.js => parent(): ", stuff);
    console.log("load() /+layout.server.js => locals: ", loadParameters.locals);
    let output = {
        "/+layout.server.js" : {
            locals: loadParameters.locals,
            parent: stuff,
            level: 1
        },
    };
    console.log("load() /+layout.server.js => output: ");
    console.dir(output, {depth: 5});
    console.log("==========END of load() in /+layout.server.js =========");
    return output;
  }