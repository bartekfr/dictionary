var app = app || {};

app.Entry = Backbone.Model.extend({
	defaults: {

	},
	validate: function(attrs, options) {
		if(attrs.englishWord === '' || attrs.translatedWord === '' ) {
			return "Value can't be empty.";
		} 
	}
});



