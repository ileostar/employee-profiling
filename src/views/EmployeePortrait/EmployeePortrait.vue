<template>
	<div class="employee-portrait">
		<div class="employee-portrait-aside">
			<div class="portrait-aside-header">
				<p class="aside-title">员工</p>
				<el-input
					v-model="input3"
					class="w-50 m-2"
					size="small"
					placeholder="请输入员工姓名或编号"
					:prefix-icon="Search"
				/>
			</div>
			<div class="portrait-aside-body">
        <el-menu
          :default-active="`${EmployeeNameList[0].id}`"
          class="el-menu-vertical-demo"
          >
          <el-menu-item v-for="item in EmployeeNameList" :key="item.id" :index="`${item.id}`" @click="handleSelect(item)">
            <span :title="`员工编号：${item.number}`">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </div>
			<div class="portrait-aside-pagination">
        <el-pagination small layout="prev, pager, next" @current-change="handlePageChange" pager-count="3" :total="pageNumber?Number(pageNumber):0" :page-size="12" :hide-on-single-page="value"/>
      </div>
		</div>
		<div class="employee-portrait-main">
			<EmployeeInfo :employee="currentEmployee===''?EmployeeNameList[0].name:currentEmployee"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref} from 'vue'
import { Search } from '@element-plus/icons-vue'
import EmployeeInfo from './components/EmployeeInfo.vue'
import { EmployeeName, useEmployeeStore } from '@/stores/employee'
import { storeToRefs } from 'pinia'
import api from '@/api/api'

const employeeStore = useEmployeeStore()
const { createdTime, EmployeeNameList, pageNumber,currentEmployee } = storeToRefs(employeeStore)

const handlePageChange = async (value: number) => {
	const res = await api.selectAllEmployee({ createdTime: createdTime.value, pageNum: value, pageSize: 12 });
	if (res.data.state === 200) {
		employeeStore.updateEmployeeNameList(res.data.data);
	} 
}

const input3 = ref('')
const value = ref(false)

const handleSelect = async (item: EmployeeName) => {
	currentEmployee.value = item.name
	// 查询当前员工信息
	const res2 = await api.findByNumberAndCreatedTime({createdTime: createdTime.value,number: item.number})
	if(res2.data.state === 200) { 
		employeeStore.updatePortraitFeature(res2.data.data)
	}
	const res3 = await api.getPostFeatures({createdTime: createdTime.value,number: item.number})
	if(res3.data.state === 200) { 
		employeeStore.updateCurrentEmployeeInfos(res3.data.data)
	}
}
</script>

<style lang="scss" scoped>
.employee-portrait {
	display: flex;
	width: 86vw;
	.employee-portrait-aside {
		height: 93.5vh;
		width: 15.8vw;
		padding: 2vh;
		border-right: 2px solid #ebeef5;
		background-color: #f5f6f6;
		.portrait-aside-header {
			display: flex;
			flex-direction: column;
			height: 8vh;
			justify-content: space-between;
			margin-bottom: 2vh;
			.aside-title {
				font-size: 2vh;
			}
		}
		.portrait-aside-body {
			height: 84%;
      .el-menu {
        background-color: transparent;
        border: none;
        .el-menu-item,.is-active {   
          padding: 0 20px;
          height: 6vh;
          background-color: transparent;
          border-radius: 1vh;
          span {
            color: #6f6f6f;
          }
        }
        .is-active {
          border-right: 3px solid #afb1c7;
          border-left: 3px solid #afb1c7;
          span {
            color: #000;
          }
        }
      }
		}
    .portrait-aside-pagination {
      display: flex;
      justify-content: center;
      overflow: hidden;
      width: 100%;
      :deep(.el-pagination) {
        width: 100%;
        width: 100%;
        background-color: transparent;
        button {
          background-color: transparent;
        }
      }
      :deep(.el-pager li.is-active) {
        color: #3d8180;
        background-color: #ebeef5;
        border-radius: 50%;
      }
      :deep(.el-pager li) {
        background-color: transparent;
      }
    }
	}
	.employee-portrait-main {
		width: 100%;
	}
}
</style>
