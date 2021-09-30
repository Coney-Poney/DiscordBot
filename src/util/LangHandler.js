const fs = require("fs");

var langFile = null;

class LangHandler {
    constructor(Client) {
        this.language = Client.config.defaultLang;
        langFile = require("../lang/" + Client.config.defaultLang + ".json");

        this._Client = Client;
    }

    /**
     * Changes the current language file.
     * @param {String} newLang The name of the new language file.
     * @returns {Boolean} `true` if the language change was successful, `false` if it was not
     */
    changeLang(newLang) {
        if (fs.existsSync("../lang/" + newLang + ".json")) {
            langFile = require("../lang/" + newLang + ".json");
            this.language = newLang;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Get a string from the currently loaded language file via it's path.
     * @param {String} path The path for the string (e.g. `antislur/trip/user/dm`)
     * @returns {Promise<String>} The string, or rejects the promise with an error on failure.
     */
    get(path) {
        return new Promise(async (res, rej) => {
            let splitPath = path.split("/");
            let content = langFile;

            await splitPath.forEachAsync(pathPart => {
                content = content[pathPart];

                if (content == undefined) {
                    rej("The string path '" + path + "' does not resolve, stuck at '" + pathPart + "'.");
                } else {
                    if (path.endsWith("/" + pathPart)) {
                        if (typeof content != "string") {
                            if (content["_"] == undefined) return rej("The string path '" + path + "' returns an object, but doesn't have a '_' (header) field and thus has no content.");
                            res(content["_"]);
                        } else {
                            res(content);
                        }
                    }
                }
            });
        });
    }
}

module.exports = LangHandler;