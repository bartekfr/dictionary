var app = app || {};

app.Entry = Backbone.Model.extend({
	defaults: {

	},
	urlRoot: 'model',
	validate: function(attrs, options) {
		if(attrs.englishWord === '' || attrs.translatedWord === '' ) {
			return "Neither word nor translation can be empty.";
		}
	}
});



