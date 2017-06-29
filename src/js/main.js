'use strict';

let dat = require('exdat');
let Page = require('./Page/Page.js');

let Main = (function() {
	return {
		initialize: function() {
			this.setupScroll();
			this.gui = new dat.GUI();
		},
		setupScroll: function() {
			this.myPage = new Page(document.getElementById('main'));
		}
	}

}());

module.exports = Main.initialize();