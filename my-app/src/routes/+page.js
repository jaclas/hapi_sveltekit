import mergician from "mergician";

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
        level1: {
            page: {
                pagejs: "from /+page.js"        
            }
        }
    };
    output = mergician(output, loadParameters.data);
    output = mergician(output, stuff);
    console.log("load() /+page.js => output: ", JSON.stringify(output));
    console.log("==========END of load in /+page.js =========");
    return output;
}
