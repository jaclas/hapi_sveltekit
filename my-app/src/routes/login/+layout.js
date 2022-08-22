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
    console.log("------load() in /login/+layout.js -------");
    const stuff = await loadParameters.parent();
    console.log("load() /login/+layout.js => data: ", loadParameters.data);
    console.log("load() /login/+layout.js => parent() (stuff): ", stuff);
    // const url = `http://localhost:5173/login/data.json`;
    // const response = await fetch(url);

    const output = {
        stuff: stuff ,
        level3: "from /login/+layout.js"
    };
    console.log("load() /login/+layout.js => output: ", JSON.stringify(output));
    console.log("==========END of load in /login/+layout.js =========");
    return output;
}
