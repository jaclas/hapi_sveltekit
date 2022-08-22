import * as logger from "$lib/logger.js";

/** @type {import('./$types').LayoutLoad} */
export async function load(loadParameters) {
    /* input:
    * fetch(info: RequestInfo, init?: RequestInit): Promise<Response>;
	* params: Params;
	* data: Data;
	* routeId: string | null;
	! setHeaders: (headers: ResponseHeaders) => void;
	* url: URL;
	! parent: () => Promise<ParentData>;
	* depends: (...deps: string[]) => void;
    */

    console.log("------load() in /+layout.js -------");
    const stuff = await loadParameters.parent();
    console.log("load() /+layout.js => data: ", loadParameters.data);
    console.log("load() /+layout.js => parent(): ", stuff);
    await logger.logInput("/+layout.js", loadParameters);
    // const url = `http://localhost:5173/login/data.json`;
    // const response = await fetch(url);

    const output = {
        level1: {
            layout: {
                both: "from /+layout.js"        
            }
        }    
    };

    console.log("load() /+layout.js => output: ", JSON.stringify(output));
    console.log("==========END of load in /+layout.js =========");
    return output;
}
