
async function getUserInformation(cookie) {
    console.log("getUserInformation() => cookie: ", cookie);
    const url = `http://localhost:5173/login/data.json`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    console.log("------handle in hooks------");
    console.log("handle() => hooks/index.js");
    
  //  event.locals.user = await getUserInformation(event.request.headers.get('cookie'));
    // event.locals.user = {username: "patrycjusz",
    //                     id: 2}

    event.locals.test = {
      "/hooks/index/js": "test"
    }
    const response = await resolve(event);
    console.log("============= END of handle in hooks =============");
    return response;
}


// /** @type {import('@sveltejs/kit').GetSession} */
// export function getSession(event) {
//     return event.locals.user
//       ? {
//           user: {
//             // only include properties needed client-side —
//             // exclude anything else attached to the user
//             // like access tokens etc
//             user: event.locals.user
//           }
//         }
//       : {};
// }