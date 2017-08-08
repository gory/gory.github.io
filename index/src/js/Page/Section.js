'use strict';


class Section {
	constructor(element) {
		this.element = element;
		this.offset = this.element.offsetTop;
		this.h = this.element.clientHeight;
	}

	scrollUpdate(position) {
		if ( (position > this.offset) && (position < (this.offset + this.h) ) ) {
			this.activePosition(position);
		} else {
			this.notActive();
		}
	}

	activePosition(position) {
		let max = this.h;
		let place = position - this.offset;

		let percent = place / max;
		console.log(percent);
	}

	notActive() {
		//
	}
}

module.exports = Section;