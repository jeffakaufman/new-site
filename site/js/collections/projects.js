var Projects = Backbone.Collection.extend({
	model: Project,

	url: '/api/projects'

});