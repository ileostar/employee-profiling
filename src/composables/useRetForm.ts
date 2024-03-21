import { FormInstance } from 'element-plus'

// 重置表单
export default (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
}
