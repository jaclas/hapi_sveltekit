
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
    console.log("------load in /login/+page.js-------");
    const stuff = await loadParameters.parent();
    console.log("load() /login/+page.js => data (props): ", JSON.stringify(loadParameters.data));
    console.log("load() /login/+page.js => parent() (stuff): ", JSON.stringify(stuff));
    let url = `http://localhost:5173/login/data.json`;
    //console.log("load() /login/index.svelte => call fetch(%s)", url);
    //const response = await fetch(url);

    //res = response.ok && (await response.json());
    //console.log("load() /login/index.svelte => response: ", res);
    let output = {
        "/login/+page.js" : {
            data: loadParameters.data,
            parent: stuff,
            level: 2
        },
    };

    console.log("load() /login/+page.js => output: ");
    console.dir(output, {depth: 5});
    console.log("==========END of load in /login/+page.js =========");
    return output;
}
