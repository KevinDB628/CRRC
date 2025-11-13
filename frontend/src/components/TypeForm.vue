<script setup>
import { reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['submit', 'cancel'])

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  allTypes: { type: Array, default: () => [] }
})

const form = reactive({
  id: null,
  typeName: '',
  parentId: null,
  defaultCycle: 0,
  status: 1,
  desc: ''
})

// 将父组件传来的数据赋值到本地 form
watch(
  () => props.modelValue,
  (val) => {
    Object.assign(form, val)
  },
  { immediate: true, deep: true }
)

// 点击“保存”
function handleSubmit() {
  if (!form.typeName) {
    return ElMessage.error('类型名称不能为空')
  }
  emit('submit', { ...form })
}

// 点击“取消”
function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <el-form label-width="120px" style="padding: 5px 20px">
    
    <el-form-item label="类型名称">
      <el-input v-model="form.typeName" />
    </el-form-item>

    <el-form-item label="父类型">
        <el-select v-model="form.parentId" clearable placeholder="无父类型（一级类型）">
            <el-option
                v-for="item in props.allTypes"
                :key="item.id"
                :label="item.typeName"
                :value="item.id"
            />
        </el-select>

    </el-form-item>

    <el-form-item label="默认维保周期(天)">
      <el-input-number v-model="form.defaultCycle" :min="0" />
    </el-form-item>

    <el-form-item label="状态">
      <el-select v-model="form.status">
        <el-option label="启用" :value="1" />
        <el-option label="禁用" :value="0" />
      </el-select>
    </el-form-item>

    <el-form-item label="描述">
      <el-input type="textarea" rows="3" v-model="form.desc" />
    </el-form-item>

    <div style="text-align: right; padding-top: 10px">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </div>

  </el-form>
</template>
