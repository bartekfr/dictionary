var app = app || {};

app.Router = Backbone.Router.extend({
	routes: {
		":word": "showWord"
	},
	showWord: function (word) {
		appView.showWord(word);
	}
});
app.router = new app.Router();
Backbone.history.start();