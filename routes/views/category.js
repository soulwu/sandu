var keystone = require('keystone');
var PostCategory = keystone.list('PostCategory');
var Post = keystone.list('Post');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var cid = req.query.cid;
	locals.section = cid;
	locals.baseUrl = '/category?cid=' + cid + '&page=';

	view.query('category', PostCategory.model.findById(cid)).then(function(err, result, next) {
		locals.breadcrumb.push({href: '/category?cid=' + cid, name: result.name});
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
			.where('categories').in([cid])
			.sort('-publishedAt')
	);

	view.render('category');
};
