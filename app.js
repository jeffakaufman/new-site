var application_root = __dirname,
    assets = require('connect-assets'),
    express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    formidable = require('formidable'),
    knox = require('knox'),
    ini = require('node-ini');
var app = express();

// Load Config INI
var cfg = ini.parseSync('./config.ini');

// Configure S3 Client
var s3Client = knox.createClient({
    key: cfg.s3.access_key_id,
    secret: cfg.s3.secret_access_key,
    bucket: cfg.s3.bucket
});

app.configure(function() {
    app.set('port', 4711);
    app.locals.pretty = true;
    app.use(assets({
        src: __dirname + '/site'
    }));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, 'site')));
});

//Connect to database
mongoose.connect(cfg.db.url + cfg.db.database);

// Configure Projects Collection API Routes
require('./routes/projects').use(app, mongoose);

// Configure Books Collection API Routes
require('./routes/books').use(app, mongoose);

// Configure File Upload Route
require('./routes/upload').use(app, s3Client);

app.get('/api', function(request, response) {
    response.send('Library API is running');
});

app.get("/", function(request, response) {
    response.render('index.jade');
});

var port = process.env.PORT || 4711;
app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});