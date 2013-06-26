/*
    Projects collection API calls
*/
mongoose = require('mongoose')

exports.use = function(app, mongoose) {

    var Technologies = new mongoose.Schema({
    	technology: String
    });
    
    var Types = new mongoose.Schema({
    	type: String
    });
    
    var Project = new mongoose.Schema({
        name: String,
        types: [ Types ],
        technologies: [ Technologies ],
        vertical: String,
        client: String,
        description: String,
        projectImage: {
            type: String,
            default: "img/oz.jpg"
        },
        createdOn: {
            type: Date,
            default: new Date()
        },

    });

    //Models
    var ProjectModel = mongoose.model('Project', Project);

    app.get('/api', function(request, response) {
        response.send('Project API is running');
    });

    //Get a list of all books
    app.get('/api/projects', function(request, response) {
        return ProjectModel.find(function(err, projects) {
            if (!err) {
                return response.send(projects);
            } else {
                return console.log(err);
            }
        });
    });

    //Insert a new book
    app.post('/api/projects', function(request, response) {
        console.log(request.body);
        var project = new ProjectModel({
        	name: request.body.name,
        	types: request.body.types,
        	technologies: request.body.technologies,
        	vertical: request.body.vertical,
        	client: request.body.client,
        	description: request.body.description,
        	projectImage: request.body.image
        });
        //console.log(book);
        project.save(function(err) {
            if (!err) {
                return console.log('created');
            } else {
                return console.log(err);
            }
        });
        return response.send(project);
    });

    //Get a single book by id
    app.get('/api/projects/:id', function(request, response) {
        return ProjectModel.findById(request.params.id, function(err, project) {
            if (!err) {
                return response.send(project);
            } else {
                return console.log(err);
            }
        });
    });

    //Update a book
    app.put('/api/projects/:id', function(request, response) {
        console.log('Updating project ' + request.params.id);
        return ProjectModel.findById(request.params.id, function(err, project) {
            project.name = request.body.name;
        	project.types = request.body.types;
        	project.technologies = request.body.technologies;
        	project.vertical = request.body.vertical;
        	project.client = request.body.client;
        	project.description = request.body.description;
        	project.image = request.body.image;
            console.log(project);
            return book.save(function(err) {
                if (!err) {
                    console.log('project updated');
                } else {
                    console.log(err);
                }
                return response.send(project);
            });
        });
    });

    //Delete a book
    app.delete('/api/projects/:id', function(request, response) {
        console.log('Deleting project with id: ' + request.params.id);
        return ProjectModel.findById(request.params.id, function(err, project) {
            return project.remove(function(err) {
                if (!err) {
                    console.log('Project removed');
                    return response.send('');
                } else {
                    console.log(err);
                }
            });
        });
    });

}