/* Discord Bot */
const BookClient = require("./src/BookClient");
const { Intents } = require("discord.js");

const Client = new BookClient(require("./config.json"), {
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_BANS,
		//Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
		//Intents.FLAGS.GUILD_VOICE_STATES
	]
});

/* Discord API */
const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("hi!");
});

app.listen(80);