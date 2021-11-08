const Module = require("../../src/util/Module");

module.exports = class extends Module {
    constructor(Client, folderDir) {
        super(Client, folderDir);

        this.name = "antiraid";
        this.enabled = false;

        this._retrieveActions();

        this.setData("levels", {
            "verifIncrease": 3,
            "verifStop": 5,
            "lockdown": 9
        });

        this.setData("currentRate", []);
    }
}
