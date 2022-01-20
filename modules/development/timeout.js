const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
    constructor(Module) {
        super(Module);

        this.name = "timeout";
        this.description = "Timeout a user";

        this.options = [
            {
                name: "member",
                description: "member",
                type: Enums.ChatActionOptionsType.USER,
                required: true
            },
            {
                name: "time",
                description: "time",
                type: Enums.ChatActionOptionsType.STRING,
                required: true
            },
            {
                name: "reason",
                description: "reason",
                type: Enums.ChatActionOptionsType.STRING,
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
        interaction.options.getMember("member", true).timeout(new Date(interaction.options.getString("time", true)), interaction.options.getString("reason"));
        interaction.reply({
            content: "a",
            ephemeral: true
        })
    }
}
