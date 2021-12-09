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
							title: "forums/register/alreadyexists/title".getLang(),
							description: "forums/register/alreadyexists/description".getLang(),
							color: 16771840,
							fields: [
								{
									name: "forums/register/alreadyexists/fields/email/title".getLang(),
									value: useracc.email,
									inline: true
								},
								{
									name: "forums/register/alreadyexists/fields/website/title".getLang(),
									value: "forums/register/alreadyexists/fields/website/description".getLang(),
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
							title: "forums/register/alreadyexists/title".getLang(),
							description: "forums/register/alreadyexists/description".getLang(),
							color: 16771840,
							fields: [
								{
									name: "forums/register/alreadyexists/fields/email/title".getLang(),
									value: useracc.email,
									inline: true
								},
								{
									name: "forums/register/alreadyexists/fields/website/title".getLang(),
									value: "forums/register/alreadyexists/fields/website/description".getLang(),
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
							title: "forums/register/success/title".getLang(),
							description: "forums/register/success/description".getLang(),
							color: 6749952,
							fields: [
								{
									name: "forums/register/success/fields/email/title".getLang(),
									value: useraccount.email,
									inline: true
								},
								{
									name: "forums/register/success/fields/password/title".getLang(),
									value: useraccount.password,
									inline: true
								},
								{
									name: "forums/register/success/fields/website/title".getLang(),
									value: "forums/register/success/fields/website/description".getLang(),
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
							title: "forums/register/success/title".getLang(),
							description: "forums/register/success/description".getLang(),
							color: 6749952,
							fields: [
								{
									name: "forums/register/success/fields/email/title".getLang(),
									value: useraccount.email,
									inline: true
								},
								{
									name: "forums/register/success/fields/password/title".getLang(),
									value: useraccount.password,
									inline: true
								},
								{
									name: "forums/register/success/fields/website/title".getLang(),
									value: "forums/register/success/fields/website/description".getLang(),
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
							title: "forums/register/error/title".getLang(),
							description: "forums/register/error/description".getLang(),
							color: 16711680
						}
					],
					ephemeral: true
				});
			} catch (err) {
				if (err.code == 10062) await interaction.member.user.send({
					embeds: [
						{
							title: "forums/register/error/title".getLang(),
							description: "forums/register/error/description".getLang(),
							color: 16711680
						}
					]
				});
			}
		}
	}
}