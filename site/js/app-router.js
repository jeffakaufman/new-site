var AppRouter = Backbone.Marionette.AppRouter.extend({
	appRoutes: {
		'': 'home',
		'users': 'users',
		'portfolio': 'projects',
		'thanks': 'thanks',
		'admin': 'admin',
		'register': 'register',
		'user/:id': 'user'
	}
});