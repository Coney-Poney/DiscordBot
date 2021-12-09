const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
    constructor(Module) {
        super(Module);

        this.name = "startmusic";
        this.description = "start music lol";

        this.permissions = [
            {
                type: Enums.PermissionType.ROLE,
                id: this._Module._Client.config.roles.permissions.admin,
                permission: true
            }
        ]

        this.options = [
            {
                name: "channel",
                description: "channel to play song in",
                type: Enums.ChatActionOptionsType.CHANNEL,
                required: true
            },
            {
                name: "url",
                description: "url to play - NOT A YOUTUBE URL",
                type: Enums.ChatActionOptionsType.STRING,
                required: true
            }
        ]
    }

    async execute(interaction) {
        if (interaction.options.getChannel("channel", true)?.type != "GUILD_VOICE") {
            return interaction.reply({
                content: "Must be a voice channel!",
                ephemeral: true
            });
        }

        this._Module.start(interaction.options.getChannel("channel", true), interaction.options.getString("url", true));
        interaction.reply({
            content: "ok",
            ephemeral: true
        })
    }
}