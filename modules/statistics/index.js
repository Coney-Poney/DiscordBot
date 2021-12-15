const Module = require("../../src/util/Module");

module.exports = class extends Module {
	constructor(Client, folderDir) {
		super(Client, folderDir);

		this.name = "statistics";
		this.enabled = false;

		this._retrieveActions();
	}
}
