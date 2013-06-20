var HeadView = Backbone.Marionette.ItemView.extend({
	id: "head-view",

	template: "#Head",
	
	selectMenuItem: function (menuItem) {
		$('.nav li').removeClass('active');
		if (menuItem) {
			$('.' + menuItem).addClass('active');
		}
	}

});