'use strict';

module.exports = (string) => {
    try {
        JSON.parse(string);
    } catch (error) {
        return false;
    }

    return true;
};
