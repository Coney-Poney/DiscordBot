const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
    constructor(Module) {
        super(Module);

        this.name = "eval";
        this.description = "evaluate";

        this.options = [
            {
                name: "code",
                description: "a",
                type: Enums.ChatActionOptionsType.STRING,
                required: true
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
        try {
            let res = eval(interaction.options.getString("string", true));

            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
}
