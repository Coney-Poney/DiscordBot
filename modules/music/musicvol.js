const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
	constructor(Module) {
		super(Module);

		this.name = "musicvol";
		this.description = "change music volume";

		this.permissions = [
			{
				type: Enums.PermissionType.ROLE,
				id: this._Module._Client.config.roles.permissions.admin,
				permission: true
			}
		]

		this.options = [
			{
				name: "volume",
				description: "volume level",
				type: Enums.ChatActionOptionsType.INTEGER,
				required: true
			}
		]
	}

	async execute(interaction) {
		this._Module.volume(interaction.options.getInteger("volume", true) / 100);
		interaction.reply({
			content: "ok",
			ephemeral: true
		});
	}
}