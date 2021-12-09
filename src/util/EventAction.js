const Action = require("./Action");

class EventAction extends Action {
	constructor(Module) {
		super(Module);

		this.type = "event";

		this.event = "";
	}

	async preExecute() {
		// just make sure the module is enabled
		if (this._Module.enabled) return await this.execute(...arguments);
	}

	async execute() {
		console.info("Event named " + this.name + " executed successfully, but default execute function has not been overwritten.");
	}
}

module.exports = EventAction;