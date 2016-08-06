var keystone = require('keystone');
var PostCategory = keystone.list('PostCategory');

exports = module.exports = function(done) {
	PostCategory.model.update({}, {order: 999, isShow: true}, done);
};
