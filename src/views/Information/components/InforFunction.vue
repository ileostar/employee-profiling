<!-- eslint-disable indent -->
<template>
	<div class="information-function">
    <el-select v-model="currentDate" class="m-2" placeholder="Select" @change="changeCreatedTime">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
		<div class="function-selectSearch">
			<div class="mt-4">
				<el-input
					v-model="search"
					placeholder="请输入员工编号或姓名"
					class="input-with-select"
				>
					<template #prepend>
						<el-select
							:placeholder="defaultSelect == '' ? '选择岗位' : defaultSelect"
							style="width: 115px"
						>
							<el-option
								v-for="item of select"
								@click="taggleSelect(item)"
								:label="item"
								:key="item"
								value="1"
							/>
						</el-select>
					</template>
					<template #append>
						<el-button :icon="Search" @click="searchEmployee" />
					</template>
				</el-input>
			</div>
		</div>
		<div class="function-button">
			<el-button
				class="funtion-button-item"
				@click="dialogCreateFormVisible = true"
				type="default"
				text
			>
				<el-icon><DocumentAdd /></el-icon>
				<p>新建</p>
			</el-button>
			<el-button
				class="funtion-button-item"
				@click="dialogFixFormVisible = true"
				type="default"
				text
			>
				<el-icon><Edit /></el-icon>
				<p>修改</p>
			</el-button>
			<el-button
				class="funtion-button-item"
				@click="dialogInFormVisible = true"
				type="default"
				text
			>
				<el-icon><Upload /></el-icon>
				<p>导入</p>
			</el-button>
      <a :href="download" download>
        <el-button
          class="funtion-button-item"
          type="default"
          text
        >
          <el-icon><Download /></el-icon>
          <span>导出</span>
        </el-button>
      </a>
		</div>
	</div>
	<el-dialog class="dialogCreate" v-model="dialogCreateFormVisible" @close="resetForm" title="新建员工信息">
		<el-form :model="form" :rules="formRules" ref="ruleFormRef"  label-position="top" label-width="130px"> 
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
                  <el-select v-model="form.createdTime" class="m-2" placeholder="选择创建时间" >
                    <el-option v-for="pastYearMonth in currentDateList" :key="pastYearMonth" :value="pastYearMonth" :label="pastYearMonth"/>
                  </el-select>
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
				<el-button @click="dialogCreateFormVisible = false">取消</el-button>
				<el-button type="info" @click="submitCreatedForm(ruleFormRef)">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogFixFormVisible" @close="resetForm" title="修改员工信息">
		<el-form :model="form2" :rules="formRules2" ref="ruleForm2Ref"   label-position="top" label-width="130px">
      <el-row>
        <el-col v-for="(field, key) in formField2" :key="field.label" :span="12">
          <el-space
            fill
            wrap
            fill-ratio="80"
            direction="horizontal"
            style="width: 96%"
          >
          <el-form-item :label="field.label" :prop="key">
            <template v-if="field.label === '创建时间'">
              <el-select v-model="form2.createdTime" class="m-2" placeholder="选择创建时间" @change="pairingCreatedTime">
                <el-option v-for="pastYearMonth in currentDateList" :key="pastYearMonth" :value="pastYearMonth" :label="pastYearMonth"/>
              </el-select>
            </template>
            <template v-else-if="field.label === '姓名'" >
              <el-input v-model="form2.name" @blur="autofill" autocomplete="off" placeholder="填写姓名自动匹配,请优先填写姓名"></el-input>
            </template>
            <template v-else-if="field.label === '员工编号'" >     
              <el-input v-model="form2.number" autocomplete="off" v-if="namesake.length<2"></el-input>          
              <el-select v-model="form2.number" class="m-2" v-else @change="autofill2(form2.number as number)">
                <el-option v-for="num in namesake" :key="num.number" :value="num.number" :label="num.number"/>
              </el-select>
            </template>
            <template v-else-if="field.label === '岗位'">
              <el-select v-model="form2.post" class="m-2" placeholder="选择岗位">
                <el-option v-for="post in select" :key="post" :value="post" :label="post"/>
              </el-select>
            </template>
            <template v-else-if="field.label === '最高学历'">
              <el-select v-model="form2.post" class="m-2" placeholder="选择岗位">
                <el-option v-for="post in select" :key="post" :value="post" :label="post"/>
              </el-select>
            </template>
            <template v-else-if="numberInput.includes(field.label)">
              <el-input-number v-model="form2[key]" :min="1" :max="100" />
            </template>
            <template v-else-if="field.label === '生育情况'">
              <el-select v-model="form2[key]" class="m-2" placeholder="选择生育情况">
                <el-option v-for="item in fertilitySituation" :key="item" :value="item" :label="item"/>
              </el-select>
            </template>
            <template v-else-if="field.label === '政治面貌'">
              <el-select v-model="form2[key]" class="m-2" placeholder="选择政治面貌">
                <el-option v-for="item in politicalStatus" :key="item" :value="item" :label="item"/>
              </el-select>
            </template>
            <template v-else-if="levelTags.includes(field.label)">
              <el-select v-model="form2[key]" class="m-2" placeholder="选择能力水平">
                <el-option v-for="item in tagLevel" :key="item" :value="item" :label="item"/>
              </el-select>
            </template>
            <template v-else-if="dialectTags.includes(field.label)">
              <el-select v-model="form2[key]" class="m-2" placeholder="选择语言水平">
                <el-option v-for="item in dialectSituation" :key="item" :value="item" :label="item"/>
              </el-select>
            </template>
            <template v-else-if="field.label.includes('是否')">
              <el-radio-group v-model="form2[key]">
                <el-radio label="是" />
                <el-radio label="否" />
              </el-radio-group>
            </template>
            <template v-else-if="field.label === '性别'">
              <el-radio-group v-model="form2[key]">
                <el-radio label="男" />
                <el-radio label="女" />
              </el-radio-group>
            </template>
            <template v-else>     
              <el-input v-model="form2[key]" autocomplete="off"></el-input>
            </template>
          </el-form-item>
         </el-space>   
        </el-col>
      </el-row>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFixFormVisible = false">取消</el-button>
				<el-button type="info" @click="submitUpdatedForm(ruleForm2Ref)">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogInFormVisible" title="导入">
    <a href="src/static/employee.xlsx" download style="display: block;padding-bottom: 1vh;margin-top: -2vh;color: #409eff">员工信息导入模版</a>
    <el-upload
    class="upload-demo"
    drag
    multiple
    :action="uploadUrl"
    :headers="{ 'Accept': '*/*' }"
    :data="{ 'Content-Type': 'multipart/form-data' }"
    :on-success="handleUploadSuccess"
    :on-error="handleUploadError"
    :before-upload="beforeUpload"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      拖动文件到这或者 <em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        请上传 xls/xlsx 文件
      </div>
    </template>
    </el-upload>
	</el-dialog>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref, watchEffect } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, FormInstance } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/stores/employee'
