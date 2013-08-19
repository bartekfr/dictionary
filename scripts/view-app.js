var app = app || {};

(function($) {
	app.AppView = Backbone.View.extend({
		el: '#dictionary',
		//statsTemplate: _.template(),
		events: {
			'click #save': 'addEntry',
			'click #search': 'search',
			'keyup #eng-word': 'keypress',
			'keyup #translated-word': 'keypress',
			'click #clear': 'clear',
			'click #delete': 'delete'
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
			app.entries.fetch();
		},
		addEntry: function() {
			var words = this.getWords();
			var entry = new app.Entry({
				englishWord: words[0],
				translatedWord: words[1]
			});
			entry.on('invalid', this.err, this);
			app.entries.create(entry, {
				wait: true
			});
			this.clear();
		},
		add: function(entry) {
			entry.on('invalid', this.err, this);
			var view = new app.EntryView({model: entry});
			this.$list.append(view.render().el);
		},
		addAll: function() {
			this.$('#term-list').html('');
			app.entries.each(this.add, this);
		},
		search: function() {
			var words = this.getWords();
			if(words[0]) {
				this.showWord(words[0]);
			} else if (words[1]) {
				this.showWord(null, words[1]);
			}
		},
		getWords: function() {
			var englishWord = this.$englishWord.val();
			var translatedWord = this.$translatedWord.val();
			return [englishWord.trim(), translatedWord.trim()];
		},
		showWord: function(englishWord, translatedWord) {
			var matched;
			if(englishWord !== null) {
				matched = app.entries.where({'englishWord': englishWord});
			} else if (typeof translatedWord !== 'undefined') {
				matched = app.entries.where({'translatedWord': translatedWord});
			}
			if(!matched.length) {
				this.$error.show().html('there is no such word in dictionary').delay(1000).fadeOut(1000);
				return false;
			}

			app.entries.each(function(entry) {
				entry.trigger('hide');
			});
			_.each(matched, function(entry) {
				entry.trigger('show');
			});
			app.router.navigate(englishWord);
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
			return false;
		},
		delete: function() {
			this.trigger('deleteAction');
			return false;
		}
	});
})(jQuery);
