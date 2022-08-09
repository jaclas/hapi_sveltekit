import * as util_ from "node:util";

export {
    myInspect
};

//#region colors

// colors definitions:
// https://gist.github.com/raghav4/48716264a0f426cf95e4342c21ada8e7
function cyanBright(str) {
    if (browser) {
        return str;
    }
    return "\x1b[96m" + str + "\x1b[0m";
}
function red(str) {
    if (browser) {
        return str;
    }
    return "\x1b[31m" + str + "\x1b[0m";
}
function white(str) {
    if (browser) {
        return str;
    }
    return "\x1b[37m" + str + "\x1b[0m";
}
function green(str) {
    if (browser) {
        return str;
    }
    return "\x1b[32m" + str + "\x1b[0m";
}
function gray(str) {
    if (browser) {
        return str;
    }
    return "\x1b[90m" + str + "\x1b[0m";
}
function blueBright(str) {
    if (browser) {
        return str;
    }
    return "\x1b[94m" + str + "\x1b[0m";
}
function magentaBright(str) {
    if (browser) {
        return str;
    }
    return "\x1b[95m" + str + "\x1b[0m";
}
function whiteBright(str) {
    if (browser) {
        return str;
    }
    return "\x1b[97m" + str + "\x1b[0m";
}
function greenBright(str) {
    if (browser) {
        return str;
    }
    return "\x1b[92m" + str + "\x1b[0m";
}
//#endregion

const browser = typeof util_.inspect === "undefined";
console.log("browser: ", browser);

const util = browser ? {
    inspect(obj, config = null) {
        const conf = Object.assign(
            {
                depth: 2
            },
            config
        );
        return browserInspect(obj, conf);
    }
} : util_;

const getObjectName = (obj) => {
    let desc = "";
    if (obj !== null) {
        desc = typeof obj;
        const name = obj.constructor.name;
        if (name !== "") {
            desc = name;
        }
    }
    return desc;
};

const TypedArray = Object.getPrototypeOf(Uint8Array);

/** @type {myInspect} */
const myInspect = (obj, configObject = null) => {
    const name = getObjectName(obj);
    const desc = `util.inspect(${name}) =>\n`;
    const cfg = Object.assign(
        {
            depth : 2,
            getters: false,
            compact: true,
            colors: true,
            maxArrayLength: 16,
            maxStringLength: 320,
            removeLineBreaks: false
        }, configObject);
    //return desc +
    let res;
    try {
        res = util.inspect(obj, cfg);
    } catch (e) {
        res = "error: " + e.message;
    }
    return res;
};

function getAllProperties(obj) {
    let properties = [];
    properties = properties.concat(Reflect.ownKeys(obj));
    if (properties.length === 0) {
        obj = Object.getPrototypeOf(obj);
        if (obj !== null) {
            properties = properties.concat(Reflect.ownKeys(obj));
        }
    }
    return properties;
}
const customInspectSymbol = Symbol.for("nodejs.util.inspect.custom");
const symbolIterator = Symbol.iterator;
const headersMapSymbol = Symbol("headers map");
const headersListSymbol = Symbol("headers list");

