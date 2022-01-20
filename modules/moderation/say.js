const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
	constructor(Module) {
		super(Module);

		this.name = "say";
		this.description = "Say something as Coney Poney";

		this.options = [
			{
				name: "message",
				description: "The message to send",
				type: Enums.ChatActionOptionsType.STRING,
				required: true
			},
			{
				name: "channel",
				description: "The channel to send the message to. Will use current channel if not provided.",
				type: Enums.ChatActionOptionsType.CHANNEL,
				required: false
			}
		]

		this.permissions = [
			{
				type: Enums.PermissionType.ROLE,
				id: this._Module._Client.config.roles.permissions.mod,
				permission: true
			},
			{
				type: Enums.PermissionType.ROLE,
				id: this._Module._Client.config.roles.permissions.admin,
				permission: true
			}
		]
	}

	async execute(interaction) {
		if (interaction.options.getChannel("channel") == undefined) {
			interaction.channel.send(interaction.options.getString("message", true));
		} else {
			interaction.options.getChannel("channel").send(interaction.options.getString("message", true));
		}
		await interaction.reply({
			content: "moderation/say/success".getLang(),
			ephemeral: true
		});
	}
}
