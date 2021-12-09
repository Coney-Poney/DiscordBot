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
        await interaction.reply({ content: "general/chat/ping/gen".getLang() });
        await interaction.editReply({
            content: "general/chat/ping/finish".getLang().format(Date.now() - time0, this._Module._Client.ws.ping)
        });
    }
}