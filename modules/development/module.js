const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
    constructor(Module) {
        super(Module);

        this.name = "module";
        this.description = "Disable or enable a module";

        this.options = [
            {
                name: "module",
                description: "The name of the module to enable or disable",
                type: Enums.ChatActionOptionsType.STRING,
                required: true
            },
            {
                name: "enabled",
                description: "Whether the module is enabled or disabled",
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
        if (!this._Module._Client.modules.hasOwnProperty(interaction.options.getString("module", true))) return await interaction.reply({
            content: "development/module/notexist".getLang().format(interaction.options.getString("module", true)),
            ephemeral: true
        })
        let module = this._Module._Client.modules[interaction.options.getString("module", true)];

        if (interaction.options.getBoolean("enabled") == undefined) {
            // just return current status.
            let current = module.enabled ? "enabled" : "disabled";

            return await interaction.reply({
                content: "development/module/state".getLang().format(module.name, current),
                ephemeral: true
            });
        }

        if (interaction.options.getBoolean("enabled") == module.enabled) {
            // already set.
            return await interaction.reply({
                content: "development/module/already".getLang().format(module.name, module.enabled ? "enabled" : "disabled"),
                ephemeral: true
            });
        }

        this._Module._Client.modules[module.name].enabled = interaction.options.getBoolean("enabled");
        await interaction.reply({
            content: "development/module/success".getLang().format(interaction.options.getBoolean("enabled") ? "enabled" : "disabled", module.name),
            ephemeral: true
        });
    }
}