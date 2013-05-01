var app = app || {};

app.EntryView = Backbone.View.extend({
	tagName:  'li',
	className: 'entry-item',

	template: _.template( $('#item-template').html() ),

	events: {
		'click .edit':	'editHandler',
		'click .destroy':	'clear',
		'click .save-edit': 'save',
		'dblclick .english': 'edit',
		'dblclick .translated': 'edit',
		'keypress .english': 'updateOnEnter',
		'keypress .translated': 'updateOnEnter'
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'hide', this.hide);
		this.listenTo(this.model, 'show', this.show);
	},

	render: function() {
		this.$el.removeClass('editing');
		this.$el.html( this.template( this.model.toJSON() ) );
		this.$english = this.$el.find('.english');
		this.$translated = this.$el.find('.translated');
		this.$edit = this.$el.find('.edit');
		return this;
	},
	edit: function() {
		this.$edit.attr('checked', 'chedked');
		this.editHandler();
	},
	editHandler: function() {
		var $this = this.$edit;
		if($this.is(':checked')) {
			this.$el.addClass('editing');
		} else {
			this.$el.removeClass('editing');
		}
	},
	hide: function() {
		this.$el.hide();
	},
	show: function() {
		this.$el.show();
	},
	save: function() {
		this.model.set({
			englishWord: this.$english.val(),
			translatedWord: this.$translated.val()			
		}, {validate: true});
		this.render();
		this.model.save();
	},

	updateOnEnter: function( e ) {
		if ( e.which === ENTER_KEY ) {
			this.save();
			return false;
		} else {
			if(!this.$edit.is(':checked')) {
				return false;
			}
		}
	},

	clear: function() {
		this.model.destroy();
	},
	
	err: function() {
		alert('error');
	},
	wordClick: function(e) {
		if(!this.$edit.is(':checked')) {
			console.log(this)
			e.preventDefault();
			return false;
		}
	}
});
