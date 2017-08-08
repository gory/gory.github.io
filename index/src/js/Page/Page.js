'use strict';

const CLONE = '[data-clone]';
const INFINITE = '[data-infinite]';
const EXCLUDES = [
	'data-hero'
]

let SectionManager = require('./SectionManager');

class Page {
	constructor(element) {
		this.context = element;
		this.clones = Array.from(element.querySelectorAll(CLONE));
		this.infinites = Array.from(element.querySelectorAll(INFINITE));

		this.disableScroll = false;
		this.scrollHeight = document.body.scrollHeight;
		this.scrollPosition = 0;
		this.clonesHeight = 0;

		this.manager = new SectionManager(element, EXCLUDES, this.scrollPosition);

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

		this.manager.scrollUpdate(this.scrollPosition);
	}

	rafScrollUpdate() {
		let boundScrollUpdate = this.scrollUpdate.bind(this);
		window.requestAnimationFrame(boundScrollUpdate);
	}
}

module.exports = Page;
