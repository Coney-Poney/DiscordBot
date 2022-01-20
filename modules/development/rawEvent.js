/*
    Raw event for tracking down new features and shit
*/

const EventAction = require("../../src/util/EventAction");

module.exports = class extends EventAction {
    constructor(Module) {
        super(Module);

        this.name = "rawEvent";

        this.event = "raw";
    }

    async execute(packet) {
        //if (packet.op != 0) return;

        //console.log(packet.d);
    }
}