import { usePostStore } from '@/stores/post'
import { useChartStore } from '@/stores/chart'
import api from '@/api/api'
import { Employee } from '@/api/type'
import * as _ from 'lodash'

const ChartStore = useChartStore()
const EmployeeStore = useEmployeeStore()
const PostStore = usePostStore()
const { createdTime: currentDate,createdTimeList: options,EmployeeNameList,dialogFixFormVisible,form2 }  = storeToRefs(EmployeeStore)
const { smallChartData,postChartData } = storeToRefs(ChartStore)
const { postData: select } = storeToRefs(PostStore)

const search = ref('')
const defaultSelect = ref<string>('')
const currentDateList = ref<string[]>([])

const tagLevel = ref(['很好','较好','一般'])  // 能力等级
const politicalStatus = ref(['中共党员','共青团员','群众'])  // 政治面貌
const dialectSituation = ref(['会说','能听不会说','基本听不懂'])  // 方言情况
const fertilitySituation= ref(['一孩','二孩','三孩及以上','无'])  // 生育情况
const levelTags = ref(['公文写作能力','数据分析能力','新媒体营销技术水平','业务规章制度掌握和执行能力','创新能力（意识、行为和成效）','沟通能力','营销策划及执行能力','团队意识及协作能力'])
const dialectTags = ref(['当地主要使用的方言掌握情况','粤语掌握情况','普通话标准情况'])
const numberInput = ref(['年龄（周岁）','烟草工作年限'])

