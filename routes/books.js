/*
    Books collection API calls
*/
mongoose = require('mongoose')

exports.use = function(app, mongoose) {

    var Book = new mongoose.Schema({
        firstName: String,
        lastName: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        zip: String,
        telephone: String,
        projectImage: String,
        email: String,
        password: String,
        age: Number,
        birthMonth: String,
        birthDay: Number,
        about: String,
        status: {
            type: String,
            default: "unreviewed"
        },
        upVotes: {
            type: Number,
            default: 0
        },
        downVotes: {
            type: Number,
            default: 0
        },
        createdOn: {
            type: Date,
            default: new Date()
        },

    });

    //Models
    var BookModel = mongoose.model('Book', Book);

   /* app.get('/api', function(request, response) {
        response.send('Library API is running');
    });*/

    //Get a list of all books
    app.get('/api/books', function(request, response) {
        return BookModel.find(function(err, books) {
            if (!err) {
                return response.send(books);
            } else {
                return console.log(err);
            }
        });
    });

    //Insert a new book
    app.post('/api/books', function(request, response) {
        console.log(request.body);
        var book = new BookModel({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            address1: request.body.address1,
            address2: request.body.address2,
            city: request.body.city,
            state: request.body.state,
            zip: request.body.zip,
            telephone: request.body.telephone,
            email: request.body.email,
            password: request.body.password,
            age: request.body.age,
            birthMonth: request.body.birthMonth,
            birthDay: request.body.birthDay,
            projectImage: request.body.projectImage,
            about: request.body.about
        });
        //console.log(book);
        book.save(function(err) {
            if (!err) {
                return console.log('created');
            } else {
                return console.log(err);
            }
        });
        return response.send(book);
    });

    //Get a single book by id
    app.get('/api/books/:id', function(request, response) {
        return BookModel.findById(request.params.id, function(err, book) {
            if (!err) {
                return response.send(book);
            } else {
                return console.log(err);
            }
        });
    });

    //Update a book
    app.put('/api/books/:id', function(request, response) {
        console.log('Updating book ' + request.params.id);
        return BookModel.findById(request.params.id, function(err, book) {
            book.status = request.body.status;
            console.log(book);
            return book.save(function(err) {
                if (!err) {
                    console.log('book updated');
                } else {
                    console.log(err);
                }
                return response.send(book);
            });
        });
    });

    //Delete a book
    app.delete('/api/books/:id', function(request, response) {
        console.log('Deleting book with id: ' + request.params.id);
        return BookModel.findById(request.params.id, function(err, book) {
            return book.remove(function(err) {
                if (!err) {
                    console.log('Book removed');
                    return response.send('');
                } else {
                    console.log(err);
                }
            });
        });
    });

    // Upvote a book
    app.post('/api/books/upvote/:id/', function(request, response) {
        console.log('Up Voting book ' + request.params.id);
        return BookModel.findById(request.params.id, function(err, book) {
            book.upVotes = book.upVotes + 1;
            console.log(book);
            return book.save(function(err) {
                if (!err) {
                    console.log('book updated');
                } else {
                    console.log(err);
                }
                return response.send(book);
            });
        });
    });

    // Down vote a book
    app.post('/api/books/downvote/:id/', function(request, response) {
        console.log('Down Voting book ' + request.params.id);
        return BookModel.findById(request.params.id, function(err, book) {
            book.downVotes = book.downVotes + 1;
            console.log(book);
            return book.save(function(err) {
                if (!err) {
                    console.log('book updated');
                } else {
                    console.log(err);
                }
                return response.send(book);
            });
        });
    });

    // Approve
    app.post('/api/books/approve/:id/', function(request, response) {
        console.log('Approving book ' + request.params.id);
        return BookModel.findById(request.params.id, function(err, book) {
            book.status = "approved";
            console.log(book);
            return book.save(function(err) {
                if (!err) {
                    console.log('book updated');
                } else {
                    console.log(err);
                }
                return response.send(book);
            });
        });
    });

    // Reject a book
    app.post('/api/books/reject/:id/', function(request, response) {
        console.log('Down Voting book ' + request.params.id);
        return BookModel.findById(request.params.id, function(err, book) {
            book.status = "rejected";
            console.log(book);
            return book.save(function(err) {
                if (!err) {
                    console.log('book updated');
                } else {
                    console.log(err);
                }
                return response.send(book);
            });
        });
    });
}