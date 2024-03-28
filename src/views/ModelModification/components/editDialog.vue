<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-dialog class="dialogEdit"  v-model="dialogEditVisible" @close="resetForm" title="修改模型">
    <el-form :model="form" :rules="formRules" ref="ruleFormRef"  label-position="top" label-width="130px"> 
      <el-row>
        <el-col  :span="12">
          <el-space
            fill
            wrap
            fill-ratio="80"
            direction="horizontal"
            style="width: 96%"
          >
            <el-form-item label="模型名称" prop="filePath" >
              <el-select v-model="filePath" @change="autoFillModel(filePath,form.post as string)">
                <el-option v-for="item of modelTotal" :key="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-space>
        </el-col>
        <el-col v-for="(field, key) in formField" :key="field.label" :span="12">
          <el-space
            fill
            wrap
            fill-ratio="80"
            direction="horizontal"
            style="width: 96%"
          >
            <el-form-item :label="field.label as string" :prop="key">
                <template v-if="field.label === '岗位'">
                  <el-select v-model="form.post" class="m-2" placeholder="选择岗位"  @change="filePath!==''?autoFillModel(filePath,form.post as string):''">
                    <el-option v-for="post in select" :key="post" :value="post" :label="post" />
                  </el-select>
                </template>
                <template v-else>
                  <el-input-number v-model="form[key]" autocomplete="off" :min="0.00" :precision="2" :step="0.01" :max="10"></el-input-number>
                </template>
            </el-form-item>
          </el-space>
        </el-col>
        <el-col  :span="12">
          <el-space
            fill
            wrap
            :fill-ratio="80"
            direction="horizontal"
            style="width: 96%"
          ><el-form-item>
            <span :style="{
              color: 'red'
            }">当前数据总和：{{numSum}}</span>
          </el-form-item>
          </el-space>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="info" @click="submitCreatedForm(ruleFormRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import api from '@/api/api';
import * as _ from 'lodash'
import { useModelStore } from '@/stores/model';
import { usePostStore } from '@/stores/post';
import { ElMessage, FormInstance } from 'element-plus';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';

const modelStore = useModelStore()
const PostStore = usePostStore()
const { postData: select } = storeToRefs(PostStore)
const { dialogEditVisible,modelTotal } = storeToRefs(modelStore)

interface formEl {
  [index: string]: unknown
}

interface FormField {
  value: {
    [key: string]: {
      value:  number | string;
      label: string;
      span: number;
    } | string
  }
}

const ruleFormRef = ref<FormInstance>()
const filePath = ref('')
/**
 * 自定义表单校验规则
 * Validates if the file path is valid.
 *
 * @param {any} _rule - The rule to validate against.
 * @param {any} _value - The value to validate.
 * @param {any} callback - The callback function to handle the validation result.
 * @return {void} 
 */
