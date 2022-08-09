import Hapi from '@hapi/hapi';
import hapiAuthCookie from "@hapi/cookie";
import hapiAuthJWT from "hapi-auth-jwt2";
import * as handlers from "./handlers.js";



const init = async () => {

    const server = Hapi.server({
        port: 3030,
        host: 'localhost',
        routes: {
            cors: 
                {
                    origin: ["*"], // an array of origins or 'ignore'
                    //headers: ["Authorization"], // an array of strings - 'Access-Control-Allow-Headers'
                    //exposedHeaders: ["Accept"], // an array of exposed headers - 'Access-Control-Expose-Headers',
                    //additionalExposedHeaders: ["Accept"], // an array of additional exposed headers
                    credentials: true // boolean - 'Access-Control-Allow-Credentials'
                }
        }
    });

    await server.register(hapiAuthJWT);
    await server.register([
        {
            plugin: hapiAuthCookie
        }
    ]);

    server.auth.strategy("jwt", "jwt",
                         {
                             key: handlers.key,
                             validate: handlers.sessionValidateJWT,
                             cookieKey: "token",
                             verifyOptions: {
                                 ignoreExpiration: true
                             }
                         });
    server.auth.default("jwt");

    server.route({
        method: "GET",
        path: "/",
        handler: (request, h) => {
            return "Server is up!";
        }
    });

    server.route({
        method: "GET",
        path: "/api/whoami",
        options: {
            handler: handlers.whoamiHandler,
            auth: {
                mode: "try" //"required"
            }
        }
    }),
    server.route({
        method: "POST",
        path: "/api/logon",
        options: {
            handler: handlers.logonHandler,
            auth: {
                mode: "try" //"required"
            }
        }
    }),
    server.route({
        method: "POST",
        path: "/api/logout",
        options: {
            handler: handlers.logoutHandler,
            auth: {
                mode: "try" //"required"
            // access: {
            //     scope: "any"
            // }
            }
        }
    });

    server.ext("onRequest", (request, h) => {
        console.log("");
        console.log(`request from ${request.info.remoteAddress}, ${request.method.toUpperCase()} ${request.path } => route: ${request.route.path}`);
        console.log(request.headers);
        return h.continue;
    });    

    handlers.registerServerEvents(server);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();