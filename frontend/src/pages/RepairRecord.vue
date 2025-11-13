<script setup>
import { ref, reactive, computed } from 'vue'
import dayjs from 'dayjs'
import UserForm from '@/components/UserForm.vue'

const users = ref([
  { id: 1, name: '赵十一', user_code: '1000000001', dept_name: '人力资源部', post: '招聘专员', status: '正常', last_login_time: '2025-10-28T09:12:34Z', create_time: '2023-10-01T08:00:00Z' },
  { id: 2, name: '钱十二', user_code: '1000000002', dept_name: '财务部', post: '财务经理', status: '正常', last_login_time: '2025-10-27T15:45:12Z', create_time: '2023-09-15T09:30:00Z' },
  { id: 3, name: '孙十三', user_code: '1000000003', dept_name: '生产部', post: '车间主任', status: '禁用', last_login_time: '2025-08-11T11:05:00Z', create_time: '2023-08-20T10:00:00Z' },
  { id: 4, name: '李十四', user_code: '1000000004', dept_name: '运维部', post: '运维工程师', status: '正常', last_login_time: '2025-10-29T01:22:00Z', create_time: '2024-01-05T14:20:00Z' },
  { id: 5, name: '周十五', user_code: '1000000005', dept_name: '质检部', post: '巡检员', status: '锁定', last_login_time: '2025-07-02T07:30:00Z', create_time: '2023-12-12T12:12:12Z' },
  { id: 6, name: '吴十六', user_code: '1000000006', dept_name: '销售部', post: '销售代表', status: '正常', last_login_time: '2025-10-20T18:05:05Z', create_time: '2024-03-01T09:00:00Z' },
  { id: 7, name: '郑十七', user_code: '1000000007', dept_name: '技术部', post: '测试工程师', status: '正常', last_login_time: '2025-10-26T20:40:40Z', create_time: '2023-11-30T16:00:00Z' },
  { id: 8, name: '王十八', user_code: '1000000008', dept_name: '后勤部', post: '后勤主管', status: '正常', last_login_time: '2025-10-25T08:00:00Z', create_time: '2023-06-18T08:00:00Z' },
  { id: 9, name: '冯十九', user_code: '1000000009', dept_name: '法务部', post: '法务顾问', status: '禁用', last_login_time: '2025-09-10T13:13:13Z', create_time: '2022-12-01T09:15:00Z' },
  { id: 10, name: '陈二十', user_code: '1000000010', dept_name: '市场部', post: '市场经理', status: '正常', last_login_time: '2025-10-24T10:10:10Z', create_time: '2024-05-20T11:11:11Z' },
])

const filter = ref('')
const currentPage = ref(1)
const pageSize = ref(8)

const filtered = computed(() => {
  if (!filter.value) return users.value
  const key = filter.value.toLowerCase()
  return users.value.filter((u) => {
    const hay = (
      (u.username || u.name || '') +
      (u.nickname || '') +
      (u.user_code || '') +
      (u.dept_name || '') +
      (u.post || '')
    ).toLowerCase()
    return hay.includes(key)
  })
})

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

const dialogVisible = ref(false)
const dialogMode = ref('create')
const dialogTitle = computed(() => (dialogMode.value === 'create' ? '新增用户' : '编辑用户'))
const formRef = ref(null)
const form = reactive({
  id: null,
  user_code: '',
  name: '',
  dept_name: '',
  post: '',
  status: '正常',
  last_login_time: '',
  create_time: '',
})

function openDialog(mode, row = null) {
  dialogMode.value = mode
  if (mode === 'create') {
    Object.assign(form, {
      id: null,
      user_code: '',
      name: '',
      dept_name: '',
      post: '',
      status: '正常',
      last_login_time: '',
      create_time: new Date().toISOString(),
    })
  } else if (mode === 'edit' && row) {
    Object.assign(form, {
      id: row.id ?? null,
      user_code: row.user_code ?? row.userCode ?? '',
      name: row.name ?? row.username ?? '',
      dept_name: row.dept_name ?? row.deptName ?? '',
      post: row.post ?? '',
      status: row.status ?? '正常',
      last_login_time: row.last_login_time ?? row.lastLoginTime ?? '',
      create_time: row.create_time ?? row.createTime ?? '',
    })
  }
  dialogVisible.value = true
}

function submitForm() {
  formRef.value && formRef.value.validate((valid) => {
    if (!valid) return
    const payload = { ...form }
    if (dialogMode.value === 'create') {
      payload.create_time = payload.create_time || new Date().toISOString()
      const nextId = users.value.length ? Math.max(...users.value.map((u) => u.id)) + 1 : 1
      users.value.unshift({ ...payload, id: nextId })
      ElMessage.success('创建成功')
    } else {
      const idx = users.value.findIndex((u) => u.id === form.id)
      if (idx > -1) users.value.splice(idx, 1, { ...payload })
      ElMessage.success('保存成功')
    }
    dialogVisible.value = false
  })
}

function confirmDelete(row) {
  ElMessageBox.confirm(`确认删除用户「${row.name || row.username}」吗？`, '提示', { type: 'warning' })
    .then(() => {
      const idx = users.value.findIndex((u) => u.id === row.id)
      if (idx > -1) users.value.splice(idx, 1)
      ElMessage.success('删除成功')
    })
    .catch(() => { })
}
</script>

<template>
  <div class="users-page">
    <div class="toolbar">
      <el-button type="primary" @click="openDialog('create')">新增用户</el-button>
      <el-input v-model="filter" placeholder="搜索姓名/工号/部门/岗位" clearable style="width:320px; margin-left:12px" />
    </div>

    <el-card class="card">
      <el-table :data="pagedData" stripe style="width:100%">
        <el-table-column prop="user_code" label="员工工号" min-width="140" />
        <el-table-column prop="name" label="姓名" min-width="120" />
        <el-table-column prop="dept_name" label="所属部门" min-width="140" />
        <el-table-column prop="post" label="岗位名称" min-width="140" />
        <el-table-column prop="status" label="用户状态" min-width="100" />
        <el-table-column prop="last_login_time" label="最后登录时间" min-width="180">
          <template #default="{ row }">
            {{ row.last_login_time ? dayjs(row.last_login_time).format('YYYY-MM-DD HH:mm:ss') : '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="账号开通时间" min-width="180">
          <template #default="{ row }">
            {{ row.create_time ? dayjs(row.create_time).format('YYYY-MM-DD HH:mm:ss') : '-' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="openDialog('edit', row)">编辑</el-button>
            <el-button type="danger" size="small" @click="confirmDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrap">
        <el-pagination background v-model:current-page="currentPage" :page-size="pageSize" :total="filtered.length"
          layout="prev, pager, next, jumper, ->, total" />
      </div>
    </el-card>

    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="640px">
      <UserForm ref="formRef" :modelValue="form" @update:modelValue="val => Object.assign(form, val)"
        :mode="dialogMode" />

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.users-page {
  padding: 12px
}

.toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 12px
}

.card {
  padding: 12px
}

.pagination-wrap {
  padding: 12px 0;
  display: flex;
  justify-content: flex-end
}

.el-table .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
</style>
