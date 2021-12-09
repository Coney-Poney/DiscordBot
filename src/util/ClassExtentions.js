/*
	A file which adds utility funtions to existing classes to make life easier
	Examples include string.format, array.random, array.forEachAsync and other things
*/

const BookClient = require("../BookClient");

/**
 * Replace all instances of `initial` with `change`.
 * @param {any} initial The content you want to replace.
 * @param {any} change The content you want to replace with.
 * @returns 
 */
String.prototype.replaceAll = function (initial, change) {
	return new String(this).split(initial).join(change);
}

/**
 * Formats a string with passed arguments.
 * @param {any}
 * @returns {String}
 */
String.prototype.format = function () {
	var data = [].slice.call(arguments);
	if (Array.isArray(arguments[0]) && arguments.length == 1) {
		// if first argument is an array and there's no more arguments just use that argument as the entire arguments input
		data = arguments[0];
	}
	let str = new String(this);

	data.forEach(arg => {
		str = str.replace("{}", arg);
	});

	for (var i = 0; i < data.length; i++) {
		str = str.replaceAll("{" + i + "}", data[i]);
	}

	return str;
}

/**
 * Return a random element of the array.
 * @returns {any}
 */
Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
}

/**
 * Asyncronous forEach function. Useful if the forEach MUST complete before execution continues.
 * @param {Function} callback The function to execute for each element.
 * @returns 
 */
Array.prototype.forEachAsync = function (callback) {
	return new Promise(async (res, rej) => {
		for (var i = 0; i <= this.length; i++) {
			if (i == this.length) {
				res();
			} else {
				await callback(this[i]);
			}
		}
	});
}

/**
 * Create class extensions which rely on knowing stuff from the Client.
 * @param {BookClient} Client 
 */
module.exports = (Client) => {

	String.prototype.getLang = function () {
		try {
			return Client.LanguageHandler.get(this.toString());
		} catch (error) {
			return null;
		}
	}
}