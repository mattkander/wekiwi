'use strict';

var assert = require('assert');

window.find = Node.prototype.find = function(selector, returnArray) {
	assert(typeof selector === 'string', 'Required argument "selector" is not a String or undefined');

	let myResult;
	if(this instanceof Node) {
		myResult = this.querySelectorAll(selector)
	}
	else {
		myResult = document.querySelectorAll(selector);
	}

	return myResult.length === 1 && !returnArray ? myResult[0] : myResult;
};

Node.prototype.on = window.on = function(name, fn) {
    this.addEventListener(name, fn);
}

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function(name, fn) {
	[].forEach.call(this, (element, index) => {
		element.on(name, fn);
	});
}
