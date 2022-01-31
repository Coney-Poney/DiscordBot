const Module = require("../../src/util/Module");
const superagent = require("superagent");

module.exports = class extends Module {
	constructor(Client, folderDir) {
		super(Client, folderDir);

		this.name = "forums";
		this.enabled = true;

		this._retrieveActions();
	}

	get _generateXenforoPassword() {
		let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!-=+#~?><,.".split("");
		let string = "";

		for (var i = 0; i < 15; i++) {
			string = string + characters.random();
		}

		return string;
	}

	async registerAccount(id, username) {
		try {
			let email = id + "@cone.coneyponey.com";
			let password = this._generateXenforoPassword;

			await superagent.post(process.env.XENFOROURL)
				.type('application/x-www-form-urlencoded')
				.send({
					"action": "register",
					"username": username,
					"password": password,
					"email": email,
					"hash": process.env.XENFOROKEY,
					"group": "Registered",
					"custom_fields": "discord=" + id
				});

			await this._Client.getDatabase("books").collection("forumrelations").insertOne({
				"forum": username,
				"discord": id
			});

			return { success: true, email, password };
		} catch (error) {
			console.log(error);
			console.error("error while registering " + id + ": " + error);
			return { success: false, code: error.statusCode, email: null, password: null };
		}
	}

	async getForumAccount(id) {
		try {
			let user = await this._Client.getDatabase("books").collection("forumrelations").findOne({
				"discord": id
			});

			console.log(user);

			return (await superagent.post(process.env.XENFOROURL)
				.type('application/x-www-form-urlencoded')
				.send({
					"action": "getUser",
					"value": user.forum,
					"hash": process.env.XENFOROKEY
				})).body;
		} catch (error) {
			if (error.body.error == 4) return undefined;
			console.error("error while trying to get user " + user.forum + ": " + error);
			return null;
		}
	}

	async doesForumAccountExist(id) {
		let user = await this._Client.getDatabase("books").collection("forumrelations").findOne({
			"discord": id
		});

		if (user == undefined) return false;
		return true;
	}
}