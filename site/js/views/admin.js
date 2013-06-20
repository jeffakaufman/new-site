var AdminView = SortedView.extend({

	id: "admin-view",

	template: "#Admin",

	itemView: ReviewedUserView,

	itemViewContainer: "tbody",

	events: {
		"click .all-users": "all",
		"click .approved-users": "approved",
		"click .rejected-users": "rejected",
		"click .unreviewed-users": "unreviewed"
	},

	currentStatus: "unreviewed",

	initialize: function() {
		this.collection = new Users();
		this.collection.fetch();
		this.on("composite:collection:rendered", this.unreviewed);
	},

	onBeforeRender: function() {
	},

	onRender: function() {
		this.unreviewed();
	},

	all: function() {
		this.$(".user-row").removeClass("hidden");
		return false;
	},

	unreviewed: function() {
		this.showStatus("unreviewed");
		return false;
	},

	approved: function() {
		this.showStatus("approved");
		return false;
	},

	rejected: function() {
		this.showStatus("rejected");
		return false;
	},

	showStatus: function(status) {
		this.currentStatus = status;
		this.$(".user-row").addClass("hidden");
		this.$(".r-" + status).removeClass("hidden");
	}
});