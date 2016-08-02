var keystone = require('keystone');
var Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
	label: '文章',
	plural: '文章',
	map: {
		name: 'title'
	},
	defaultSort: '-createdAt',
	track: true
});

Post.add({
	title: {type: Types.Text, label: '标题', required: true},
	state: {type: Types.Select, label: '状态', options: '草稿, 已发布, 已归档', default: '草稿', emptyOption: false, required: true},
	categories: {type: Types.Relationship, label: '栏目', ref: 'PostCategory', many: true, required: true, initial: true},
	author: {type: Types.Relationship, label: '作者', ref: 'User'},
	publishedAt: {type: Types.Datetime, label: '发布时间', format: 'YYYY-MM-DD HH:mm:ss', hidden: true},
	content: {type: Types.Html, label: '正文', wysiwyg: true, height: 400},
	attachments: {
		type: Types.LocalFiles,
		label: '附件',
		dest: 'data/files',
		prefix: '/files',
		datePrefix: 'YYYYMMDD',
		// format: function(item, file) {
		// 	var icon = 'file';
		// 	var ext = file.filename.split('.').pop();
		// 	// switch (file.filetype) {
		// 	// 	case '':
		// 	// 		break;
		// 	// 	case '':
		// 	// 		break;
		// 	// }
		// 	return '<a href="' + file.href + '" target="_blank"><span class="glyphicon glyphicon-' + icon + '"></span>' + file.originalname + '</a>';
		// }
	}
});

Post.schema.methods.isPublished = function() {
	return this.state == '已发布';
};
Post.schema.pre('save', function(next) {
	if (this.isModified('state') && this.isPublished() && !this.publishedAt) {
		this.publishedAt = new Date();
	}
	next();
});

Post.defaultColumns = 'title, state|20%, author, publishedAt|15%';
Post.register();
