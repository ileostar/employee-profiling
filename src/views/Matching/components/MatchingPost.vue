<template>
    <div class="MatchingPost">
      <div class="job-demand">
        <li>人岗匹配分析</li>    
        <el-input
          v-model="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          type="textarea"
          :placeholder="example"
          resize="none"
          input-style="font-size: 1vh;"
        />
        <el-button type="info">提交分析</el-button>
      </div>
      <el-divider />
      <div class="matching-result">
        <li>人岗匹配分析</li>
        <noResultYet :size="350">
          <template v-slot:default>
            111
          </template>
        </noResultYet>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import noResultYet from '@/components/noResultYet/noResultYet.vue'
const textarea = ref('')
const example = '例：我需要一个体力好，有服务意识，并且具备开发能力的员工'

</script>

<style lang="scss" scoped>
.MatchingPost {
  display: flex;
  flex-direction: column;
  margin: 1vh 0;  
  height: 100%;
  .job-demand {
    height: 25%;
    width: 70%;
    margin: 1vh 0;
    li {
      margin-bottom: 2vh;
    }
    .el-button {
      margin-top: 2vh;
      float: right;
      font-size: 1.2vh;
      width: 6vw;
      height: 4vh;
    }
  }
  .matching-result {
    flex: 1;
    margin-top: -1vh;
  }
}
</style>