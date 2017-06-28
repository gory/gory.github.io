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
