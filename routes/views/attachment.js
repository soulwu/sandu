var keystone = require('keystone');
var _ = require('lodash');
var Post = keystone.list('Post');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var pid = req.query.pid;
	var aid = req.query.aid;

	view.query('post', Post.model.findById(pid));

	view.render(function(err, req, res) {
		var attachment = _.find(locals.post.attachments, {id: aid});
		if (attachment) {
			res.download(attachment.path + '/' + attachment.filename, attachment.originalname);
		} else {
			res.sendStatus(404);
		}
	});
};