// 控制对话框显示
const dialogCreateFormVisible = ref(false)
const dialogInFormVisible = ref(false)


// 新建表单
const form = reactive<Employee>({})
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
watchEffect(() => {
	currentDateList.value = (() => {
		// 获取当前日期
		const currentDate = new Date();

		// 获取当前年份和月份
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth() + 1; // 月份从0开始，所以需要加1

		// 生成过去一年的年月数组
		const pastYearMonths = [];
		for (let i = 0; i < 12; i++) {
			let year = currentYear;
			let month = currentMonth - i;

			if (month <= 0) {
				// 如果月份小于等于0，表示跨年了
				year -= 1;
				month += 12;
			}

			// 将年份和月份格式化为字符串，并添加到数组中
			const formattedMonth = month.toString().padStart(2, '0'); // 月份补零
			pastYearMonths.push(`${year}-${formattedMonth}`);
		}
		return pastYearMonths
	})()
})

// 修改表单
const ruleForm2Ref = ref<FormInstance>()
const formField2 = reactive({
	name: {
		value: '',
		label: '姓名',
		type: '',
	},
	number:  {
		value: '',
		label: '员工编号',
		type: '',
	},
	createdTime: {
		value: '',
		label: '创建时间',
		type: '',
	},
	post: {
		value: '',
		label: '岗位',
		type: '',
	},
	unit: {
		value: '',
		label: '单位',
		type: '',
	},
	sex: {
		value: '',
		label: '性别',
		type: '',
	},
	status: {
		value: '',
		label: '政治面貌',
		type: '',
	},
	degree: {
		value: '',
		label: '最高学历',
		type: '',
	},
	age: {
		value: '',
		label: '年龄（周岁）',
		type: '',
	},
	seniority: {
		value: '',
		label: '烟草工作年限',
		type: '',
	},
	one: {
		value: '',
		label: '是否有体育特长',
		type: '',
	},
	two: {
		value: '',
		label: '是否有艺术特长',
		type: '',
	},
	three: {
		value: '',
		label: '是否体育类兴趣小组成员',
		type: '',
	},
	four: {
		value: '',
		label: '是否艺术类兴趣小组成员',
		type: '',
	},
	five: {
		value: '',
		label: '公文写作能力',
		type: '',
	},
	six: {
		value: '',
		label: '数据分析能力',
		type: '',
	},
	seven: {
		value: '',
		label: '新媒体营销技术水平',
		type: '',
	},
	eight: {
		value: '',
		label: '业务规章制度掌握和执行能力',
		type: '',
	},
	nine: {
		value: '',
		label: '创新能力（意识、行为和成效）',
		type: '',
	},
	ten: {
		value: '',
		label: '沟通能力',
		type: '',
	},
	eleven: {
		value: '',
		label: '营销策划及执行能力',
		type: '',
	},
	twelve: {
		value: '',
		label: '团队意识及协作能力',
		type: '',
	},
	thirteen: {
		value: '',
		label: '是否中级或以上经济师',
		type: '',
	},
	fourteen: {
		value: '',
		label: '是否初级经济师',
		type: '',
	},
	fifteen: {
		value: '',
		label: '是否二级烟草制品购销职业资格',
		type: '',
	},
	sixteen: {
		value: '',
		label: '是否三级烟草制品购销职业资格',
		type: '',
	},
	seventeen: {
		value: '',
		label: '是否四级烟草制品购销职业资格',
		type: '',
	},
	eighteen: {
		value: '',
		label: '是否五级烟草制品购销职业资格',
		type: '',
	},
	nineteen: {
		value: '',
		label: '是否具有中级以上计算机方面的资格证书',
		type: '',
	},
	twenty: {
		value: '',
		label: '是否有参加市局组织的新媒体培训经历',
		type: '',
	},
	twentyOne: {
		value: '',
		label: '是否有参加市局组织的数据分析培训经历',
		type: '',
	},
	twentyTwo: {
		value: '',
		label: '是否有市局轮训经历',
		type: '',
	},
	twentyThree: {
		value: '',
		label: '是否有省局轮训经历',
		type: '',
	},
	twentyFour: {
		value: '',
		label: '是否省级内训师',
		type: '',
	},
	twentyFive: {
		value: '',
		label: '是否市级或县级内训师',
		type: '',
	},
	twentySix: {
		value: '',
		label: '近两年是否有参与线下授课经历',
		type: '',
	},
	twentySeven: {
		value: '',
		label: '近两年是否有参与内训师相关竞赛的经历',
		type: '',
	},
	twentyEight: {
		value: '',
		label: '近两年是否有参加视频课程开发经历',
		type: '',
	},
	twentyNine: {
		value: '',
		label: '是否数据分析团队成员',
		type: '',
	},
	thirty: {
		value: '',
		label: '是否新媒体营销团队成员',
		type: '',
	},
	thirtyOne: {
		value: '',
		label: '是否省局劳模工作室成员',
		type: '',
	},
	thirtyTwo: {
		value: '',
		label: '是否省局创客工作室成员',
		type: '',
	},
	thirtyThree: {
		value: '',
		label: '是否有参加省局专项工作的经历',
		type: '',
	},
	thirtyFour: {
		value: '',
		label: '当地主要使用的方言掌握情况',
		type: '',
	},
	thirtyFive: {
		value: '',
		label: '普通话标准情况',
		type: '',
	},
	thirtySix: {
		value: '',
		label: '粤语掌握情况',
		type: '',
	},
	thirtySeven: {
		value: '',
		label: '参加工作前是否已定居广东',
		type: '',
	},
	thirtyEight: {
		value: '',
		label: '参加工作前是否已定居韶关',
		type: '',
	},
	thirtyNine: {
		value: '',
		label: '是否在工作地（区/县/市）定居',
		type: '',
	},
	forty: {
		value: '',
		label: '是否有任职营销以外岗位的工作经历',
		type: '',
	},
	fortyOne: {
		value: '',
		label: '是否有任职当前岗位以外营销岗位的工作经历',
		type: '',
	},
	fortyTwo: {
		value: '',
		label: '是否已婚',
		type: '',
	},
	fortyThree: {
		value: '',
		label: '生育情况',
		type: '',
	},
	fortyFour: {
		value: '',
		label: '是否有QC项目获奖情况',
		type: '',
	},
	fortyFive: {
		value: '',
		label: '是否有论文发表或获奖情况',
		type: '',
	},
	fortySix: {
		value: '',
		label: '是否有文章在省局以上媒体发表情况',
		type: '',
	},
	fortySeven: {
		value: '',
		label: '是否有参与数字化转型项目情况',
		type: '',
	},
	fortyEight: {
		value: '',
		label: '是否有作为主要成员参加营销创新项目的经历',
		type: '',
	},
	fortyNine: {
		value: '',
		label: '是否有参与的视频项目并在省局以上媒体发表情况',
		type: '',
	},
	fifty: {
		value: '',
		label: '是否有参与市局营销竞赛并获奖的情况',
		type: '',
	},
	fiftyOne: {
		value: '',
		label: '是否受到国家局（总公司）表彰',
		type: '',
	},
	fiftyTwo: {
		value: '',
		label: '是否受到省局（公司）表彰',
		type: '',
	},
	fiftyThree: {
		value: '',
		label: '是否受到市局（公司）表彰',
		type: '',
	}
})
const formRules2 = reactive({
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
		trigger: 'change'
	},
	post: {
		required: true,
		message: '请选择岗位',
		trigger: 'change'
	},
})

