import mergician from "mergician";
import { dataset_dev } from "svelte/internal";

/** @type {import('./$types').PageLoad} */
export async function load(loadParameters) {
    /* input:
    ! fetch(info: RequestInfo, init?: RequestInit): Promise<Response>;
	* params: Params;
	* data: Data;
	* routeId: string | null;
	! setHeaders: (headers: ResponseHeaders) => void;
	* url: URL;
	! parent: () => Promise<ParentData>;
	* depends: (...deps: string[]) => void;
    */
    console.log("------load in /+page.js-------");
    const stuff = await loadParameters.parent();
    console.log("load() /+page.js => data (props): ", loadParameters.data);
    console.log("load() /+page.js => parent() (stuff): ", stuff);
    //res = response.ok && (await response.json());
    //console.log("load() /login/index.svelte => response: ", res);
    let output = {
        "/+page.js" : {
            data: loadParameters.data,
            parent: stuff,
            level: 1
        },
    };
    console.log("load() /+page.js => output: ");
    console.dir(output, {depth: 5});
    console.log("==========END of load in /+page.js =========");
    return output;
}
