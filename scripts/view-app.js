var app = app || {};

app.AppView = Backbone.View.extend({
	el: '#dictionary',
	//statsTemplate: _.template(),
	events: {
		'click #save': 'addEntry',
		'click #search': 'search',
		'keypress #eng-word': 'keypress',
		'keypress #translated-word': 'keypress',
		'click #clear': 'clear'
	},
	initialize: function() {
		this.save = this.$('#save');
		this.$translatedWord = this.$('#translated-word');
		this.$englishWord = this.$('#eng-word');
		this.$main = this.$('#main');
		this.$error = this.$('.error span');
		this.$list = $('.term-list');

		app.entries.on('add', this.add, this);
		app.entries.on('reset', this.addAll, this);
		//app.entries.on('invalid', this.err, this);
		app.entries.fetch();
	},
	addEntry: function() {
		var english = this.$englishWord.val();
		var translated = this.$translatedWord.val();
		var entry = new app.Entry();
		entry.on('invalid', this.err, this);
		entry.set({
			englishWord: english.trim(),
			translatedWord: translated.trim()
		},{validate: true});
		if(entry.validationError) {
			return false;
		}
		app.entries.add(entry);
		this.$error.html('');
		this.$englishWord.val('');
		this.$translatedWord.val('');
		//this.$list.empty();
		//app.entries.fetch();
	},
	search: function() {
		var englishWord = this.$englishWord.val();
		var translatedWord = this.$translatedWord.val();
		if(englishWord === '' && translatedWord === '') {
			app.entries.show();
			return false;
		}
		if(englishWord) {
			this.showWord(englishWord);
		} else if (translatedWord) {

			this.showWord(null, translatedWord);
		}
	},
	showWord: function(englishWord, translatedWord) {
		var entries;
		if(englishWord !== null) {
			entries = app.entries.where({'englishWord': englishWord});
		} else if (typeof translatedWord !== 'undefined') {
			entries = app.entries.where({'translatedWord': translatedWord});
		}
		if(!entries.length) {
			this.$error.show().html('there is no such word in dictionary').delay(1000).fadeOut(1000);
			return false;
		}
		//var translatedWord = entry.get('translatedWord');
		app.entries.each(function(entry) {
			entry.trigger('hide');
		});
		_.each(entries, function(entry) {
			entry.trigger('show');
		});
		app.router.navigate(englishWord);
	},
	add: function(entry) {
		var view = new app.EntryView({model: entry});
		this.$list.append(view.render().el);
		entry.on('invalid', this.err, this);
		entry.save();
	},
	addAll: function() {
		this.$('#term-list').html('');
		app.entries.each(this.add, this);
	},
	err: function(model, error) {
		this.$error.show().html(error).delay(1000).fadeOut(1000);
	},
	keypress: function(e) {
		if(e.which === 13) {
			this.addEntry();
		}
	},
	clear: function() {
		app.entries.show();
		this.$translatedWord.val('');
		this.$englishWord.val('');
		app.router.navigate('');
	}
});