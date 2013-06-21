var AppController = Marionette.Controller.extend({

	start: function() {
		this.appLayout = new AppLayout();
		this.appLayout.render();
		this.headerView = new HeadView();
		this.appLayout.header.show(this.headerView);
		this.home();
	},

	home: function() {
		var rgView = new HomeView();
		this.appLayout.homepage.show(rgView);
		this.headerView.selectMenuItem('home-menu');
	},

	users: function() {
		this.appLayout.homepage.close();
		var rgView = new UsersView();
		this.appLayout.main.show(rgView);
		this.headerView.selectMenuItem('users-menu');
	},

	thanks: function() {
		var rgView = new ThanksView({});
		this.appLayout.main.show(rgView);
	},

	admin: function() {
		this.appLayout.homepage.close();
		var rgView = new AdminView();
		this.appLayout.main.show(rgView);
		this.headerView.selectMenuItem('admin-menu');
	},

	register: function() {
		this.appLayout.homepage.close();
		var rgView = new RegisterView();
		this.appLayout.main.show(rgView);
		this.headerView.selectMenuItem('register-menu');
		Holder.run();
	},

	user: function(id) {
		var user = new User();
		user.id = id;
		this.appLayout.main.reset();
		that = this;
		user.fetch({
			success: function(user) {
				var rgView = new UserView({
					model: user
				});
				that.appLayout.main.show(rgView);
			}
		});
	},


});