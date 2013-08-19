var app = app || {};


(function($){
	app.Router = Backbone.Router.extend({
		routes: {
			":word": "showWord"
		},
		showWord: function (word) {
			app.main.showWord(word);
		}
	});
	app.router = new app.Router();
	Backbone.history.start();
})(jQuery);
