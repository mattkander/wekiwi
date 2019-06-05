module.exports = (url, name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

    let myExpression = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        myResults = myExpression.exec(url);

    return myResults === null ? '' : decodeURIComponent(myResults[1].replace(/\+/g, ' '));
}