const validFilePath = (_rule: any,_value: any, callback: any) => {
	if (filePath.value === '') {
		callback(new Error('请输入模型名称'))
	} else {
		callback()
	}
}
const form:formEl = reactive({})
const formField:FormField = ref({
	post: {
		value: '',
		label: '岗位',
		span: 12
	},
	status: {
		value: '',
		label: '政治面貌',
		span: 12
	},
	degree: {
		value: '',
		label: '最高学历',
		span: 12
	},
	age: {
		value: '',
		label: '年龄（周岁）',
		span: 12
	},
	seniority: {
		value: '',
		label: '烟草工作年限',
		span: 12
	},
	one: {
		value: '',
		label: '是否有体育特长',
		span: 12
	},
	two: {
		value: '',
		label: '是否有艺术特长',
		span: 12
	},
	three: {
		value: '',
		label: '是否体育类兴趣小组成员',
		span: 12
	},
	four: {
		value: '',
		label: '是否艺术类兴趣小组成员',
		span: 12
	},
	five: {
		value: '',
		label: '公文写作能力',
		span: 12
	},
	six: {
		value: '',
		label: '数据分析能力',
		span: 12
	},
	seven: {
		value: '',
		label: '新媒体营销技术水平',
		span: 12
	},
	eight: {
		value: '',
		label: '业务规章制度掌握和执行能力',
		span: 12
	},
	nine: {
		value: '',
		label: '创新能力（意识、行为和成效）',
		span: 12
	},
	ten: {
		value: '',
		label: '沟通能力',
		span: 12
	},
	eleven: {
		value: '',
		label: '营销策划及执行能力',
		span: 12
	},
	twelve: {
		value: '',
		label: '团队意识及协作能力',
		span: 12
	},
	thirteen: {
		value: '',
		label: '是否中级或以上经济师',
		span: 12
	},
	fourteen: {
		value: '',
		label: '是否初级经济师',
		span: 12
	},
	fifteen: {
		value: '',
		label: '是否二级烟草制品购销职业资格',
		span: 12
	},
	sixteen: {
		value: '',
		label: '是否三级烟草制品购销职业资格',
		span: 12
	},
	seventeen: {
		value: '',
		label: '是否四级烟草制品购销职业资格',
		span: 12
	},
	eighteen: {
		value: '',
		label: '是否五级烟草制品购销职业资格',
		span: 12
	},
	nineteen: {
		value: '',
		label: '是否具有中级以上计算机方面的资格证书',
		span: 12
	},
	twenty: {
		value: '',
		label: '是否有参加市局组织的新媒体培训经历',
		span: 12
	},
	twentyOne: {
		value: '',
		label: '是否有参加市局组织的数据分析培训经历',
		span: 12
	},
	twentyTwo: {
		value: '',
		label: '是否有市局轮训经历',
		span: 12
	},
	twentyThree: {
		value: '',
		label: '是否有省局轮训经历',
		span: 12
	},
	twentyFour: {
		value: '',
		label: '是否省级内训师',
		span: 12
	},
	twentyFive: {
		value: '',
		label: '是否市级或县级内训师',
		span: 12
	},
	twentySix: {
		value: '',
		label: '近两年是否有参与线下授课经历',
		span: 12
	},
	twentySeven: {
		value: '',
		label: '近两年是否有参与内训师相关竞赛的经历',
		span: 12
	},
	twentyEight: {
		value: '',
		label: '近两年是否有参加视频课程开发经历',
		span: 12
	},
	twentyNine: {
		value: '',
		label: '是否数据分析团队成员',
		span: 12
	},
	thirty: {
		value: '',
		label: '是否新媒体营销团队成员',
		span: 12
	},
	thirtyOne: {
		value: '',
		label: '是否省局劳模工作室成员',
		span: 12
	},
	thirtyTwo: {
		value: '',
		label: '是否省局创客工作室成员',
		span: 12
	},
	thirtyThree: {
		value: '',
		label: '是否有参加省局专项工作的经历',
		span: 12
	},
	thirtyFour: {
		value: '',
		label: '当地主要使用的方言掌握情况',
		span: 12
	},
	thirtyFive: {
		value: '',
		label: '普通话标准情况',
		span: 12
	},
	thirtySix: {
		value: '',
		label: '粤语掌握情况',
		span: 12
	},
	thirtySeven: {
		value: '',
		label: '参加工作前是否已定居广东',
		span: 12
	},
	thirtyEight: {
		value: '',
		label: '参加工作前是否已定居韶关',
		span: 12
	},
	thirtyNine: {
		value: '',
		label: '是否在工作地（区/县/市）定居',
		span: 12
	},
	forty: {
		value: '',
		label: '是否有任职营销以外岗位的工作经历',
		span: 12
	},
	fortyOne: {
		value: '',
		label: '是否有任职当前岗位以外营销岗位的工作经历',
		span: 12
	},
	fortyTwo: {
		value: '',
		label: '是否已婚',
		span: 12
	},
	fortyThree: {
		value: '',
		label: '生育情况',
		span: 12
	},
	fortyFour: {
		value: '',
		label: '是否有QC项目获奖情况',
		span: 12
	},
	fortyFive: {
		value: '',
		label: '是否有论文发表或获奖情况',
		span: 12
	},
	fortySix: {
		value: '',
		label: '是否有文章在省局以上媒体发表情况',
		span: 12
	},
	fortySeven: {
		value: '',
		label: '是否有参与数字化转型项目情况',
		span: 12
	},
	fortyEight: {
		value: '',
		label: '是否有作为主要成员参加营销创新项目的经历',
		span: 12
	},
	fortyNine: {
		value: '',
		label: '是否有参与的视频项目并在省局以上媒体发表情况',
		span: 12
	},
	fifty: {
		value: '',
		label: '是否有参与市局营销竞赛并获奖的情况',
		span: 12
	},
	fiftyOne: {
		value: '',
		label: '是否受到国家局（总公司）表彰',
		span: 12
	},
	fiftyTwo: {
		value: '',
		label: '是否受到省局（公司）表彰',
		span: 12
	},
	fiftyThree: {
		value: '',
		label: '是否受到市局（公司）表彰',
		span: 12
	}
})
const formRules = reactive({
	post: {
		required: true,
		message: '请选择岗位',
		trigger: 'blur'
	},
	filePath: {
		required: true,
		validator: validFilePath,
		trigger: 'blur'
	}
})

