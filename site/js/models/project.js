var Project = Backbone.Model.extend({
  idAttribute: "_id",

  defaults: {
    projectImage: 'img/oz.jpg'
  },

  urlRoot: '/api/projects'
});