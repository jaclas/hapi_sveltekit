import { browser } from "$app/env";
import cookie from "cookie";



/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load({ request, locals }) {
    console.log("------GET in /login/index.js-------");
    console.log("GET() /login/index.js => browser: ", browser);

    let token = undefined;
    const cookiezy = request.headers.get("cookie");
    if (cookiezy) {
        const cookieRecord = cookie.parse(cookiezy);
        if (cookieRecord.token) {
            token = cookieRecord.token;
        }
    }    
    console.log("GET() /login/index.js => request.headers.cookie[\"token\"]: ", token);
    console.log("GET() /login/index.js => locals: ", JSON.stringify(locals));
    
    let url = "http://localhost:3030/api/whoami";

    console.log("GET() /login/index.js => call fetch(%s)", url);
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
    const body = {
        zgeta: "Hello z GETa w /login/index.js!",
        loggedin: r,
      }
    console.log("GET() /login/index.js => response body: ", body);

    return body;
}

/** @type {import('@sveltejs/kit').Action} */
export async function POST({ request, url, locals, setHeaders }) {
    console.log("------POST in /login/index,js-------");
    console.log("POST() /login/index.js => browser: ", browser);
    const data = await request.formData(); // or .json(), or .text(), etc

    const email = data.get("email");
    const password = data.get("password");    

    console.log("POST() /login/index.js => input email: %s, password = %s", email, password);
    const payload = {
        email: email,        
        password: password
    };
    let _url = "http://localhost:3030/api/logon";
    console.log("POST() /login/index.js => call fetch(%s)", _url);
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
        console.log("POST() /login/index.js => set-cookie: %s", s);
    }    
 
    console.log("POST() /login/index.js => response: %o", r);
  
    setHeaders({ 
        "set-cookie": s
    });
    return;
      const endpoint = new URL(`http://${url.host}/login`);

      throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
      return {
        headers: { 
          Location: endpoint.toString(),
          "set-cookie": s
       },
        status: 302
      }
    
    throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
    return { 
        status: 200,
        body: {
            zgeta: "Hello zposta w /login/index.js!",
            loggedin: r
        },
        headers: {
            'set-cookie': s
          } 
    };
}