/**
 * 自动填写
 * Auto fill the model information for a given file path.
 *
 * @param {string} filePath - The path of the file.
 * @param {string} post - The post for the model.
 * @return {void}
 */
const autoFillModel = async (filePath: string,post: string) => {
	if(!post) return
	const res = await api.selectModelInformation({filePath,post})
	if(res.status === 200) {
		let count = 0
		let flag =true
		Object.values(res.data).map(item=>{
			if(item===null) {
				count++
			}
			if(count>50&&flag){
				ElMessage.error('该模型岗位暂无数据，请先创建该模型岗位！')
				flag = false
			}
		})
		if(flag){
			const resArr = Object.entries(res.data)
			for(const item in formField.value ) {
				resArr.map(i=>{
					if(i[0]===item) {
						form[item] = i[1] as number | string
					}
				})
			}
		}
	}else {
		ElMessage.error('请先添加模型数据！')
	}
}

const numSum = computed(()=>{
	return (Object.entries(form).map(item=> item[1]).filter(item=> !isNaN(Number(item))).reduce((a, b) => Number(a) + Number(b), 0) as number).toFixed(2)
})

/**
 * 校验表单的属性值和是否唯一
 * Checks if the sum of the numbers is equal to one.
 *
 * @return {boolean} Returns true if the sum is equal to one, false otherwise.
 */
const isSumToOne = () => {
	const copyForm = _.cloneDeep(form)
	const result = Object.entries(copyForm).map(item=> item[1]).filter(item=> !isNaN(Number(item))).reduce((a, b) => Number(a) + Number(b), 0) === 1
	console.log('111111111111',Object.entries(copyForm).map(item=> item[1]).filter(item=> !isNaN(Number(item))).reduce((a, b) => Number(a) + Number(b), 0))
	return result
}

// 提交表单
const submitCreatedForm = (formEl: FormInstance | undefined) => {
	if(!formEl) return
	formEl.validate(async (valid) => {
		if (valid){
			if(!isSumToOne()) {
				ElMessage.error('数据和不为1')
				return
			}
			const res = await api.insertModel({filePath:filePath.value,request:form})
			if(res.status === 200) {
				modelStore.refreshModel()
				ElMessage.success(res.data)
				dialogEditVisible.value = false
			}
		} else {
			ElMessage.error('请正确填写表单')
		}
	})
}

/**
 * 重置表单
 * Resets the form by setting the value of `dialogEditVisible` to `false`.
 */
const resetForm = () => {
	filePath.value = ''
	for(const key in form) {
		form[key] = ''
	}
	dialogEditVisible.value = false
}
</script>
