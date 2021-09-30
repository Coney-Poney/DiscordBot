/*
    Special handler for pronouns!
*/

const { GuildMember } = require("discord.js");
const pronouns = require("node_pronouns");

class PronounHandler {
    constructor(Client) {
        this._Client = Client;
    }

    async _getPronoun(member) {
        let pronouns = [];

        let roles = member.roles.cache.map(role => role.id);

        await roles.forEachAsync(id => {
            if (this._Client.config.roles.pronouns.hasOwnProperty(id)) pronouns.push(this._Client.config.roles.pronouns[id]);
        });

        return pronouns;
    }

    async _getPronouns(members) {
        let memberPronounMap = [];

        await members.forEachAsync(async member => {
            memberPronounMap.push((await this._getPronoun(member)));
        });

        return memberPronounMap;
    }

    /**
     * Process a string to use correct pronouns if needed.
     * @param {String} string The string to process
     * @param {GuildMember[]} members An array of members who are relavent to the string.
     * @returns {Promise<String>} The processed string.
     */
    async process(string, members) {
        let pronounMap = await this._getPronouns(members);

        let finishedString = pronouns(string, pronounMap);

        return finishedString;
    }
}

module.exports = PronounHandler;