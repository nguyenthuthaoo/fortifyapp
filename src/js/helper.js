import { TIMEOUT_SEC } from "./config"
const timeout = function ($) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long ! timeout after ${$} seconds`))
        }, $*1000)
    })
}

export const getJSON = async function(url) {
    try {
        const fetchPromise = fetch(url)
        const response = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
    }
    console.log('Response:',response);
    return data
    } catch (error) {
        throw Error(error);
    }
}
