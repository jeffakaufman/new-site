var ProjectView = Backbone.Marionette.ItemView.extend({
	id: "project-view",

	tagName: "li",

	className: "well project-view",

	template: "#Project",

	render: function() {
		Backbone.Marionette.ItemView.prototype.render.call(this);
	}
});