type Namesake = {
  number: number
  items: Employee[]
}

// 同名的人
const namesake = ref<Array<Namesake>>([])
const nextNum = ref<number>()

// 上传
const uploadUrl = import.meta.env.VITE_AXIOS_BASE_URI + 'employee/upload'

const download = import.meta.env.VITE_AXIOS_BASE_URI + 'employee/downloadexcel'

/**
 * @param: 当前点击岗位对象
 * @desc: 切换当前下拉菜单显示
 */
const taggleSelect = (select: string) => {
	defaultSelect.value = select
}

/**
 * Validates the file extension before uploading the avatar.
 *
 * @param {any} file - The file object to be validated.
 * @return {boolean} - Returns true if the file extension is either 'xls' or 'xlsx', otherwise returns false.
 */
const beforeUpload = (file: any): boolean=> {
	var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
	const extension = testmsg === 'xls'
	const extension2 = testmsg === 'xlsx'

	if(!extension && !extension2) {
		ElMessage.error('请上传xls/xlsx格式的文件！');
		return false;
	}
	return (extension || extension2)
}

const handleUploadSuccess = async () => {
	const res2 = await api.selectEmployee({createdTime: currentDate.value})
	if(res2.data.state===200) {
		EmployeeStore.updateEmployeeList(res2.data.data)
	}
	ElMessage.success('上传成功!')
}
const handleUploadError =(res: string) => {
	console.log('err' + res);
  
	ElMessage.error('上传失败!')
}

