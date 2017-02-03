var express = require ('express');
var session = require ('express-session');
var bodyParser = require ('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require ('morgan');
var mongoose=require('mongoose');
var config = require ('./config');
var path = require('path');
var app = express();
var passport = require('passport');
var flash = require('flash');
var MongoStore = require('connect-mongo')(session);


//------------------------��������� ������-----------------------
	app.use(morgan('tiny'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cookieParser());	
	
	app.use(session({
		secret: config.secret,
		key: config.key,
		cookie: config.cookie,
		resave: false,
		saveUninitialized:true,
		store: new MongoStore({mongooseConnection: mongoose.connection})
	}));
	//����������� �������� (������������� �� � html)
	app.set('view engine', 'pug');
	//����� ��� ����� �������
	app.set('views', __dirname + '/views');
	app.use(express.json());
	app.use(express.urlencoded());
    app.use(express.methodOverride());
	
	
	
	app.use(express.session());
	app.use(flash());
	// ������������ Passport
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	

	require('./routes')(app);
	app.use(express['static'](path.join(__dirname, './views')));
	
//-------------------��������� � ����� ��������------------------
	app.listen(config.port, err => {
		if (err) throw err;
		console.log(`Server listening on port ${config.port}`);
	});
	

	module.exports=app;