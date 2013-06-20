var AppLayout = Backbone.Marionette.Layout.extend({
	template: "#App-Layout",

	el: "body",

	regions: {
		header: ".head",
		main: ".main",
		footer: ".footer"
	}
});