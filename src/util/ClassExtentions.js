/*
    A file which adds utility funtions to existing classes to make life easier
    Examples include string.format, array.random, array.forEachAsync and other things
*/

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