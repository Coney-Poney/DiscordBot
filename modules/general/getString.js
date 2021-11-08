const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
    constructor(Module) {
        super(Module);

        this.name = "langstring";
        this.description = "Get the string requested from the current language file";

        this.options = [
            {
                name: "string",
                description: "The key for the string",
                type: Enums.ChatActionOptionsType.STRING,
                required: true
            },
            {
                name: "public",
                description: "Whether to post the message publicly",
                type: Enums.ChatActionOptionsType.BOOLEAN,
                required: false
            }
        ]

        this.permissions = [
            {
                type: Enums.PermissionType.USER,
                id: "186730180872634368",
                permission: true
            }
        ]
    }

    async execute(interaction) {
        let string = await this._Module._Client.LanguageHandler.get(interaction.options.getString("string", true));

        if (interaction.options.getBoolean("public") == undefined || interaction.options.getBoolean("public") == false) {
            await interaction.reply({
                content: "Processing `" + interaction.options.getString("string", true) + "` using language file `" + this._Module._Client.LanguageHandler.language + "`: " + interaction.options.getString("string", true).split("/").join(" -> ") + "\n```\n" + string + "\n```",
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: "Processing `" + interaction.options.getString("string", true) + "` using language file `" + this._Module._Client.LanguageHandler.language + "`: " + interaction.options.getString("string", true).split("/").join(" -> ") + "\n```\n" + string + "\n```"
            });
        }
    }
}