<template>
  <div class="model-modification common-layout">
		<h1 class="title">模型修改</h1>
		<div class="fenge"></div>
    <div class="model-modification-main">
      <div class="function">
        <div class="model-select">
          <p>全局模型切换</p>
          <el-select v-model="currentModelValue" class="m-2" placeholder="模型切换">
            <el-option
              v-for="item in modelTotal"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <p style="margin-left: 1vw;color: gray; font-size: small;">
            (全局模型切换，会消耗一定时间，请谨慎切换！)
          </p>
        </div>
        <div class="function-button">
          <el-button type="primary">新建</el-button>
          <el-button type="info">修改</el-button>
          <el-button type="danger">删除</el-button>
        </div>
      </div>
      <div class="model-message my-table">
        <div class="function-select">
          <div class="model-select">
            <p>查看模型</p>
            <el-select v-model="currentSelectModel" class="m-2" placeholder="选择模型">
              <el-option
                v-for="item in modelTotal"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="post-select">
            <p>岗位切换</p>
            <el-select v-model="currentSelectPost" class="m-2" placeholder="选择岗位" @change="findModelInformation">
              <el-option
                v-for="item in postData"
                :key="item"
                :label="item"
                :value="item" 
              />
            </el-select>
          </div>
        </div>
        <el-divider />
        <el-scrollbar max-height="62.5vh">
          <el-descriptions 
            direction="vertical"
            :column="3"
            border>
              <el-descriptions-item v-for="item of formField" :key="item" :label="item.label">  {{item.value}}
              </el-descriptions-item>
          </el-descriptions>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from '@/api/api'
import { useModelStore } from '@/stores/model'
import { usePostStore } from '@/stores/post'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const postStore = usePostStore()
const modelStore = useModelStore()
const { postData } = storeToRefs(postStore)
const { modelTotal } = storeToRefs(modelStore)

onMounted(() => {
	if(currentSelectPost.value === '') {
		currentSelectPost.value = postData.value[0]
	}
  
	if(currentSelectModel.value === '') {
		currentSelectModel.value = modelTotal.value[1]
	}
})

// 当前全局模型
const currentModelValue = ref('')
// 当前查看模型
const currentSelectModel = ref('')
// 当前查看模型岗位
const currentSelectPost = ref('')

interface FormField {
  value: {
    [key: string]: {
      value:  number | string;
      label: string;
      span: number;
    };
  };
}

const formField: FormField = ref({
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

const findModelInformation = async () => {
	const res = await api.selectModelInformation({filePath:currentSelectModel.value,post:currentSelectPost.value})
	if(res.status === 200) {
		const resArr = Object.entries(res.data)
		for(const item in formField.value ) {
			resArr.map(i=>{
				if(i[0]===item) {
					formField.value[item].value = i[1] as number | string
				}
			})
		}
		console.log(formField.value);
	}
  console.log('111');
  
}
</script>
<style lang="scss" scoped>
.model-modification {
	padding: 3vh;
  .model-modification-main {
		padding: 1.5vh;
		height: 100%;
		width: 100%;
		overflow: hidden;
    .function {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1vh 0 2vh;
      .model-select {
        
        display: flex;
        align-items: center;
        padding-right: 2vh;
        p {
          font-size: 15px;
          padding-right: 2vh;
        }
      }
      .function-button {
        display: flex;
        align-items: center;
      }  
    }
    .model-message {
      padding: 1vh;
      width: 100%;
      height: 92%;
      .function-select {
        display: flex;
        align-items: center;
        margin: 0.5vh 1vw -1vw;
        .model-select,.post-select {
          display: flex;
          align-items: center;
          padding-right: 2vh;
          p {
            font-size: 15px;
            padding-right: 2vh;
          }
        }
      }
      .el-scrollbar {
        margin-top: -2vh;
      }
    }
  }
}
</style>