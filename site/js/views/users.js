var UsersView = SortedView.extend({
	id: "users-view",

	template: "#Users",

	itemView: UserView,

	itemViewContainer: ".users-list",

	events: {
		"click .sort-by-date": "srotByDate",
		"click .sort-by-yes": "srotByYes"
	},

	initialize: function() {
		that = this;
		this.collection = new Users();
	},

	onBeforeRender: function() {
		var that = this;
		this.collection.fetch({
			"success": function(col) {
				filtered = col.models.filter(function(f) {
					return f.get('status') === "approved";
				});
				that.collection.reset(filtered);
			}
		});
	},

	onRender: function() {
	},

	srotByDate: function() {
		this.collection.sortUsing("createdOn");
		this.render();
		return false;
	},

	srotByYes: function() {
		this.collection.sortUsing("upVotes");
		this.render();
		return false;
	}
});