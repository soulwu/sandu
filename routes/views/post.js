var path = require('path');
var keystone = require('keystone');
var PostCategory = keystone.list('PostCategory');
var Post = keystone.list('Post');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var cid = req.query.cid;
	var pid = req.query.pid;

	locals.section = cid;

	view.query('category', PostCategory.model.findById(cid)).then(function(err, result, next) {
		locals.breadcrumb.push({href: '/category?cid=' + cid, name: result.name});
		locals.breadcrumb.push({href: '', name: ''});
		next();
	});

	view.query('post', Post.model.findById(pid));

	view.render('post', {
		filesize: require('filesize'),
		fileicon: function(filename) {
			var ext = path.extname(filename);

			switch (ext) {
				case '.mp3':
				case '.aac':
				case '.wma':
				case '.wav':
					return 'music';
				case '.avi':
				case '.mp4':
				case '.mkv':
					return 'film';
				case '.png':
				case '.gif':
				case '.jpg':
				case '.jpeg':
				case '.bmp':
				case '.psd':
					return 'picture';
				default:
					return 'file';
			}
		}
	});
};
