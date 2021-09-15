const fs = require("fs");

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
		
	}
}
