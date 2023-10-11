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
			approvalList.value = res.data.data.map((items: Approval)=>{

				const { approvalTime:time, ...item } =  items

				return {
					approvalTime: formatDateTime(time),
					...item
				}
			})
			ElMessage.success(res.data.message)
		} else {
			ElMessage.error(res.data.message)
		}
	}

	function formatDateTime(timestamp:string) {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
  
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}  
	/**
   * 驳回操作
	 * Updates the status to "rejected" by ID.
	 *
	 * @param {Approval} params - The approval object containing the ID.
	 * @return {Promise<void>} - A promise that resolves when the status is updated.
	 */
	const updateByIdNo = async (params: { id: string }) => {
		//  修改状态为已驳回
		const res = await api.updateByIdNo(params)
		if(res.status === 200 ){
			updateApprovalList()
			ElMessage.success(res.data.message)
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
	const  updateByIdYes = async (params: { id: string }) => {
		//  执行审批请求操作，并修改状态为已同意
		const res = await api.updateByIdYes(params)
		if(res.status === 200 ){
			updateApprovalList()
			ElMessage.success(res.data.message)
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
