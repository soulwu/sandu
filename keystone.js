// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': '三度资讯 - 嘉兴希望杯',
	'brand': '三度资讯 - 嘉兴希望杯',

	'sass': 'public',
	'static': ['public', 'data'],
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'session store': 'connect-redis',
	'trust proxy': true,
	'auth': true,
	'user model': 'User',
	'mongo': 'mongodb://localhost/sandu',

	'wysiwyg skin': 'lightgray',
	'wysiwyg override toolbar': true,
	'wysiwyg additional plugins': 'advlist,anchor,autolink,charmap,colorpicker,directionality,hr,image,insertdatetime,lists,media,noneditable,paste,searchreplace,table,textcolor,wordcount',
	'wysiwyg additional options': {
		toolbar: 'bold italic forecolor backcolor | alignleft aligncenter alignright | bullist numlist | outdent indent | charmap image media | link unlink | anchor | code'
	},
	'wysiwyg menubar': true
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	'用户管理': 'users',
	'内容管理': ['post-categories', 'posts']
});

keystone.set('port', process.env.PORT || 8081);

// Start Keystone to connect to your database and initialise the web server

keystone.start();
