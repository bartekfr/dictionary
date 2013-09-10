var app = app || {};

(function($){
	app.Entry = Backbone.Model.extend({
		urlRoot: 'model',
		validate: function(attrs, options) {
			if(attrs.englishWord === '' || attrs.translatedWord === '' ) {
				return "Neither word nor translation can be empty.";
			}
		}
	});
})(jQuery);