/**
 * @desc: 搜索
 */
const searchEmployee = async () => {
	const req = ref({})
	if(search.value===''&&defaultSelect.value==='') return
	if(search.value!==''&&defaultSelect.value==='') req.value = {
		conditions: search.value
	}
	if(defaultSelect.value!==''&&search.value==='') req.value = {
		post: defaultSelect.value
	}
	if(defaultSelect.value!==''&&search.value!=='') req.value = {
		post: defaultSelect.value,
		conditions: search.value
	}
	const res = await api.findByPostAndCondition(req.value)
	if(res.data.state === 200) {
		EmployeeStore.updateEmployeeList(res.data.data)
		console.log(res.data)
		const { EmployeeList }  = storeToRefs(EmployeeStore)
		console.log(EmployeeList.value);   
		ElMessage.success('查询成功!')
	}
}

/**
 * @desc: 新建
 */
const submitCreatedForm = async (formEl: FormInstance | undefined) => {
	if(!formEl) return
	formEl.validate(async (valid) => {
		if (valid) {
			dialogCreateFormVisible.value = false
			const res = await api.insertEmployee(form)
			if(res.data.state === 200) {
				const obj:Employee = {      
					id: 0,
					number: 0,
					name: '',
					unit: '',
					post: '',
					sex: '',
					status: '',
					degree: '',
					age: 0,
					seniority: 0,
					one: '',
					two: '',
					three: '',
					four: '',
					five: '',
					six: '',
					seven: '',
					eight: '',
					nine: '',
					ten: '',
					eleven: '',
					twelve: '',
					thirteen: '',
					fourteen: '',
					fifteen: '',
					sixteen: '',
					seventeen: '',
					eighteen: '',
					nineteen: '',
					twenty: '',
					twentyOne: '',
					twentyTwo: '',
					twentyThree: '',
					twentyFour: '',
					twentyFive: '',
					twentySix: '',
					twentySeven: '',
					twentyEight: '',
					twentyNine: '',
					thirty: '',
					thirtyOne: '',
					thirtyTwo: '',
					thirtyThree: '',
					thirtyFour: '',
					thirtyFive: '',
					thirtySix: '',
					thirtySeven: '',
					thirtyEight: '',
					thirtyNine: '',
					forty: '',
					fortyOne: '',
					fortyTwo: '',
					fortyThree: '',
					fortyFour: '',
					fortyFive: '',
					fortySix: '',
					fortySeven: '',
					fortyEight: '',
					fortyNine: '',
					fifty: '',
					fiftyOne: '',
					fiftyTwo: '',
					fiftyThree: '',
					createdTime:'' 
				}
				const createData = Object.assign({}, obj, res.data.data);
				EmployeeStore.addEmployeeList(createData)
				ElMessage.success('添加成功')
			} else {
				ElMessage.error('添加失败')
			}
		}
	})
}

