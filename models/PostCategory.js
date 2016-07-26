var keystone = require('keystone');
var Types = keystone.Field.Types;

var PostCategory = new keystone.List('PostCategory', {
	label: '栏目',
	plural: '栏目'
});

PostCategory.add({
	name: {type: String, required: true}
});
PostCategory.register();
