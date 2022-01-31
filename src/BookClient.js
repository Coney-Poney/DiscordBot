/*
	I'm Twilight Sparkle!
*/

const fs = require("fs");

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client } = require("discord.js");

const { MongoClient } = require('mongodb');

const LangHandler = require("./util/LangHandler");
const PronounHandler = require("./util/PronounHandler");
const loadClientDependantClassModifications = require("./util/ClassExtentions");

class BookClient extends Client {
	constructor(config, options) {
		super(options);

		this.config = config;
		this.modules = {}

		this.LanguageHandler = new LangHandler(this);
		this.PronounHandler = new PronounHandler(this);

		this._DBClient = new MongoClient(process.env.DBURL);
		this._DBClient.connect();

		this._REST = new REST({ version: '9' }).setToken(process.env.DISCORDTOKEN);

		this._allActions = new Map();

		this.addListener("interactionCreate", this._interactionHandler);
		this.addListener("ready", this._ready);

		loadClientDependantClassModifications(this);

		this.login(process.env.DISCORDTOKEN);
	}

	_ready() {
		console.info("ready!");
		this._actionGenerateLoop();
	}

	async _actionGenerateLoop() {
		await this._discoverModules();
		this.guilds.cache.forEach(async (guild, _) => {
			await this._generateActions(guild);
			await this._generatePermissions(guild);
		});
	}

	async _discoverModules() {
		let folders = fs.readdirSync("./modules");

		await folders.forEachAsync(async folder => {
			let files = fs.readdirSync("./modules/" + folder);

			if (!files.includes("index.js")) return;

			let moduleFile = require("../modules/" + folder + "/index.js");

			let moduleClass = new moduleFile(this, "./modules/" + folder + "/");

			this.modules[moduleClass.name] = moduleClass;
		});
	}

	async _generateActions(guild) {
		let commands = [];

		for (var key in this.modules) {
			let value = this.modules[key];
			if (value.enabled) value.getActions(false).forEach((value, key) => this._allActions.set(key, value));
		}

		this._allActions.forEach((action, _) => {
			let data = {};

			switch (action.type) {
				case "chat":
					data = {
						name: action.name,
						type: 1,
						description: action.description,
						options: action.options,
						default_permission: action.permissions.length == 0 ? true : false
					}
					break;
				case "message":
					data = {
						name: action.name,
						type: 3,
						default_permission: action.permissions.length == 0 ? true : false
					}
					break;
				case "member":
					data = {
						name: action.name,
						type: 2,
						default_permission: action.permissions.length == 0 ? true : false
					}
					break;
				default:
					data = null;
					console.warn("Action '" + action.name + "' has unknown type of '" + action.type + "', ignoring...");
					break;
			}

			if (data == null) return;

			commands.push(data);
		});

		await this._REST.put(
			Routes.applicationGuildCommands(this.user.id, guild.id),
			{ body: commands },
		);
	}

	async _generatePermissions(guild) {
		let commands = [];

		let discordSideActions = await this._REST.get(
			Routes.applicationGuildCommands(this.user.id, guild.id)
		);

		await discordSideActions.forEachAsync(action => {
			let ourAction = this._allActions.get(action.name);

			if (ourAction.permissions.length == 0) {
				commands.push({
					id: action.id,
					permissions: []
				});
			} else {
				commands.push({
					id: action.id,
					permissions: ourAction.permissions
				});
			}
		});

		await this._REST.put(
			Routes.guildApplicationCommandsPermissions(this.user.id, guild.id),
			{ body: commands }
		);
	}

	/**
	 * Returns the database requested.
	 * @param {String} dbName The name of the database you want.
	 * @returns
	 */
	getDatabase(dbName) {
		return this._DBClient.db(dbName)
	}

	async _interactionHandler(interaction) {
		try {
			if (!this._allActions.has(interaction.commandName)) return interaction.reply({ content: "core/action/error/notexist".getLang(), ephemeral: true });

			let action = this._allActions.get(interaction.commandName);

			if (!action._Module.enabled) return interaction.reply({ content: "core/action/error/disabled".getLang().format(action._Module.name), ephemeral: true });

			await action._Module.processAction(interaction);
		} catch (error) {
			// This is literally here to prevent the error from cascading down to discord.js
			console.error(error);
			if (interaction.ephemeral) return; // Interaction was ephermal, cannot inform user of failure.

			if (interaction.deferred) interaction.followUp({ content: "core/action/error/unknown".getLang() });
			if (interaction.replied) interaction.editReply({ content: "core/action/error/unknown".getLang() });
		}
	}

	disableModule(name) {
		if (!this.modules.hasOwnProperty(name)) throw ReferenceError("The module named '{}' does not exist.".format(name));

		this.modules[name].enabled = false;
	}

	enableModule(name) {
		if (!this.modules.hasOwnProperty(name)) throw ReferenceError("The module named '{}' does not exist.".format(name));

		this.modules[name].enabled = true;
	}
}

module.exports = BookClient;