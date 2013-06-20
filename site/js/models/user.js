var User = Backbone.Model.extend({
  idAttribute: "_id",

  defaults: {
    coverImage: 'img/oz.jpg',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    telephone: '',
    email: '',
    password: '',
    age: '',
    birthMonth: '',
    birthDay: '',
    status: 'unreviewed',
    about: '',
    upVotes: 0,
    downVotes: 0
  },


  parse: function(response) {
    response.id = response._id;
    return response;
  },

  upVote: function(cb) {
    this.save({}, {
      type: "POST",
      url: "/api/books/upvote/" + this.id + "/",
      success: cb
    });
  },

  downVote: function() {
    this.save({}, {
      type: "POST",
      url: "/api/books/downvote/" + this.id + "/"
    });
  },

  approve: function() {
    this.save({}, {
      type: "POST",
      url: "/api/books/approve/" + this.id + "/"
    });
  },

  reject: function() {
    this.save({}, {
      type: "POST",
      url: "/api/books/reject/" + this.id + "/"
    });
  },

  urlRoot: '/api/books'
});