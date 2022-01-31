const ChatAction = require("../../src/util/ChatAction");

module.exports = class extends ChatAction {
	constructor(Module) {
		super(Module);

		this.name = "rules";
		this.description = "Recites the rules";
	}

	async execute(interaction) {
		await interaction.reply({ 
			content: 
				"general/rules/one".getLang() +
				"general/rules/two".getLang() + 
				"general/rules/three".getLang() + 
				"general/rules/four".getLang() +
				"general/rules/five".getLang() +
				"general/rules/six".getLang() +
				"general/rules/seven".getLang() +
				"general/rules/eight".getLang() +
				"general/rules/otherinfo".getLang(),
			ephemeral: true
		});
	}
}
