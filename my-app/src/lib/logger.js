export {
    logInput
}

const logInput = async (path, loadParams) => {
    const stuff = await loadParams.parent();
    console.log("?load() " + path + " => data: ", loadParams.data);
    console.log("?load() " + path + " => parent(): ", stuff);
}
