var ProjectsView = SortedView.extend({
	id: "project-view",

	template: "#Project",

	itemView: ProjectsView,

	itemViewContainer: ".project-list",

	initialize: function() {
		that = this;
		this.collection = new Projects();
		console.log(this.collection);
	},

	onRender: function() {
	}
});