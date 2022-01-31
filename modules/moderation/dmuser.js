const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
	constructor(Module) {
		super(Module);

		this.name = "dmuser";
		this.description = "Send a DM to a user";

		this.logged = true;

		this.options = [
			{
				name: "member",
				description: "The member to DM",
				type: Enums.ChatActionOptionsType.USER,
				required: true
			},
			{
				name: "message",
				description: "The message to send",
				type: Enums.ChatActionOptionsType.STRING,
				required: true
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
		interaction.options.getUser("member", true).send({
			content: interaction.options.getString("message", true)
		}).then(async message => {
			await interaction.reply({
				content: "moderation/dmuser/success".getLang(),
				ephemeral: true
			});
		}).catch(async error => {
			console.warn("Error while trying to send dm to user `{}`: {}".format(interaction.options.getUser("member", true).id, error));
			await interaction.reply({
				content: "moderation/dmuser/failure".getLang(),
				ephemeral: true
			});
		});
	}
}
