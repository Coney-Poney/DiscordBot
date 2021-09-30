const Module = require("../../src/util/Module");

module.exports = class extends Module {
    constructor(Client, folderDir) {
        super(Client, folderDir);

        this.name = "general";
        this.enabled = true;

        this._retrieveActions();
    }
}