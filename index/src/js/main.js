'use strict';

let dat = require('exdat');
let Page = require('./Page/Page.js');

let Main = (function() {
	return {
		initialize: function() {
			this.gui = new dat.GUI();
			this.setupPage();
		},
		setupPage: function() {
			this.myPage = new Page(document.getElementById('main'));
		}
	}

}());

module.exports = Main.initialize();