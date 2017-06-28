(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

const CLONE = '[data-clone]';

class Page {
	constructor(element) {
		this.context = element;
		this.clones = element.querySelectorAll(CLONE);
		this.disableScroll = false;
		this.scrollHeight = 0;
		this.clonesHeight = 0;
		this.i = 0;

		console.log(this.getClonesHeight());
	}

	getScrollPosition() {
		return (this.context.pageYOffset || this.context.scrollTop) -
			(this.context.clientTop || 0);
	}

	setScrollPosition(position) {
		this.context.scrollTop = position;
	}

	getClonesHeight() {
		let clonesHeight = 0;
		for (var clone of this.clones) {
			clonesHeight = clonesHeight + clone.offsetHeight;
		}

		return clonesHeight;
	}
}

module.exports = Page;

},{}],2:[function(require,module,exports){
'use strict';

let Page = require('./Page/Page.js');

let Main = (function() {
	return {
		initialize: function() {
			console.log('hi');
			this.setupScroll();
		},
		setupScroll: function() {
			this.myPage = new Page(document.getElementById('main'));
		}
	}

}());

module.exports = Main.initialize();
},{"./Page/Page.js":1}]},{},[2])