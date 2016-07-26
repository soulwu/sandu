var keystone = require('keystone');
var Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
	label: '文章',
	plural: '文章',
	autokey: {path: 'slug', from: 'title', unique: true},
	map: {
		name: 'title'
	},
	defaultSort: '-createdAt',
	track: true,
	drilldown: 'category author'
});

Post.add({
	title: {type: String, required: true},
	state: {type: Types.Select, options: '草稿, 已发布, 已归档', default: '草稿'},
	category: {type: Types.Relationship, ref: 'PostCategory'},
	author: {type: Types.Relationship, ref: 'User'},
	publishedAt: Date,
	content: {type: Types.Html, wysiwyg: true, height: 400}
});

Post.defaultColumns = 'title, state|20%, author, publishedAt|15%';
Post.schema.methods.isPublished = function() {
	return this.state == '已发布';
};
Post.schema.pre('save', function(next) {
	if (this.isModified('state') && this.isPublished() && !this.publishedAt) {
		this.publishedAt = new Date();
	}
	next();
});
Post.register();