/**
 * @param: 当前点击创建时间
 * @desc: 切换创建时间
 */
const changeCreatedTime = async (value: string) => {
	console.log(value);
	currentDate.value = value
	const res = await api.selectEmployee({createdTime: value})
	if(res.data.state===200) {
		EmployeeStore.updateEmployeeList(res.data.data)
		EmployeeNameList.value = []
		smallChartData.value = {}
		postChartData.value = {}
	}
}

/**
 * @desc: 离焦自动填写
 */
const autofill = async () => {
	if(!_.isEmpty(form2.value.name)) {
		const res = await api.findEmployeeByNumber({name: form2.value.name as string})
		if(res.data.state === 200) {
			form2.value = res.data.data[0]
			// 获取所有不同的number值
			const numbers = [...new Set(res.data.data.map((item: Employee) => item.number))];

			// 根据number值进行分类
			const result = numbers.map(number => {
				return {
					number,
					items: res.data.data.filter((item: Employee) => item.number === number) as Employee[]
				};
			});
      
			namesake.value = result as Array<Namesake>;
			nextTick(() => {
				pairingCreatedTime()
			})
		}else {
			ElMessage.error('无该员工信息')
		}
	} else {
		ElMessage.success('员工姓名不能为空')
	}
  
}

/**
 * @param: 当前点击员工编号
 * @desc: 员工编号自动填写
 */
const autofill2 = async (num: number) => {
	let only = ref(true); 
	if(nextNum.value === num) return 
	const clonedNamesake = _.cloneDeep(namesake.value);
	console.log(clonedNamesake);
  
	clonedNamesake.forEach(item => {
		if(num === item.number && only.value) {
			form2.value = item.items[0];
			nextNum.value = num;
			only.value = false;
		}
	});
	only.value = true;
	form2.value.number = num;
}

/**
 * @desc: 更新表单匹配创建时间
 */
const pairingCreatedTime = () => {
	const clonedNamesake = _.cloneDeep(namesake.value);

	const form2Copy = clonedNamesake.filter(item => item.number === form2.value.number) as Array<Namesake>;
  
	if(!form2Copy.some(item => (
		item.items.some(item1 => {
			if (item1.createdTime === form2.value.createdTime) {
				form2.value = { ...item1 };
				return true; 
			}
			return false
		}))
	)) {
		form2.value = {
			createdTime: form2.value.createdTime,
			name: form2.value.name,
			number: form2.value.number
		}
	}
}

/**
 * @param: 当前点击修改表单实例
 * @desc: 提交修改表单
 */
const submitUpdatedForm = (formEl: FormInstance | undefined) => {
	if(!formEl) return
	formEl.validate(async (valid) => {
		if (valid) {
			const res = await api.updateEmployee(form2.value)
			if(res.data.state === 200) {
				const res2 = await api.selectEmployee({createdTime: currentDate.value})
				if(res2.data.state === 200) {
					EmployeeStore.updateEmployeeList(res2.data.data)
				}
				dialogFixFormVisible.value = false
				ElMessage.success('修改成功')
			} else {
				ElMessage.error('修改失败')   
			}
		}
	})
}

/**
 * @desc: 重置表单
 */
const resetForm = () => {
	form2.value = {}
	namesake.value = []
}
</script>

<style lang="scss" scoped>
.information-function {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	padding: 0 0.5vw;
  a {
    color: inherit;
  }
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
				padding-left: 4px;
			}
		}
	}
}
.el-dialog {
  .el-select {
    width: 100%;
  }
}
</style>
