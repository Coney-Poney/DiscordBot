const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
    constructor(Module) {
        super(Module);

        this.name = "dmuser";
        this.description = "Send a DM to a user";

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
                id: this._Module._Client.config.roles.permissions.admin,
                permission: true
            }
        ]
    }

    async execute(interaction) {
        await interaction.options.getUser("member").send({
            content: interaction.options.getString("string").replaceAll("/n", "\n") || "wtf required option empty?"
        }).then(async message => {
            await interaction.reply({
                content: "Sent message to recipient!",
                ephemeral: true
            });
        }).catch(async error => {
			console.warn("Error while trying to send dm to user `+interaction.options.getUser("member").id+"`: ", error);
            await interaction.reply({
				content: "Something went wrong while trying to send that message. Maybe the user has DMs disabled or the bot blocked?",
				ephemeral: true
			});
        });
    }
}
