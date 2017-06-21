'use strict';

var Main = (function() {
		var html = document.documentElement;
		return {
		initialize: function() {
			this.initJS();
		},
		initJS: function() {
			html.classList.add('js');
			html.classList.remove('no-js');
		}
	}
}());

module.exports = Main.initialize();