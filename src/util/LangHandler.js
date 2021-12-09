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
		let splitPath = path.split("/");
		let content = langFile;

		splitPath.forEach(pathPart => {
			content = content[pathPart];

			if (content == undefined) {
				throw new ReferenceError("The string path '" + path + "' does not resolve, stuck at '" + pathPart + "'.");
			} else {
				if (path.endsWith("/" + pathPart)) {
					if (typeof content != "string") {
						if (content["_"] == undefined) throw new TypeError("The string path '" + path + "' returns an object, but doesn't have a '_' (header) field and thus is not a string.");
						content = content["_"];
					} else {
						// content already set to desired value
					}
				}
			}
		});

		return content;
	}
}

module.exports = LangHandler;