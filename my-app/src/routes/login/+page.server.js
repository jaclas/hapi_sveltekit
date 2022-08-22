import { browser } from "$app/env";
import cookie from "cookie";



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
    console.log("------load() in /login/+page.server.js-------");
    const stuff = await loadParameters.parent();
    console.log("load() /login/+page.server.js => browser: ", browser);
    console.log("load() /login/+page.server.js => locals: ", loadParameters.locals);
    console.log("load() /login/+page.server.js => parent(): ", stuff);
    console.log("load() /login/+page.server.js => routeId: ", loadParameters.routeId);
    console.log("load() /login/+page.server.js => url.href: ", loadParameters.url.href);

    let token = undefined;
    const cookiezy = loadParameters.request.headers.get("cookie");
    if (cookiezy) {
        const cookieRecord = cookie.parse(cookiezy);
        if (cookieRecord.token) {
            token = cookieRecord.token;
        }
    }    
    console.log("load() /login/+page.server.js => request.headers.cookie[\"token\"]: ", token);
    
    let url = "http://localhost:3030/api/whoami";
    console.log("load() /login/+page.server.js => call fetch(%s)", url);
    const response = await fetch(url, {
                                method: "GET", 
                                mode: "cors",
                                // headers: [
                                //     ["Cookie", token]
                                // ],
                                // headers: {
                                //     "content-type": "application/json",
                                //     "cookie": token
                                // },
                                headers: [
                                    ["Content-Type", "application/json"],
                                    ["cookie", `token=${token}`]
                                ],
                                credentials: "include",
                                cache: "no-cache"
                            });
    const r = await response.json()

    const output = {
        level2: {
            page: {
                pageserverget: "from GET() in /login/+page.server.js"                
            }
        },
        loggedin: r,
    };

    console.log("load() /login/+page.server.js => response output: ", output);
    console.log("==========END of load() in /login/+page.server.js =========");

    return output;
}

/** @type {import('@sveltejs/kit').Action} */
export async function POST({ request, url, locals, setHeaders }) {
    console.log("------POST in /login/+page.server,js-------");
    console.log("POST() /login/+page.server.js => browser: ", browser);
    const data = await request.formData(); // or .json(), or .text(), etc

    const email = data.get("email");
    const password = data.get("password");    

    console.log("POST() /login/+page.server.js => input email: %s, password = %s", email, password);
    const payload = {
        email: email,        
        password: password
    };
    let _url = "http://localhost:3030/api/logon";
    console.log("POST() /login/+page.server.js => call fetch(%s)", _url);
    locals.user  = {test: 123};
    const response = await fetch(_url, {
                                        method: "POST", 
                                        mode: "cors",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        credentials: "include",
                                        cache: "no-cache",
                                        body: JSON.stringify(payload)
                                    });
    const r = await response.json();                                
    let s = "";
    if (response.headers.get("set-cookie")) {
        s = response.headers.get("set-cookie");
        console.log("POST() /login/+page.server.js => set-cookie: %s", s);
    }    
 
    console.log("POST() /login/+page.server.js => response: %o", r);
  
    setHeaders({ 
        "set-cookie": s
    });
    console.log("==========END of POST() in /login/+page.server.js =========");
}