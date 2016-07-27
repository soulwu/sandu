var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User', {
	label: '用户',
	plural: '用户'
});

User.add({
	name: {type: Types.Text, label: '姓名', required: true, index: true},
	email: {type: Types.Email, label: '邮箱', initial: true, required: true, index: true},
	password: {type: Types.Password, label: '密码', initial: true, required: true},
}, 'Permissions', {
	isAdmin: {type: Types.Boolean, label: '是否管理员', index: true},
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

User.relationship({
	path: 'posts',
	ref: 'Post',
	refPath: 'author'
});

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
