var app = app || {};

app.BookView = Backbone.View.extend({
    events: {
        'click .delete': 'deleteBook',
        'click .reset': 'resetEntry',
        'click .approve': 'approveEntry',
        'click .reject': 'rejectEntry'
    },

    deleteBook: function() {
        //Delete model
        this.model.destroy();

        //Delete view
        this.remove();
    },
    
    approveEntry: function() {
        this.model.set({'status': 'approved'});
        this.model.save(this.model.id);
        this.$el.hide();
        this.$el.addClass('approved');
        this.$el.removeClass('rejected');
    },
    
    rejectEntry: function() {
        this.model.set({'status': 'rejected'});
        this.model.save(this.model.id);
        this.$el.hide();
        this.$el.addClass('rejected');
        this.$el.removeClass('approved');
    },
    
    resetEntry: function() {
        this.model.set({'status': 'unreviewed'});
        this.model.save(this.model.id);
        this.$el.hide();
        this.$el.removeClass('rejected');
        this.$el.removeClass('approved');
    },
    
    tagName: 'div',
    className: 'bookContainer span5 offset1',
    template: _.template( $( '#bookTemplate' ).html() ),
    
    initialize: function () {
    	this.model.bind('change', _.bind(this.render, this));
	},

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    }
});