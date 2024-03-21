<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import EmployeeInfo from './components/EmployeeInfo.vue'
import { EmployeeName, useEmployeeStore } from '@/stores/employee'
import * as _ from 'lodash'

const employeeStore = useEmployeeStore()
const { createdTime, EmployeeNameList, pageNumber,currentEmployee } = storeToRefs(employeeStore)

const searchInput = ref('')
const value = ref(false)

/**
 * 防抖函数
 * Creates a debounced version of a function that delays its execution until after a specified delay period.
 * 
 * @param {function} func - The original function to be debounced.
 * @param {number} delay - The delay period in milliseconds.
 * @return {function} - The debounced version of the original function.
 */
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
	let timerId: ReturnType<typeof setTimeout>;

	return function(this: unknown, ...args: Parameters<T>): void {
		const context = this as unknown as T;

		clearTimeout(timerId);

		timerId = setTimeout(function() {
			func.apply(context, args);
		}, delay);
	}
}

const search = async () => {
	if(!_.isEmpty(searchInput.value)){
		console.log(searchInput.value);
		const res = await api.findByCreatedTimeAndCondition({createdTime: createdTime.value, pageNum: 1, pageSize: 12,conditions: searchInput.value });
		if (res.data.state === 200) {
			employeeStore.updateEmployeeNameList(res.data.data);
			pageNumber.value = res.data.message
		} 
	} else {
		const res1 = await api.selectAllEmployee({ createdTime: createdTime.value, pageNum: 1, pageSize: 12 });
		if (res1.data.state === 200) {
			employeeStore.updateEmployeeNameList(res1.data.data);
			pageNumber.value = res1.data.message
		} 
	}
}

const handleSearch = debounce(search, 1500)

/**
 * 处理分页修改
 * Handles the page change event.
 *
 * @param {number} value - The new page number.
 * @return {Promise<void>} - A promise that resolves when the page change is handled.
 */
const handlePageChange = async (value: number) => {
	if(_.isEmpty(searchInput.value)) {
		const res = await api.selectAllEmployee({ createdTime: createdTime.value, pageNum: value, pageSize: 12 });
		if (res.data.state === 200) {
			employeeStore.updateEmployeeNameList(res.data.data);
		} 
	} else {
		const res = await api.findByCreatedTimeAndCondition({createdTime: createdTime.value, pageNum: value, pageSize: 12,conditions: searchInput.value });
		if (res.data.state === 200) {
			employeeStore.updateEmployeeNameList(res.data.data);
			pageNumber.value = res.data.message
		} 
	}
}

/**
 * 切换员工操作
 * Handles the selection of an item.
 *
 * @param {EmployeeName} item - The item that was selected.
 * @return {Promise<void>} Returns a promise that resolves when the selection is handled.
 */
const handleSelect = async (item: EmployeeName) => {
	currentEmployee.value = item.name
	// 查询当前员工信息
	employeeStore.ToggleEmployee(item.number)
}
</script>

<template>
	<div class="employee-portrait">
		<div class="employee-portrait-aside">
			<div class="portrait-aside-header">
				<p class="aside-title">员工</p>
				<el-input
					v-model="searchInput"
					class="w-50 m-2"
					size="small"
					placeholder="姓名、编号、单位、岗位"
					:prefix-icon="Search"
          @input="handleSearch"
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
      .el-input {
        width: 100%;
        height: 4vh;
        font-size: 1.5vh;
      }
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
