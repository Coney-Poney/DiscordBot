const ChatAction = require("../../src/util/ChatAction");
const Enums = require("../../src/util/Enums");

module.exports = class extends ChatAction {
    constructor(Module) {
        super(Module);

        this.name = "registerforumaccount";
        this.description = "Register an account on our fourms.";

        this.permissions = [
            {
                type: Enums.PermissionType.ROLE,
                id: this._Module._Client.config.roles.permissions.admin,
                permission: true
            }
        ]

        this.options = [
            {
                name: "name",
                description: "The name you want to go by on the forums.",
                type: Enums.ChatActionOptionsType.STRING,
                required: true
            }
        ]
    }

    async execute(interaction) {
        if (await this._Module.doesForumAccountExist(interaction.member.user.id) == true) {
            let useracc = await this._Module.getForumAccount(interaction.member.user.id);

            console.log(useracc);

            try {
                return await interaction.reply({
                    embeds: [
                        {
                            title: "Forum Account Creation Failed",
                            description: "You already have a forum account. Did you forget your email?",
                            color: 16771840,
                            fields: [
                                {
                                    name: "Email",
                                    value: useracc.email,
                                    inline: true
                                },
                                {
                                    name: "Website URL",
                                    value: "https://forums.coneyponey.com",
                                    inline: true
                                }
                            ]
                        }
                    ],
                    ephemeral: true
                });
            } catch (err) {
                if (err.code == 10062) return await interaction.member.user.send({
                    embeds: [
                        {
                            title: "Forum Account Creation Failed",
                            description: "You already have a forum account. Did you forget your email?",
                            color: 16771840,
                            fields: [
                                {
                                    name: "Email",
                                    value: useracc.email,
                                    inline: true
                                },
                                {
                                    name: "Website URL",
                                    value: "https://forums.coneyponey.com",
                                    inline: true
                                }
                            ]
                        }
                    ]
                });
            }
        }

        let useraccount = await this._Module.registerAccount(interaction.member.user.id, interaction.options.getString("name"));

        if (useraccount.success) {
            try {
                await interaction.reply({
                    embeds: [
                        {
                            title: "Forum Account Created!",
                            description: "Your forum account has been created! Your infomation to log in is below.\nPlease change the provided email address and password once you log in!",
                            color: 6749952,
                            fields: [
                                {
                                    name: "Email",
                                    value: useraccount.email,
                                    inline: true
                                },
                                {
                                    name: "Password",
                                    value: useraccount.password,
                                    inline: true
                                },
                                {
                                    name: "Website URL",
                                    value: "https://forums.coneyponey.com",
                                    inline: false
                                }
                            ]
                        }
                    ],
                    ephemeral: true
                });
            } catch (err) {
                if (err.code == 10062) await interaction.member.user.send({
                    embeds: [
                        {
                            title: "Forum Account Created!",
                            description: "Your forum account has been created! Your infomation to log in is below.\nPlease change the provided email address and password once you log in!",
                            color: 6749952,
                            fields: [
                                {
                                    name: "Email",
                                    value: useraccount.email,
                                    inline: true
                                },
                                {
                                    name: "Password",
                                    value: useraccount.password,
                                    inline: true
                                },
                                {
                                    name: "Website URL",
                                    value: "https://forums.coneyponey.com",
                                    inline: false
                                }
                            ]
                        }
                    ]
                });
                await interaction.deferReply();
            }
        } else {
            try {
                await interaction.reply({
                    embeds: [
                        {
                            title: "Forum Account Creation Failed",
                            description: "Something went wrong.. somewhere\nJust tell sophie (the one with coney poney operator role)",
                            color: 16711680
                        }
                    ],
                    ephemeral: true
                });
            } catch (err) {
                if (err.code == 10062) await interaction.member.user.send({
                    embeds: [
                        {
                            title: "Forum Account Creation Failed",
                            description: "Something went wrong.. somewhere\nJust tell sophie (the one with coney poney operator role)",
                            color: 16711680
                        }
                    ]
                });
            }
        }
    }
}