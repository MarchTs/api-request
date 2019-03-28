const httpRequest = require("http-requests");
const HttpOption = require("http-options");
const logManager = require("log-manager");

module.exports = async (url, httpOption = HttpOption, requestBody) => {
    if (typeof url === "string") {
        url = new URL(url);
    }
    let result = await httpRequest(url, httpOption, requestBody);

    let user_agent = httpOption.option.headers["User-Agent"];
    logManager.insert3Party(url, requestBody, user_agent, result);

    if (!result.statusCode) {
        console.log("changeing status code at url:", url.toString());
        result.statusCode = 500;
    }
    return result;
};