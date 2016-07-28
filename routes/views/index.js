var keystone = require('keystone');
var PostCategory = keystone.list('PostCategory');
var Post = keystone.list('Post');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	view.on('init', function(next) {
		PostCategory.model.find().exec(function(err, categories) {
			locals.categories = categories;
			next();
		});
	});
	view.on('init', function(next) {
		if (locals.categories) {
			locals.categories.map(function(category) {
				view.query('posts.' + category.id, Post.model.find().where('categories').in([category.id]).sort('-publishedAt').limit(5));
			});
		}

		next();
	});

	// Render the view
	view.render('index');
};
