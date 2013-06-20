var ReviewedUserView = Backbone.Marionette.ItemView.extend({
	id: "reviewed-user-view",

	template: "#ReviewedUser",

	tagName: "tr",

	events: {
		"click .approve": "approve",
		"click .reject": "reject",
		"click .delete": "delete",
		"click .view": "view"
	},

	modelEvents: {
		"change": "render"
	},

	render: function() {
		Backbone.Marionette.ItemView.prototype.render.call(this);
	},

	onRender: function() {
		var status = this.model.get("status");
		this.$el.addClass("user-row");
		this.$el.addClass("r-" + status);
		if (status != "unreviewed") {
			this.$el.addClass("hidden");
		}
		switch (status) {
			case "approved":
				this.$(".approve[data-status='approved']").hide();
				break;
			case "rejected":
				this.$(".reject[data-status='rejected']").hide();
				break;
		}
	},

	approve: function() {
		this.model.approve();
		this.$el.removeClass("r-rejected");
		this.$el.addClass("r-approved");
		return false;
	},

	reject: function() {
		this.model.reject();
		this.$el.addClass("r-rejected");
		this.$el.removeClass("r-approved");
		return false;
	},

	delete: function() {
		this.model.destroy();
		return false;
	},

	view: function() {
		var modal = _.template($("#UserModal").html(), this.model.attributes);
		this.$(".user-modal").html(modal);
		this.$("#myModal").modal();
		this.$("#myModal").modal('show');
		return false;
	}
});