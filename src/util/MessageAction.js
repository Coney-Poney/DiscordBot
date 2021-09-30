const Action = require("./Action")

class MessageAction extends Action {
    constructor(Module) {
        super(Module);

        this.type = "message";

        this.permissions = [];
    }

    async execute(interaction) {
        await interaction.reply({ content: "Success! If you see this, the action you executed has not been programmed.", ephemeral: true });
    }
}

module.exports = MessageAction;