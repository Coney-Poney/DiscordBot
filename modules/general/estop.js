const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
    constructor(Module) {
        super(Module);

        this.name = "estop";
        this.description = "Emergency stop for automated managers (antiraid, antislur, etc)";

        this.permissions = [
            {
                type: Enums.PermissionType.ROLE,
                id: this._Module._Client.config.roles.permissions.admin,
                permission: true
            }
        ]
    }

    async execute(interaction) {
        try {
            //this._Module._Client.disableModule("antiraid");
            //this._Module._Client.disableModule("antislur");
            await this._Module._Client.user.setActivity('**SAFE MODE**', { type: 'PLAYING' });
            let string = (await this._Module._Client.LanguageHandler.get("general/chat/estop")) + (await this._Module._Client.LanguageHandler.get("general/chat/estop/success"));
            console.log(string);
            await interaction.reply({ content: string, ephemeral: true });
        } catch (error) {
            console.error("Encountered error while attempting to engage emergency stop: " + error);
            let string = (await this._Module._Client.LanguageHandler.get("general/chat/estop")) + (await this._Module._Client.LanguageHandler.get("general/chat/estop/failure"));
            console.log(string);
            await interaction.reply({ content: string, ephemeral: true }).then(() => {
                this._Module._Client.destroy();
                process.exit(1);
            });
        }
    }
}