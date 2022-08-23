
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
    console.log("------load() in /about/+page.server.js------");
   
    console.log("load() /about/+page.server.js => locals: ", loadParameters.locals);
    console.log("load() /about/+page.server.js => parent(): ", stuff);

    //throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
    loadParameters.setHeaders({
      'access-control-allow-origin': '*'
    });
    let output = {
      "/about/+page.server.js" : {
          locals: loadParameters.locals,
          parent: stuff,
          level: 2
      },
    };
    console.dir(output, {depth: 5});
    console.log("==========END of load in /about/+page.server.js =========");
    return output;
  }