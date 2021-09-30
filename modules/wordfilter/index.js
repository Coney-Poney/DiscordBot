const Module = require("../../src/util/Module");

module.exports = class extends Module {
    constructor(Client, folderDir) {
        super(Client, folderDir);

        this.name = "WordFilter";
        this.enabled = true;

        this._retrieveActions();
    }

    async addWord(word, punishment) {
        try {
            await this._Client.getDatabase("books").collection("words").insertOne({
                word: word,
                action: punishment
            });

            this.setData("words", this.getData("words").push([word, punishment]));

            return true;
        } catch (error) {
            console.warn(error);
            return false;
        }
    }
}