<template>
    <div class="tag-manage">
        <h1 class="title">标签管理</h1>
        <div class="tag-detail my-table">
            <el-tag
                v-for="tag in dynamicTags"
                :key="tag"
                class="mx-1"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{ tag }}
            </el-tag>
            
            <el-button size="small" @click="dialogFormVisible = true">+</el-button>
            
            <el-dialog v-model="dialogFormVisible" title="添加标签">
                <el-form :model="form">
                  <el-form-item label="标签名称" :label-width="formLabelWidth">
                    <el-input
                        ref="InputRef"
                        v-model="inputValue"
                        class="ml-1 w-20"
                        @keyup.enter="handleInputConfirm"
                        @blur="handleInputConfirm"
                    />
                  </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">
                      确定
                    </el-button>
                  </span>
                </template>
              </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { ElInput } from 'element-plus'

const inputValue = ref('')
const dynamicTags = ref(['有体育特长', '有艺术特长', '有QC项目经历'])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}


</script>

<style lang="scss" scoped>
.tag-manage {
    padding: 3vh;
    .tag-detail {
        padding: 1.5vh;
        .el-tag {
            height: 4vh;
            margin-right: 1.2vh;
        }
        .el-button {
            margin-top: -.25vh;
            height: 4vh;
            line-height: 4vh;
            font-size: 3vh;
            color: #606266;
        }
    }
}
</style>