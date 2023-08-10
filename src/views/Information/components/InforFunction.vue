<template>
    <div class="information-function">
        <div class="function-selectSearch">
            <div class="mt-4">
              <el-input
                v-model="search"
                placeholder="请输入查询关键词"
                class="input-with-select"
              >
                <template #prepend>
                  <el-select :placeholder="defaultSelect==''? '选择岗位':defaultSelect" style="width: 115px">
                    <el-option v-for="item of select" @click="taggleSelect(item)" :label="item.label" :key="item.value" value="1" />
                  </el-select>
                </template>
                <template #append>
                  <el-button :icon="Search" />
                </template>
              </el-input>
            </div>
        </div>
        <div class="function-button">
          <el-button class="funtion-button-item" @click="dialogCreateFormVisible = true" type="default" text>
            <el-icon><DocumentAdd /></el-icon>
            <p>新建</p>
          </el-button>
          <el-button class="funtion-button-item" @click="dialogFixFormVisible = true"  type="default" text>
            <el-icon><Edit /></el-icon>
            <p>修改</p>
          </el-button>
          <el-button class="funtion-button-item" @click="dialogInFormVisible = true"  type="default" text>
            <el-icon><Upload /></el-icon>
            <p>导入</p>
          </el-button>
          <el-button class="funtion-button-item" @click="dialogOutFormVisible = true"  type="default" text>
            <el-icon><Download /></el-icon>
            <p>导出</p>
          </el-button>
        </div>
    </div>
    <el-dialog v-model="dialogCreateFormVisible" title="新建">
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogCreateFormVisible = false">取消</el-button>
          <el-button type="info" @click="dialogCreateFormVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogFixFormVisible" title="修改">
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFixFormVisible = false">取消</el-button>
          <el-button type="info" @click="dialogFixFormVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogInFormVisible" title="导入">
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogInFormVisible = false">取消</el-button>
          <el-button type="info" @click="dialogInFormVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogOutFormVisible" title="导出">
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogOutFormVisible = false">取消</el-button>
          <el-button type="info" @click="dialogOutFormVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

const search = ref('');
const defaultSelect = ref('');
const select = reactive([
	{
		label: '岗位1',
		value: '1'
	},
	{
		label: '岗位2',
		value: '2'
	},
	{
		label: '岗位3',
		value: '3'
	},
	{
		label: '岗位4',
		value: '4'
	}
]);
const dialogCreateFormVisible = ref(false);
const dialogFixFormVisible = ref(false);
const dialogInFormVisible = ref(false);
const dialogOutFormVisible = ref(false);
const formLabelWidth = '140px';

const form = reactive({
	name: '',
	region: '',
	date1: '',
	date2: '',
	delivery: false,
	type: [],
	resource: '',
	desc: '',
});

interface Select  {
  label: string
  value: string
  [index: string] : unknown
}

/**
 * @param: 当前点击岗位对象
 * @desc: 切换当前下拉菜单显示
 */
const taggleSelect = (select: Select)=>{
	defaultSelect.value = select.label;
};

</script>

<style lang="scss" scoped>
.information-function {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0 0.5vw;
  .function-selectSearch {
    width: 30vw;
    overflow: hidden;
    border-radius: 5px;
    text-align: center;
    margin: 0 2vw;
    
    .input-with-select .el-input-group__prepend {
      background-color: var(--el-fill-color-blank);
    }
  }
  .function-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4.8vh;
    width: 22vw;
    .el-button {
      width: 5vw;
      p {
        padding-left:4px;
      }
    }
  }
}
</style>