var RegisterView = Backbone.Marionette.ItemView.extend({
	id: "register-view",

	template: "#Register",

	events: {
		"click .register": "register",
		"drop #picture": "dropHandler",
		"dragover #picture": "dragoverHandler",
		"click #chooseImage": "showUpload"
	},

	ui: {
		form: "#books",
		beforeImg: '#projectImage',
		picture: '#picture',
		selectedFile: '.selected-file'
	},

	initialize: function() {
		this.collection = new Users();
	},

	render: function() {
		Backbone.Marionette.ItemView.prototype.render.call(this);
		var that = this;
		this.ui.beforeImg.fileupload({
			fileInput: this.ui.beforeImg,
			dropZone: this.ui.picture,
			dataType: 'json',
			url: '/upload',
			replaceFileInput: false,

			drop: function(e, data) {
				if (data && data.files && data.files > 0) {
					that.ui.beforeImg.text(data.files[0]);
					that.ui.selectedFile.text(data.files[0].name);
				}
			},
			change: function(e, data) {
				if (data && data.files && data.files.length > 0) {
					that.previewSelectedFile(data.files[0]);
					that.ui.selectedFile.text(data.files[0].name);
				}
			},
			done: function(e, data) {
				that.saveNewUser(data.result.url);
				that.$('#progress .bar').css('width', '0');
			},
			add: function(e, data) {
				that.files = data;
			},

			progressall: function(e, data) {
				var progress = parseInt(data.loaded / data.total * 100, 10);
				that.$('#progress .bar').css(
					'width',
					progress + '%');
			}
		}).bind('fileuploadfail', function(e, data) {
			console.log("failed");
			console.log(data);
		});
	},

	onRender: function() {

	},

	register: function(e) {
		if (this.files) {
			this.files.submit();
			return false;
		}
		this.saveNewUser();
		return false;
	},

	saveNewUser: function(imgUrl) {
		formData = this.ui.form.formParams();
		if (imgUrl) {
			formData["projectImage"] = imgUrl;
		}
		this.collection.create(formData, {
			success: function() {
				app.router.navigate("#thanks", {
					trigger: true
				});
			}
		})
		return false;
	},

	dropHandler: function(event) {
		event.stopPropagation();
		event.preventDefault();
		var e = event.originalEvent;
		e.dataTransfer.dropEffect = 'copy';
		this.previewSelectedFile(e.dataTransfer.files[0]);
	},

	dragoverHandler: function(event) {
		event.preventDefault();
	},

	previewSelectedFile: function(file) {
		//console.log(file);
		var reader = new FileReader();
		var that = this;
		reader.onloadend = function() {
			that.ui.picture.attr('src', reader.result);
		};
		reader.readAsDataURL(file);
	},

	showUpload: function() {
		this.$('#projectImage').trigger('click');
		return false;
	}
});