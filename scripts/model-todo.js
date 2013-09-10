var app = app || {};

/*before initializing application you have to create MongoLab account,
 create appropriate collection and use your API key in the configuartion object like below
var app = app || {};
	app.config = {
		baseUrl: 'https://api.mongolab.com/api/1/databases/dict/collections/',
		params: '?apiKey=<YOUR API KEY HERE>'
	};
*/

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

