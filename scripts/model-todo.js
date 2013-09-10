var app = app || {};

(function($){
	app.Entry = Backbone.Model.extend({
		defaults: {
			englishWord: ''
		},
		//idAttribute: '_id',
		url: function() {
			if(_.isUndefined(this.id)) {
				return app.config.baseUrl + 'EntriesCollection' + app.config.params;
			} else {
				return app.config.baseUrl + 'EntriesCollection/' + encodeURIComponent(this.id) + app.config.params;
			}
		},
		validate: function(attrs, options) {
			if(attrs.englishWord === '' || attrs.translatedWord === '' ) {
				return "Neither word nor translation can be empty.";
			}
		}
	});
})(jQuery);

