/* eslint-env node */
module.exports = {
	// 继承的规则
	extends: ['@commitlint/config-conventional'],
	// 定义规则类型
	rules: {
		// subject 大小写不做校验
		'subject-case': [0]
	}
};
