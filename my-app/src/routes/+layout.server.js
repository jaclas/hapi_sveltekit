import { browser } from "$app/env";

/** @type {import('./$types').LayoutServerLoad} */
export async function load(loadParameters) {
    console.log("------load in /+layout.server.js------");
    console.log("load() /+layout.server.js => browser: ", browser);
    console.log("load() /+layout.server.js => locals: ", loadParameters.locals);
    const output = {
        level1: {
            layout: {
                server: "from /+layout.server.js"        
            }
        }    
    };
    console.log("load() /+layout.server.js => output: ", JSON.stringify(output));
    return output;
  }