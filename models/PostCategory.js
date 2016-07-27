var keystone = require('keystone');
var Types = keystone.Field.Types;

var PostCategory = new keystone.List('PostCategory', {
	label: '栏目',
	plural: '栏目'
});

PostCategory.add({
	name: {type: Types.Text, label: '名称', required: true}
});

PostCategory.relationship({
	path: 'posts',
	ref: 'Post',
	refPath: 'categories'
});

PostCategory.defaultColumns = 'name';
PostCategory.register();