const browserInspect = (obj, config) => {
    if (obj === null || obj === undefined) {
        if (obj === null) {
            return "myInspect(null) warning: parameter is null";
        }
        return "myInspect(undefined) warning: parameter is undefined";
    }
    if (typeof obj !== "object") {
        return "myInspect(obj) warning: parameter is not object, value: " + obj;
    }
    const seen = new WeakSet();
    seen.add(obj);
    const conf = Object.assign(
        {
            showFunc: false,
            depth: 2,
            description : ""
            //appInfo: process.env.APP_INFO ? boolean(process.env.APP_INFO) : true
        },
        config
    );
    const depth = conf.depth;
    const description = conf.description;
    const name = getObjectName(obj);
    let x;
    const localInspect = (obj, indent = 0, level = 0) => {
        const propsArray = getAllProperties(obj);
        const itemsCount = propsArray.length;
        let key; let value; let _k; let _v; let result = whiteBright("{");
        let firstLine = true;
        for (let currentItemIndex = 0; currentItemIndex < itemsCount; currentItemIndex++) {
            key = propsArray[currentItemIndex];
            try {
                value = obj[propsArray[currentItemIndex]];
            } catch (error) {
                value = "read error: " + error.message;
                //continue;
            }
            x = false;
            // if (key !== "url" && !ins) {
            //     continue;
            // }
            if (typeof key === "symbol") {
                //_k = Symbol.keyFor(key);
                //console.log("Symbol.keyFor(key): ", Symbol.keyFor(key));
                _k = whiteBright("[") + blueBright(key.toString()) + whiteBright("]") + ": ";
                console.log("key.toString(): ", key.toString());
                //if (key === symbolToStringTag) {
                x = true;
                console.log("key = ", _k);
                console.log("typeof value: ", typeof value);
                let z = Object.prototype.toString.call(key);
                console.log("Object.prototype.toString.call(value): ", z);
                if (value !== null) {
                    console.log("value[headersListSymbol]: ", value[headersListSymbol]);
                    console.log("value[headersMapSymbol]: ", value[headersMapSymbol]);
                    console.log("value[symbolIterator]: ", value[symbolIterator]);
                    if (value[symbolIterator] !== undefined) {
                        console.log("value[symbolIterator]2: ", [...value[symbolIterator]()]);
                    }
                    console.log("--->inspect(value): ", JSON.stringify(value));
                }
                //}
            } else {
                _k = white(key + ": ");
            }
            if (typeof value === "object") {
                //console.log("key:", _k, "value type: ", typeof value, " depth: ", depth, " lvl: ", level, "value: ", value);
                if (value === null) {
                    _v = gray("null");
                } else if (value[customInspectSymbol] !== undefined) {
                    //let x = level < depth - 1;
                    //console.log("x: ", x);
                    if (depth === 0 || level < depth - 1) {
                        // console.log(" (depth === 0 || level < depth - 1) => depth: ", depth, " lvl: ", level);
                        console.log("!!!!!!!!!!!!!!! inspect => ", _k);
                        _v = JSON.stringify(value);
                        const lines = _v.split("\n");
                        if (lines.length > 1) {
                            _v = lines[0] + "\n";
                            for (let i = 1; i < lines.length; i++) {
                                _v += " ".repeat(indent + 2) + lines[i] + (i < lines.length - 1 ? "\n" : "");
                            }
                        }
                        _v = whiteBright(_v);
                    } else {
                        _v = cyanBright("[Object...depth limit]");
                    }
                } else if (x) {
                    console.log("!!!!!!!!!!!!!!! depth - level ", depth - level);
                    _v = "$$$" + JSON.stringify(value);
                } else if (Array.isArray(value)) {
                    _v = "array[";
                    const arrayLength = value.length;
                    if (arrayLength > 0) {
                        for (let j = 0; j < arrayLength; j++) {
                            _v = _v
                                + (j == 0 ? "" : " ".repeat(indent + _k.length))
                                + value[j]
                                + (j < arrayLength - 1 ? ",\n" : "]");
                        }
                    } else {
                        _v = cyanBright("empty array[]");
                    }
                } else if (value instanceof TypedArray) {
                    _v = `buffer[${value.length} bytes]`;
                } else if (seen.has(value)) {
                    _v = "[circular]";
                } else if (depth === 0 || level < depth - 1) {
                    seen.add(value);
                    //console.log(" (depth === 0 || level < depth - 1) => depth: ", depth, " lvl: ", level);
                    _v = localInspect(value, indent + 2, level + 1);
                } else {
                    _v = cyanBright("[Object...depth limit]");
                }
            } else if (typeof value === "string") {
                _v = green("\"" + value + "\"");
            } else if (typeof value === "function") {
                if (conf.showFunc) {
                    _v = gray("function()");
                } else {
                    continue;
                }
            } else if (typeof value === "undefined") {
                _v = red("undefined");
            } else if (typeof value === "boolean") {
                _v = magentaBright(value ? "TRUE" : "false");
            } else {
                _v = greenBright(value);// + "[" + typeof value + "]";
            }
            const prefix = firstLine ? "" : ",";
            result = result + (!firstLine ? prefix + "\n" : "\n") + " ".repeat(indent + 2) + _k + _v;
            firstLine = false;
        }
        return result + "\n" + " ".repeat(indent) + whiteBright("}");
    };
    const res = `myInspect(${(description !== "" ? description + " as " : "") + name}, depth = ${depth === 0 ? "unlimited" : depth}) =>\n`;
    let r = res + localInspect(obj, 0, 0);
    if (browser && conf.removeLineBreaks) {
        r = r.replaceAll("\n", "");
    }
    return r;
};

