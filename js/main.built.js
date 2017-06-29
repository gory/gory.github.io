(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

const CLONE = '[data-clone]';

class Page {
	constructor(element) {
		this.context = element;
		this.clones = element.querySelectorAll(CLONE);
		this.disableScroll = false;
		this.scrollHeight = 0;
		this.scrollPosition = 0;
		this.clonesHeight = 0;

		let boundRecalc = this.reCalculate.bind(this);

		window.requestAnimationFrame(boundRecalc);

		this.context.addEventListener('scroll', this.rafScrollUpdate.bind(this));
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

	reCalculate() {
		this.scrollPosition = this.getScrollPosition();
		this.scrollHeight = this.context.scrollHeight;
		this.clonesHeight = this.getClonesHeight();

		if (this.scrollPosition <= 1) {
			this.setScrollPosition(1);
		}
	}

	stopScroll() {
		this.disableScroll = false;
	}

	scrollUpdate() {
		if (!this.disableScroll) {
			this.scrollPosition = this.getScrollPosition();
			if (this.clonesHeight + this.scrollPosition >= this.scrollHeight) {
				this.setScrollPosition(1)
				this.disableScroll = true;
			} else if (this.scrollPosition <= 0) {
				this.setScrollPosition(this.scrollHeight - this.clonesHeight);
				this.disableScroll = true;
			}
		}

		if(this.disableScroll) {
			window.setTimeout(this.stopScroll.bind(this), 40);
		}
	}

	rafScrollUpdate() {
		let boundScrollUpdate = this.scrollUpdate.bind(this);
		window.requestAnimationFrame(boundScrollUpdate);
	}
}

module.exports = Page;

},{}],2:[function(require,module,exports){
'use strict';

let Page = require('./Page/Page.js');

let Main = (function() {
	return {
		initialize: function() {
			this.setupScroll();
		},
		setupScroll: function() {
			this.myPage = new Page(document.getElementById('main'));
		}
	}

}());

module.exports = Main.initialize();
},{"./Page/Page.js":1}]},{},[2])