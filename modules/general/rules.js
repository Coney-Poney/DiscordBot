const ChatAction = require("../../src/util/ChatAction");

module.exports = class extends ChatAction {
	constructor(Module) {
		super(Module);

		this.name = "rules";
		this.description = "Recites the rules.";
	}

	async execute(interaction) {
		await interaction.reply({ 
			content: 
				"moderation/rules/one".getLang() +
				"moderation/rules/two".getLang() + 
				"moderation/rules/three".getLang() + 
				"moderation/rules/four".getLang() +
				"moderation/rules/five".getLang() +
				"moderation/rules/six".getLang() +
				"moderation/rules/seven".getLang() +
				"moderation/rules/eight".getLang() +
				"moderation/rules/otherinfo".getLang(),
			ephemeral: true
		});
	}
}
