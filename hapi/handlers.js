import JWT from "jsonwebtoken";

export {
    whoamiHandler,
    logonHandler,
    logoutHandler,
    sessionValidateJWT,
    registerServerEvents,
    key
}

const key = "bardzo długie hasło o tajemnejy treści";

/**
 * @param {Hapi.Request} request
 * @param {Hapi.ResponseToolkit} h
 * @returns Lifecycle.ReturnValue
 */
 async function whoamiHandler(request, h) {
    try {
        //console.log("whoami() => request.auth = %o", request.auth);
        console.log("whoami() => request.auth.credentials = %o", request.auth.credentials);
        let result;
        if (request.auth?.credentials?.hasOwnProperty("id")) {
            // if (request.auth.credentials.expires < Date.now()) {
            //     console.log("ValidateAuth positive, but session expires, I remove the cookie!");
            //     //request.cookieAuth.clear();
            //     result = {
            //         statusCode: 401,
            //         message: "logged out"
            //     };
            // } else {
                const expires = request.auth.credentials.expires;

                result = {
                    statusCode: 200,
                    ttl: expires - Date.now(),
                    user: request.auth.credentials.user,
                    message: "logged in"
                };
            //}
        } else {
            result = {
                statusCode: 401,
                message: "not logged in"
            };
        }

        return h.response(result).message(result.message);
    } catch (error) {
        console.error("loggedinHandler() error => %o", error);
        throw error;
    }
}


const getLogOnData = (login) => {
    return {
        id: 10,
        username: login,
        hash: "haszyk"
    };
}    


/**
 * @param {Hapi.Request} request
 * @param {Hapi.ResponseToolkit} h
 * @returns Lifecycle.ReturnValue
 */
async function logonHandler(request, h) {
    try {
        const email = request.payload?.email;
        const password = request.payload?.password;
        console.log("logonHandler() => email: %s, password: %s", email, password);

        const logonData = await getLogOnData(email);
        console.log("logonHandler() => getLogOnData() => %o", logonData);
        let result;
        let statusCode = 200;
        let message = "OK";
        if (logonData.hash === "haszyk") {
            const credentials = {
                id: logonData.id,
                expires: 500000,
                username: logonData.username,
                scope: ["user", "user_" + logonData.id]
            };
            result = {
                id: logonData.id,
                username: logonData.username
            };
            const cookie_options = {
                ttl: 10 * 60 * 1000, // expires a 10 minutes from now
                encoding: "none", // we already used JWT to encode
                isSecure: true, // warm & fuzzy feelings
                isHttpOnly: true, // prevent client alteration
                clearInvalid: false, // remove invalid cookies
                strictHeader: true // don't allow violations of RFC 6265
            };
            const token = JWT.sign(credentials, key); // synchronous
            console.log("logonHandler() => token = " + token);

            return h.response(result).header("Authorization", token).state("token", token, cookie_options).code(statusCode).message(message);
        }

        statusCode = 403,
        message = "Logon failed";

        return h.response(result).code(statusCode).message(message);

    } catch (error) {
        console.error("logonHandler() error => %o", error);
        throw error;
    }
}

/**
 * @param {Hapi.Request} request
 * @param {Hapi.ResponseToolkit} h
 * @returns Lifecycle.ReturnValue
 */
async function logoutHandler(request, h) {
    try {
        console.log("logoutHandler()");
        // request.auth.isAuthenticated() => true/false
        request.cookieAuth.clear();

        return true;
    } catch (error) {
        console.error("logoutHandler() error => %o", error);
        throw error;
    }
}

/**
 * @param {string} decoded
 * @param {Hapi.Request} request
 * @param {Object} session user session object
 * @returns {Object} validation object
 */
 async function sessionValidateJWT(decoded, request, session) {
    console.log("sessionValidateJWT: %o", decoded);
    return {
        isValid: true,
        credentials: decoded
    };
}


function registerServerEvents(server) {
    // server.ext("onPreAuth", (request, h) => {
    //     console.log("onPreAuth");

    //     return h.continue;
    // });

    // server.ext("onCredentials", (request, h) => {
    //     console.log("onCredentials");

    //     //console.log((request.auth);
    //     return h.continue;
    // });

    server.ext("onPostAuth", (request, h, error) => {
        if (request.payload) {
            console.log(`onPostAuth:bodyPayload: ${JSON.stringify(request.payload)}`);
        } else {
            console.log("onPostAuth");
        }

        return h.continue;
    });

    // server.ext("onPreHandler", (request, h) => {
    //     console.log("onPreHandler");

    //     return h.continue;
    // });

    // server.ext("onPostHandler", (request, h) => {
    //     console.log("onPostHandler");

    //     return h.continue;
    // });

    // server.ext("onPreResponse", (request, h) => {
    //     if (request && request.response && request.response.source) {
    //         try {
    //             const url = request.path;
    //             let frag = JSON.stringify(request.response.source);
    //             if (frag.length > 256) {
    //                 frag = frag.substring(0, 80);
    //             }
    //             let header =  JSON.stringify(request.response.headers);
    //             console.log(`onPreResponse(${url}): ${frag} [${header}]`);
    //         } catch (err) {
    //             console.warn(err);
    //             console.log(h.request.response.source.toString());
    //         }
    //     } else {
    //         console.log("onPreResponse");
    //     }

    //     return h.continue;
    // });

    server.ext("onPostResponse", (request, h) => {
        if (request && request.response && request.response.source) {
            try {
                const url = request.path;
                let frag = JSON.stringify(request.response.source);
                if (frag.length > 256) {
                    frag = frag.substring(0, 80);
                }
                let header = "without set cookie"
                if (request.response.headers["set-cookie"]) {
                   header =  JSON.stringify(request.response.headers);
                }
                console.log(`[${(new Date()).toLocaleTimeString()}] onPostResponse(${url}): ${frag} [${header}]`);
            } catch (err) {
                console.warn(err);
                console.log(h.request.response.source.toString());
            }
        } else {
            console.log(`[${(new Date()).toLocaleTimeString()}] onPostResponse`);
        }

        return h.continue;
    });
}
