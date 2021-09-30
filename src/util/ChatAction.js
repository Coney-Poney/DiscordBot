const Action = require("./Action");

class ChatAction extends Action {
	constructor(Module) {
		super(Module)

		this.description = "";

		this.type = "chat";

		this.options = [];
		this.permissions = [];
	}

	async execute(interaction) {
		await interaction.reply({ content: "Success! If you see this, the action you executed has not been programmed.", ephemeral: true });
	}
}

module.exports = ChatAction;