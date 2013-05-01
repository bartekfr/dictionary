var app = app || {};

app.Router = Backbone.Router.extend({
	routes: {
		":word": "showWord"
	},
	showWord: function (word) {
		console.log(word);
	}
});
var router = new app.Router();

Backbone.history.start() 