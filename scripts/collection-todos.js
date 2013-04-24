var app = app || {};

app.EntriesCollection = Backbone.Collection.extend({
	model: app.Entry,
	localStorage: new Backbone.LocalStorage('dictionary-entries2'),
	comparator: function(entry) {
		return entry.get('englishWord');
	}
});

app.entries = new app.EntriesCollection();
