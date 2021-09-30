const Action = require("./Action");

class EventAction extends Action {
    constructor(Module) {
        super(Module);

        this.type = "event";

        this.event = "";
    }

    async execute() {
        console.info("Event named " + this.name + " executed successfully, but default execute function has not been overwritten.");
    }
}

module.exports = EventAction;