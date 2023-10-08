import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Approval } from '@/api/type'
import api from '@/api/api'
import { ElMessage } from 'element-plus'

export const useApprovalsStore = defineStore('approval',() => {
	const approvalList = ref<Array<Approval>>()

	/**
   * 刷新申请列表
	 * Updates the approval list by making an API request and assigning the response data to the approvalList variable.
	 *
	 * @return {Promise<void>} Promise that resolves once the approval list is updated.
	 */
	const updateApprovalList = async () =>  {
		const res = await api.selectApproval()
		if(res.status === 200) {
			approvalList.value = res.data.data
			console.log(res.data.data);
		} else {
			ElMessage.error(res.data.message)
		}
	}

	/**
   * 驳回操作
	 * Updates the status to "rejected" by ID.
	 *
	 * @param {Approval} params - The approval object containing the ID.
	 * @return {Promise<void>} - A promise that resolves when the status is updated.
	 */
	const updateByIdNo = async (params: Approval) => {
		//  修改状态为已驳回
		const res = await api.updateByIdNo(params)
		if(res.status === 200 ){
			updateApprovalList()
			ElMessage.success('操作成功')
		} else {
			ElMessage.error(res.data.message)
		}
	}

	/**
   * 同意操作
	 * Executes the approval request operation and updates the status to "approved".
	 *
	 * @param {Approval} params - The approval parameters.
	 * @return {Promise<void>} - A promise that indicates the completion of the update operation.
	 */
	const  updateByIdYes = async (params: Approval) => {
		//  执行审批请求操作，并修改状态为已同意
		const res = await api.updateByIdYes(params)
		if(res.status === 200 ){
			updateApprovalList()
			ElMessage.success('操作成功')
		} else {
			ElMessage.error(res.data.message)
		}
	}

	return {
		approvalList,
		updateApprovalList,
		updateByIdNo,
		updateByIdYes
	}
})
