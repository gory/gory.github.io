'use strict';

let Section = require('./Section');

class SectionManager {
	constructor(element, excludes, scrollPosition) {

		this.element = element;
		this.scrollPosition = scrollPosition;
		this.excludes = excludes;
		this.sections = [];

		this.setup();

	}

	setup() {
		let sectionsNL = this.element.querySelectorAll('section');
		let sections = Array.prototype.slice.call(sectionsNL)
		let sl = sections.length;

		for (let i=0; i < sl;  i++) {
			let mySection = sections[i];
			for (let myAttribute of this.excludes) {
				if ( mySection.attributes.hasOwnProperty(myAttribute) ) {
					sections.splice(i, 1);
				}
			}
		}

		sl = sections.length;
		for (let i=0; i < sl;  i++) {
			let mySection = sections[i];
			let newSection = new Section(mySection);
			this.sections.push(newSection);
		}
	}

	refresh(position) {
		this.scrollPosition = position;
	}

	scrollUpdate(position) {
		this.refresh(position);
		for (let mySection of this.sections) {
			mySection.scrollUpdate(position);
		}

	}
}

module.exports = SectionManager;