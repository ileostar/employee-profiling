<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-dialog class="dialogCreate"  v-model="dialogCreateVisible" @close="resetForm" title="新建模型">
    <!-- <el-form :model="form" :rules="formRules" ref="ruleFormRef"  label-position="top" label-width="130px"> 
      <el-row>
        <el-col v-for="(field, key) in formField" :key="field.label" :span="12">
          <el-space
            fill
            wrap
            fill-ratio="80"
            direction="horizontal"
            style="width: 96%"
          >
            <el-form-item :label="field.label" :prop="key">
                <template v-if="field.label === '创建时间'">
                    <el-input v-model="form[key]" autocomplete="off" maxlength="11"></el-input>
                </template>
                <template v-else-if="field.label === '岗位'">
                  <el-select v-model="form.post" class="m-2" placeholder="选择岗位">
                    <el-option v-for="post in select" :key="post" :value="post" :label="post"/>
                  </el-select>
                </template>
                <template v-else-if="field.label === '最高学历'">
                  <el-select v-model="form.post" class="m-2" placeholder="选择岗位">
                    <el-option v-for="post in select" :key="post" :value="post" :label="post"/>
                  </el-select>
                </template>
                <template v-else-if="numberInput.includes(field.label)">
                  <el-input-number v-model="form[key]" :min="1" :max="100" />
                </template>
                <template v-else-if="field.label === '生育情况'">
                  <el-select v-model="form[key]" class="m-2" placeholder="选择生育情况">
                    <el-option v-for="item in fertilitySituation" :key="item" :value="item" :label="item"/>
                  </el-select>
                </template>
                <template v-else-if="field.label === '政治面貌'">
                  <el-select v-model="form[key]" class="m-2" placeholder="选择政治面貌">
                    <el-option v-for="item in politicalStatus" :key="item" :value="item" :label="item"/>
                  </el-select>
                </template>
                <template v-else-if="levelTags.includes(field.label)">
                  <el-select v-model="form[key]" class="m-2" placeholder="选择能力水平">
                    <el-option v-for="item in tagLevel" :key="item" :value="item" :label="item"/>
                  </el-select>
                </template>
                <template v-else-if="dialectTags.includes(field.label)">
                  <el-select v-model="form[key]" class="m-2" placeholder="选择语言水平">
                    <el-option v-for="item in dialectSituation" :key="item" :value="item" :label="item"/>
                  </el-select>
                </template>
                <template v-else-if="field.label.includes('是否')">
                  <el-radio-group v-model="form[key]">
                    <el-radio label="是" />
                    <el-radio label="否" />
                  </el-radio-group>
                </template>
                <template v-else-if="field.label === '性别'">
                  <el-radio-group v-model="form[key]">
                    <el-radio label="男" />
                    <el-radio label="女" />
                  </el-radio-group>
                </template>
                <template v-else>
                  <el-input v-model="form[key]" autocomplete="off" maxlength="11"></el-input>
                </template>
            </el-form-item>
          </el-space>       
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="info" @click="submitCreatedForm(ruleFormRef)">
          确定
        </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<script setup lang="ts">
import { useModelStore } from '@/stores/model';
import { FormInstance } from 'element-plus';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';

const modelStore = useModelStore()
const { dialogCreateVisible } = storeToRefs(modelStore)

const form = reactive({})
const formField = reactive({
	createdTime: {
		value: '',
		label: '创建时间',
		span: 12
	},
	number:  {
		value: '',
		label: '员工编号',
		span: 12
	},
	name: {
		value: '',
		label: '姓名',
		span: 12
	},
	post: {
		value: '',
		label: '岗位',
		span: 12
	},
	unit: {
		value: '',
		label: '单位',
		span: 12
	},
	sex: {
		value: '',
		label: '性别',
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
	createdTime: {
		required: true,
		message: '请选择创建时间',
		trigger: 'change'
	},
	name: {
		required: true,
		message: '请输入姓名',
		trigger: 'blur'
	},
	number: {
		required: true,
		message: '请输入员工编号',
		trigger: 'blur'
	},
	post: {
		required: true,
		message: '请选择岗位',
		trigger: 'blur'
	},
})
const ruleFormRef = ref<FormInstance>()
const filePath = ref('')

// 提交表单
const submitCreatedForm = () => {
	console.log('submitCreatedForm');
}

// 重置表单
const resetForm = () => {
	dialogCreateVisible.value = false
}
</script>

<style lang="scss" scoped>

</style>