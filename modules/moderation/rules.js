const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
	constructor(Module) {
		super(Module);

		this.name = "rules";
		this.description = "Recites the rules.";
	}

	async execute(interaction) {
		//i am so sorry leah ;-; - bitl
		await interaction.reply({ content: 
		"moderation/rules/one" +
		"moderation/rules/two" + 
		"moderation/rules/three" + 
		"moderation/rules/four" +
		"moderation/rules/five" +
		"moderation/rules/six" +
		"moderation/rules/seven" +
		"moderation/rules/eight" +
		"moderation/rules/otherinfo"});
	}
}
