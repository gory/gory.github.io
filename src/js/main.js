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