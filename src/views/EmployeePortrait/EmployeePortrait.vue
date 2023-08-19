<template>
	<div class="employee-portrait">
		<div class="employee-portrait-aside">
			<div class="portrait-aside-header">
				<p class="aside-title">员工</p>
				<el-input
					v-model="input3"
					class="w-50 m-2"
					size="small"
					placeholder="请输入员工姓名"
					:prefix-icon="Search"
				/>
			</div>
			<div class="portrait-aside-body">
        <el-menu
          :default-active="`${EmployeeNameList[0].id}`"
          class="el-menu-vertical-demo"
          >
          <el-menu-item v-for="item in EmployeeNameList" :key="item.id" :index="`${item.id}`" @click="handleSelect(item)">
            <span>{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </div>
			<div class="portrait-aside-pagination">
        <el-pagination small layout="prev, pager, next" :total="40" :hide-on-single-page="value"/>
      </div>
		</div>
		<div class="employee-portrait-main">
			<EmployeeInfo />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref} from 'vue'
import { Search } from '@element-plus/icons-vue'
import EmployeeInfo from './components/EmployeeInfo.vue'
import { EmployeeName, useEmployeeStore } from '@/stores/employee'
import { storeToRefs } from 'pinia'

const employeeStore = useEmployeeStore()
const { EmployeeNameList } = storeToRefs(employeeStore)

const currentEmployee = ref<string>('')
// const currentEmployee = ref<string>('')

const input3 = ref('')
const value = ref(false)

const handleSelect = (item: EmployeeName) => {
	currentEmployee.value = item.name
	console.log(currentEmployee.value);
  
}
</script>

<style lang="scss" scoped>
.employee-portrait {
	display: flex;
	width: 86vw;
	.employee-portrait-aside {
		height: 93.5vh;
		width: 14vw;
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
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      :deep(.el-pagination) {
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
