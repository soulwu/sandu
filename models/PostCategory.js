var keystone = require('keystone');
var Types = keystone.Field.Types;

var PostCategory = new keystone.List('PostCategory', {
	label: '栏目',
	plural: '栏目'
});

PostCategory.add({
	name: {type: Types.Text, label: '名称', required: true},
	order: {type: Types.Number, label: '排序', default: 999},
	isShow: {type: Types.Boolean, label: '是否显示在首页', default: true}
});

PostCategory.relationship({
	path: 'posts',
	ref: 'Post',
	refPath: 'categories'
});

PostCategory.defaultColumns = 'name';
PostCategory.register();
