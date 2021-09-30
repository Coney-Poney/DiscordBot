const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
    constructor(Module) {
        super(Module);

        this.name = "ping";
        this.description = "Pong!";
    }

    async execute(interaction) {
        let time0 = Date.now();
        await interaction.reply({ content: "Generating..." });
        await interaction.editReply({
            content: "Pong!\nAPI Ping: " + (Date.now() - time0) + "ms.\nGateway Ping: " + this._Module._Client.ws.ping + "ms."
        });
    }
}