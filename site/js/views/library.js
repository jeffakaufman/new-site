var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',

    initialize: function(initialBooks) {
        this.collection = new app.Library();
        this.collection.fetch({
            reset: true
        });
        this.render();
        this.listenTo(this.collection, 'add', this.renderBook);
        this.listenTo(this.collection, 'reset', this.render);
        this.status = 'unreviewed'
    },

    // render library by rendering each book in its collection
    render: function() {
    	if (!this.status) {	this.status = 'unreviewed' } 
	     this.collection.currentStatus(this.status).each(function(item) {
	         this.renderBook(item);
	     }, this);
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderBook: function(item) {
        var bookView = new app.BookView({
            model: item
        });
        $('#bob').append(bookView.render().el);
    },

    events: {
        "click #add": "addHandler",
        "click #approved": "entrantStatus",
        "click #rejected": "entrantStatus",
        "click #unreviewed": "entrantStatus",
        "drop #picture": "dropHandler",
        "dragover #picture": "dragoverHandler"
    },

    addHandler: function(e) {
        if (this.files) {
            this.files.submit();
            return false;
        }
        this.saveNewBook();
        return false;
    },

    saveNewBook: function(bookprojectImageUrl) {
        // if the user selected a file to upload, then upload it first
        var formData = {};
        $('#addBook div').children('input').each(function(i, el) {
            if ($(el).val() != '') {
                if (el.id === 'keywords') {
                    formData[el.id] = [];
                    _.each($(el).val().split(' '), function(keyword) {
                        formData[el.id].push({
                            'keyword': keyword
                        });
                    });
                } else if (el.id === 'releaseDate') {
                    formData[el.id] = $('#releaseDate').datepicker('getDate').getTime();
                } else {
                    formData[el.id] = $(el).val();
                }
            }
            // Clear input field value
            $(el).val('');
        });
        if (bookprojectImageUrl && bookprojectImageUrl.replace(/\s+/g, '').length > 0) {
            formData["projectImage"] = bookprojectImageUrl;
        }
        this.collection.create(formData);
        // Clear current files property
        this.files = null;
        // Restore to default image
        $('#picture').attr('data-src', 'holder.js/150x150/text:Drag a picture here/gray');
        $('#addBook').trigger('reset');
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
        console.log(file);
        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function() {
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(file);
    },

    entrantStatus: function(event) {
        event.preventDefault();
        this.status = $(event.currentTarget).attr("id");
	    $('#bob').empty()
        this.render();
    }
});