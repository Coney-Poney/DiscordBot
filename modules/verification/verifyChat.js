const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
    constructor(Module) {
        super(Module);

        this.name = "verify";
        this.description = "Verify a member.";

        this.permissions = [
            {
                type: Enums.PermissionType.ROLE,
                id: this._Module._Client.config.roles.permissions.owner,
                permission: true
            },
            {
                type: Enums.PermissionType.ROLE,
                id: this._Module._Client.config.roles.permissions.admin,
                permission: true
            },
            {
                type: Enums.PermissionType.ROLE,
                id: this._Module._Client.config.roles.permissions.mod,
                permission: true
            }
        ];

        this.options = [
            {
                name: "member",
                description: "The member to verify.",
                type: Enums.ChatActionOptionsType.USER,
                required: true
            }
        ]
    }

    async execute(interaction) {
        try {
            //this._Module._Client.disableModule("antiraid");
            //this._Module._Client.disableModule("antislur");
            await interaction.options.getMember("member", true).roles.add(this._Module._Client.config.roles.permissions.verified)

            await interaction.reply({ content: (await this._Module._Client.LanguageHandler.get("verification/chat/success")).format(interaction.options.getMember("member", true).displayName), ephemeral: true });
        } catch (error) {
            console.error("Encountered error while attempting to give member verified role: " + error);
            await interaction.reply({ content: await this._Module._Client.LanguageHandler.get("verification/chat/failure"), ephemeral: true });
        }
    }
}