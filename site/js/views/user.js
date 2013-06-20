var UserView = Backbone.Marionette.ItemView.extend({
	id: "user-view",

	tagName: "li",

	className: "well user-view",

	template: "#User",

	events: {
		"click .vote-yes": "upVote",
		"click .vote-no": "downVote"
	},

	modelEvents: {
		"change": "render"
	},

	render: function() {
		Backbone.Marionette.ItemView.prototype.render.call(this);
	},

	upVote: function() {
		var that=this;
		this.model.upVote(function(){
			that.$(".vote-yes").prop("disabled","true");
		});
		return false;
	},

	downVote: function() {
		this.model.downVote();
		return false;
	}
});