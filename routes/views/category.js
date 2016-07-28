var keystone = require('keystone');
var PostCategory = keystone.list('PostCategory');
var Post = keystone.list('Post');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var id = req.query.id;
	locals.section = id;
	locals.baseUrl = req.path + '?id=' + id + '&page=';

	view.query('category', PostCategory.model.findById(id)).then(function(err, result, next) {
		locals.breadcrumb.push({href: '/category?id=' + result.id, name: result.name});
		next();
	});
	view.query(
		'posts',
		Post
			.paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.where({state: '已发布'})
			.where('categories').in([id])
			.sort('-publishedAt')
	);

	view.render('category');
};
