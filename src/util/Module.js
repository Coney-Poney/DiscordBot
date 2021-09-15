const fs = require("fs");

const { Interaction } = require("discord.js");

class Module {
	constructor(folderDir, Client) {
		this.name = "";
		this.enabled = true;
		
		this._chatActions = new Map();
		this._messageActions = new Map();
		this._memberActions = new Map();
		this._eventActions = new Map();
		
		this._Client = Client;
		this._folderDir = folderDir;
		
		this._localstorage = new Map();
	}
	
	_retrieveActions() {
		let files = fs.readdirSync(this._folderDir);
		
		files.forEach(file => {
			if(file.endsWith("index.js") || !file.endsWith(".js")) return;
			
			let actionFile = require(file);
			
			let action = new actionFile(this);
			
			switch(action.type) {
				case "chat":
					this._chatActions.set(action.name, action);
					break;
				case "message":
					this._messageActions.set(action.name, action);
					break;
				case "member":
					this._memberActions.set(action.name, action);
					break;
				case "event":
					this._eventActions.set(action.name, action);
					this._Client.addListener(action.event, action.execute);
					break;
				default:
					console.warn("Action type for action named '"+action.name+"' is not recognised, ignoring.");
					break;
			}
		});
	}
	
	async processAction(interaction) {
		let action = null;
		
		if(interaction.isCommand() && this._chatActions.has(interaction.name)) action = this._chatActions.get(interaction.name);
		if(interaction.isContextMenu() && this._messageActions.has(interaction.name)) action = this._messageActions.get(interaction.name);
		if(interaction.isContextMenu() && this._memberActions.has(interaction.name)) action = this._memberActions.get(interaction.name);
		
		if(action == null) return;
		
		try {
			await action.execute(interaction);
		} catch (err) {
			if(interaction.replied) {
				interaction.editReply({ content: "The action encountered an error which has cascaded to the module. Execution has stopped." });
			} else {
				interaction.reply({ content: "The action encountered an error which has cascaded to the module. Execution has stopped.", ephemeral: true});
			}
		}
	}
	
	getActions(includeEvents = true) {
		actions = new Map();
		
		if(includeEvents) {
			actions = new Map(this._chatActions, this._messageActions, this._memberActions, this._eventActions);
		} else {
			actions = new Map(this._chatActions, this._messageActions, this._memberActions);
		}
		
		return actions;
	}
	
	getClient() {
		return this._Client;
	}
	
	getData(key) {
		return this._localstorage.get(key);
	}
	
	hasData(key) {
		return this._localstorage.has(key);
	}
	
	setData(key, value) {
		return this._localstorage.set(key, value);
	}
	
	deleteData(key) {
		return this._localstorage.delete(key);
	}
	
	getDataKeys() {
		return this._localstorage.keys();
	}
	
	getDataValues() {
		return this._localstorage.values();
	}
	
	forEachData(callback) {
		return this._localstorage.forEach(callback); 
	}
}

module.exports = Module;
