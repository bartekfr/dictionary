var app = app || {};

(function($){
	app.EntriesCollection = Backbone.Collection.extend({
		model: app.Entry,
		url: app.config.baseUrl + 'EntriesCollection' + app.config.params,
		comparator: function(entry) {
			return entry.get('englishWord');
		},
		show: function() {
			_.each(this.models, function(model) {
				model.trigger('show');
			});
		},
		hide: function() {
			_.each(this.models, function(model) {
				model.trigger('hide');
			});
		}
	});

	app.entries = new app.EntriesCollection();
})(jQuery);
