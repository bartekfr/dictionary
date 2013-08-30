var app = app || {};


(function($){
	app.Router = Backbone.Router.extend({
		routes: {
			"en/:word": "showWord",
			"pl/:word": "showPolishWord"
		},
		showWord: function (word) {
			app.main.showWord(word);
		},
		showPolishWord: function(word) {
			app.main.showWord(null, word);
		}
	});
	app.router = new app.Router();
	Backbone.history.start();
})(jQuery);
