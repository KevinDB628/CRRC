<script setup>
import { reactive, watch, ref } from 'vue'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  mode: { type: String, default: 'create' },
})
const emits = defineEmits(['update:modelValue'])

const innerForm = ref(null)

const local = reactive({
  id: null,
  user_code: '',
  name: '',
  dept_name: '',
  post: '',
  status: '正常',
  last_login_time: '',
  create_time: '',
})

watch(
  () => props.modelValue,
  (v) => {
    if (v) {
      Object.assign(local, {
        id: v.id ?? null,
        user_code: v.user_code ?? v.userCode ?? '',
        name: v.name ?? v.username ?? '',
        dept_name: v.dept_name ?? v.deptName ?? '',
        post: v.post ?? '',
        status: v.status ?? '正常',
        last_login_time: v.last_login_time ?? v.lastLoginTime ?? '',
        create_time: v.create_time ?? v.createTime ?? '',
      })
    }
  },
  { immediate: true, deep: true }
)

watch(local, (v) => emits('update:modelValue', { ...v }), { deep: true })

const rules = {
  user_code: [{ required: true, message: '请输入员工工号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
}

defineExpose({
  validate(cb) {
    if (!innerForm.value) return cb && cb(false)
    innerForm.value.validate(cb)
  },
  resetFields() {
    innerForm.value && innerForm.value.resetFields()
  },
  getData() {
    return { ...local }
  },
})
</script>

<template>
  <el-form :model="local" :rules="rules" ref="innerForm" label-width="100px">
    <el-form-item label="员工工号" prop="user_code">
      <el-input v-model="local.user_code" autocomplete="off" />
    </el-form-item>

    <el-form-item label="姓名" prop="name">
      <el-input v-model="local.name" />
    </el-form-item>

    <el-form-item label="所属部门" prop="dept_name">
      <el-input v-model="local.dept_name" />
    </el-form-item>

    <el-form-item label="岗位" prop="post">
      <el-input v-model="local.post" />
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-select v-model="local.status" placeholder="请选择状态">
        <el-option label="正常" value="正常" />
        <el-option label="禁用" value="禁用" />
        <el-option label="锁定" value="锁定" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
