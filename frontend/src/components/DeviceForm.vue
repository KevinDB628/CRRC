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
  device_code: '',
  name: '',
  model: '',
  type: '',
  dept: '',
  install_date: '',
  maintenance_cycle: '',
  status: '正常',
  last_check: '',
})

watch(
  () => props.modelValue,
  (v) => {
    if (v) {
      Object.assign(local, {
        id: v.id ?? null,
        device_code: v.device_code ?? '',
        name: v.name ?? '',
        model: v.model ?? '',
        type: v.type ?? '',
        dept: v.dept ?? '',
        install_date: v.install_date ?? '',
        maintenance_cycle: v.maintenance_cycle ?? '',
        status: v.status ?? '正常',
        last_check: v.last_check ?? '',
      })
    }
  },
  { immediate: true, deep: true }
)

watch(local, (v) => emits('update:modelValue', { ...v }), { deep: true })

const rules = {
  device_code: [{ required: true, message: '请输入资产编码', trigger: 'blur' }],
  name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
  model: [{ required: true, message: '请输入型号', trigger: 'blur' }],
  type: [{ required: true, message: '请输入设备类型', trigger: 'blur' }],
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
  <el-form :model="local" :rules="rules" ref="innerForm" label-width="120px">
    <el-form-item label="资产编码" prop="device_code">
      <el-input v-model="local.device_code" autocomplete="off" />
    </el-form-item>

    <el-form-item label="设备名称" prop="name">
      <el-input v-model="local.name" />
    </el-form-item>

    <el-form-item label="型号" prop="model">
      <el-input v-model="local.model" />
    </el-form-item>

    <el-form-item label="设备类型" prop="type">
      <el-input v-model="local.type" />
    </el-form-item>

    <el-form-item label="部门" prop="dept">
      <el-input v-model="local.dept" />
    </el-form-item>

    <el-form-item label="安装日期" prop="install_date">
      <el-date-picker
        v-model="local.install_date"
        type="date"
        placeholder="选择安装日期"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        style="width: 100%;"
      />
    </el-form-item>

    <el-form-item label="维保周期" prop="maintenance_cycle">
      <el-input v-model="local.maintenance_cycle" placeholder="如：半年/一年" />
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-select v-model="local.status" placeholder="请选择状态">
        <el-option label="正常" value="正常" />
        <el-option label="故障" value="故障" />
        <el-option label="待维保" value="待维保" />
        <el-option label="报废" value="报废" />
      </el-select>
    </el-form-item>

    <el-form-item label="最后检查时间" prop="last_check">
      <el-date-picker
        v-model="local.last_check"
        type="datetime"
        placeholder="选择最后检查时间"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DDTHH:mm:ssZ"
        style="width: 100%;"
      />
    </el-form-item>
  </el-form>
</template>
