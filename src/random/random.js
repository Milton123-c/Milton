const helpers = {};

helpers.randomName = () => {
    let randomName = 0;
    possible = "zxcvbnmasdfghjklñqwertyuiop123456789";

    for (let i = 0; i < 8; i++) {
        randomName += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return randomName;

};

module.exports = helpers;