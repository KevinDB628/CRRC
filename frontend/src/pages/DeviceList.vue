<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from '@/utils/axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import TypeForm from '@/components/TypeForm.vue'

const list = ref([])
const filter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

// 弹窗相关
const dialogVisible = ref(false)
const dialogMode = ref('create') // create / edit
const formData = ref({}) // 编辑时的初始数据

// 所有类型（用来选择 parentId）
const allTypes = ref([])

onMounted(async () => {
  await loadList()
})

// 加载数据
async function loadList() {
  const res = await axios.get('/api/equipmentTypes')
  list.value = res.data
  allTypes.value = res.data // 给弹窗里的父类型下拉用
}

// 搜索
const filtered = computed(() => {
  if (!filter.value) return list.value
  const key = filter.value.toLowerCase()
  return list.value.filter(x =>
    (x.typeName || '').toLowerCase().includes(key) ||
    (x.desc || '').toLowerCase().includes(key)
  )
})

// 分页
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

// 打开新增弹窗
function openCreate() {
  dialogMode.value = 'create'
  formData.value = {
    typeName: '',
    parentId: null,
    defaultCycle: 0,
    status: 1,
    desc: ''
  }
  dialogVisible.value = true
}

// 打开编辑弹窗
function openEdit(row) {
  dialogMode.value = 'edit'
  formData.value = { ...row }
  dialogVisible.value = true
}

// 提交（新增 or 编辑）
async function submitForm(data) {
  if (dialogMode.value === 'create') {
    await axios.post('/api/equipmentTypes', data)
    ElMessage.success('新增成功')
  } else {
    await axios.put(`/api/equipmentTypes/${data.id}`, data)
    ElMessage.success('修改成功')
  }
  dialogVisible.value = false
  await loadList()
}

// 删除
function deleteType(row) {
  ElMessageBox.confirm(
    `确认删除设备类型「${row.typeName}」吗？`,
    '警告',
    { type: 'warning' }
  )
    .then(async () => {
      await axios.delete(`/api/equipmentTypes/${row.id}`)
      ElMessage.success('删除成功')
      await loadList()
    })
    .catch(() => {})
}
</script>

<template>
  <div class="page">
    <div class="toolbar">
      <el-button type="primary" @click="openCreate">新增类型</el-button>

      <el-input
        v-model="filter"
        placeholder="搜索类型名称 / 描述"
        clearable
        style="width: 300px"
      />
    </div>

    <el-card>
      <el-table :data="pagedData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="typeName" label="类型名称" width="180" />
        <el-table-column prop="parentId" label="上级类型ID" width="120" />
        <el-table-column prop="defaultCycle" label="默认维保周期(天)" width="160" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述" min-width="200" />

        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="openEdit(row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="deleteType(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrap">
        <el-pagination
          background
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="filtered.length"
          layout="prev, pager, next, jumper, ->, total"
        />
      </div>
    </el-card>

    <!-- 弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogMode === 'create' ? '新增类型' : '编辑类型'"
      width="550px"
    >
      <TypeForm
        :all-types="allTypes"
        :model-value="formData"
        @submit="submitForm"
        @cancel="dialogVisible = false"
      />
    </el-dialog>

  </div>
</template>

<style scoped>
.page { padding: 12px; }
.toolbar {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.pagination-wrap {
  padding: 12px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
