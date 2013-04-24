var app = app || {};

app.AppView = Backbone.View.extend({
	el: '#dictionary',
	//statsTemplate: _.template(),
	events: {
		'click #save': 'addEntry',
		'keypress #eng-word': 'keypress',
		'keypress #translated-word': 'keypress'
	},
	initialize: function() {
		this.save = this.$('#save');
		this.$translatedWord = this.$('#translated-word');
		this.$englishWord = this.$('#eng-word');
		this.$main = this.$('#main');
		this.$error = this.$('.error span');
		this.$list = $('.term-list');
		
		window.app.entries.on('add', this.add, this);
		window.app.entries.on('reset', this.addAll, this);
		//app.entries.on('invalid', this.err, this);
		window.app.entries.fetch();
	},
	addEntry: function() {
		var english = this.$englishWord.val();
		var translated = this.$translatedWord.val();
		var entry = new app.Entry();
		entry.on('invalid', this.err, this);
		entry.set({
			englishWord: english,
			translatedWord: translated
		},{validate: true});
		
		if(entry.validationError) {
			return false;
		}
		app.entries.add(entry);
		this.$error.html('');
		this.$englishWord.val('');
		this.$translatedWord.val('');
		this.$list.empty();
		window.app.entries.fetch();
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
		if(e.which === ENTER_KEY) {
			this.addEntry();
		}
	}
})