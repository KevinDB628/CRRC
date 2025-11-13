<!-- <script setup>
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
</style> -->
<script setup>
import { ref, reactive, computed } from 'vue'
import dayjs from 'dayjs'
// import UserForm from '@/components/UserForm.vue' // <-- 1. 不再需要 UserForm
import { ElMessage, ElMessageBox } from 'element-plus' // 确保导入了 ElMessage

// --- 2. 替换为“计划列表”的模拟数据 ---
const plans = ref([
  { id: 1, name: '城轨总装 - ATP 系统周巡检', type: '周', value: '1,3,5', dept_name: '城轨总装部', status: '启用', items: ['牵引变流器温度', '外观检查'] },
  { id: 2, name: '日常 - 办公室清洁', type: '日', value: '09:00', dept_name: '后勤部', status: '启用', items: ['地面清洁', '垃圾倾倒'] },
  { id: 3, name: '财务 - 月度报销核对', type: '月', value: '25', dept_name: '财务部', status: '停用', items: ['发票核对'] },
  { id: 4, name: '生产 - 设备安全日检', type: '日', value: '08:30', dept_name: '生产部', status: '启用', items: ['设备电源', '安全护栏'] },
  { id: 5, name: '运维 - 服务器状态周检', type: '周', value: '2,4', dept_name: '运维部', status: '启用', items: ['CPU占用率', '磁盘空间'] },
])

// --- 3. 巡检项 & 周期选项 (用于表单) ---
const allInspectionItems = ref([
  '牵引变流器温度', '外观检查', '地面清洁', '垃圾倾倒', 
  '发票核对', '设备电源', '安全护栏', 'CPU占用率', '磁盘空间'
])
const weekOptions = ref([
  { label: '周一', value: '1' },
  { label: '周二', value: '2' },
  { label: '周三', value: '3' },
  { label: '周四', value: '4S' },
  { label: '周五', value: '5' },
  { label: '周六', value: '6' },
  { label: '周日', value: '7' },
])

// --- 4. 搜索、分页 (基本复用) ---
const filter = ref('')
const currentPage = ref(1)
const pageSize = ref(8)

const filtered = computed(() => {
  if (!filter.value) return plans.value
  const key = filter.value.toLowerCase()
  return plans.value.filter((p) => {
    // 按计划名称、部门、类型搜索
    const hay = (
      (p.name || '') +
      (p.dept_name || '') +
      (p.type || '')
    ).toLowerCase()
    return hay.includes(key)
  })
})

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

// --- 5. 弹窗和表单逻辑 (重构) ---
const dialogVisible = ref(false)
const dialogMode = ref('create')
const dialogTitle = computed(() => (dialogMode.value === 'create' ? '新增计划' : '编辑计划'))
const formRef = ref(null)

// 帮助重置表单的函数
function getInitialForm() {
  return {
    id: null,
    name: '',
    type: '日',
    value_day: '09:00', // 日
    value_week: [],     // 周
    value_month: 1,     // 月
    dept_name: '',
    items: [],
    status: '启用'
  }
}

const form = reactive(getInitialForm())

function openDialog(mode, row = null) {
  dialogMode.value = mode
  // 重置表单为初始状态
  Object.assign(form, getInitialForm())

  if (mode === 'create') {
    // (已重置，无需额外操作)
  } else if (mode === 'edit' && row) {
    // 编辑时，需要回填数据
    form.id = row.id
    form.name = row.name
    form.type = row.type
    form.dept_name = row.dept_name
    form.items = row.items
    form.status = row.status

    // ** 关键：根据类型回填 "周期值" **
    if (row.type === '日') {
      form.value_day = row.value
    } else if (row.type === '周') {
      form.value_week = row.value.split(',') // "1,3,5" -> ['1', '3', '5']
    } else if (row.type === '月') {
      form.value_month = Number(row.value) // "25" -> 25
    }
  }
  dialogVisible.value = true
}

function submitForm() {
  // 注意：我们直接在 el-dialog 中定义了 formRef，所以这里可以工作
  formRef.value && formRef.value.validate((valid) => {
    if (!valid) return
    
    // ** 关键：提交时，根据类型组装 "value" **
    const payload = { ...form }
    if (payload.type === '日') {
      payload.value = payload.value_day
    } else if (payload.type === '周') {
      payload.value = payload.value_week.join(',') // ['1', '3'] -> "1,3"
    } else if (payload.type === '月') {
      payload.value = String(payload.value_month) // 15 -> "15"
    }
    
    // 从 payload 中删除临时的 value_xxx 字段
    delete payload.value_day
    delete payload.value_week
    delete payload.value_month

    if (dialogMode.value === 'create') {
      const nextId = plans.value.length ? Math.max(...plans.value.map((u) => u.id)) + 1 : 1
      plans.value.unshift({ ...payload, id: nextId })
      ElMessage.success('创建成功')
    } else {
      const idx = plans.value.findIndex((p) => p.id === form.id)
      if (idx > -1) plans.value.splice(idx, 1, { ...payload })
      ElMessage.success('保存成功')
    }
    dialogVisible.value = false
  })
}

// --- 6. 表格操作 (重构) ---
function confirmDelete(row) {
  ElMessageBox.confirm(`确认删除计划「${row.name}」吗？`, '提示', { type: 'warning' })
    .then(() => {
      const idx = plans.value.findIndex((p) => p.id === row.id)
      if (idx > -1) plans.value.splice(idx, 1)
      ElMessage.success('删除成功')
    })
    .catch(() => { })
}

// 新增：切换状态
function handleToggleStatus(row) {
  row.status = row.status === '启用' ? '停用' : '启用'
  ElMessage.success(`已${row.status}`)
}

// 新增：生成任务 (占位)
function handleGenerateTask(row) {
  ElMessageBox.confirm(`确认立即为「${row.name}」生成一次任务吗？`, '提示')
    .then(() => {
      ElMessage.success('任务已生成')
    })
    .catch(() => {})
}

// 辅助函数 (用于状态标签颜色)
function getStatusType(status) {
  return status === '启用' ? 'success' : 'danger'
}
</script>

<template>
  <div class="users-page"> <div class="toolbar">
      <el-button type="primary" @click="openDialog('create')">新增计划</el-button>
      <el-input v-model="filter" placeholder="搜索计划名称/部门" clearable style="width:320px; margin-left:12px" />
    </div>

    <el-card class="card">
      <el-table :data="pagedData" stripe style="width:100%">
        <el-table-column prop="name" label="计划名称" min-width="200" />
        <el-table-column prop="type" label="周期类型" min-width="100" />
        <el-table-column prop="value" label="周期值" min-width="120">
          <template #default="{ row }">
            <span v-if="row.type === '周'">
              {{ row.value.split(',').map(d => weekOptions.find(w => w.value === d)?.label || d).join(', ') }}
            </span>
            <span v-else-if="row.type === '月'">
              每月 {{ row.value }} 号
            </span>
            <span v-else>
              {{ row.value }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="dept_name" label="部门" min-width="140" />
        <el-table-column prop="status" label="状态" min-width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="240">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="openDialog('edit', row)">编辑</el-button>
            <el-button type="success" size="small" @click="handleGenerateTask(row)">生成任务</el-button>
            <el-button 
              :type="row.status === '启用' ? 'danger' : 'warning'" 
              size="small" 
              @click="handleToggleStatus(row)">
              {{ row.status === '启用' ? '停用' : '启用' }}
            </el-button>
            </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrap">
        <el-pagination background v-model:current-page="currentPage" :page-size="pageSize" :total="filtered.length"
          layout="prev, pager, next, jumper, ->, total" />
      </div>
    </el-card>

    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="640px">
      
      <el-form ref="formRef" :model="form" label-width="100px" style="padding: 0 20px">
        <el-form-item label="计划名称" prop="name" :rules="[{ required: true, message: '请输入计划名称' }]">
          <el-input v-model="form.name" placeholder="如：城轨总装 - ATP 系统周巡检" />
        </el-form-item>

        <el-form-item label="所属部门" prop="dept_name">
          <el-input v-model="form.dept_name" placeholder="请输入部门" />
        </el-form-item>

        <el-form-item label="周期类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio-button label="日" />
            <el-radio-button label="周" />
            <el-radio-button label="月" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="周期值" v-if="form.type === '日'" prop="value_day">
          <el-time-picker v-model="form.value_day" format="HH:mm" value-format="HH:mm" placeholder="选择每日执行时间" />
        </el-form-item>

        <el-form-item label="周期值" v-if="form.type === '周'" prop="value_week">
          <el-checkbox-group v-model="form.value_week">
            <el-checkbox v-for="opt in weekOptions" :key="opt.value" :label="opt.value">
              {{ opt.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="周期值" v-if="form.type === '月'" prop="value_month">
          <el-input-number v-model="form.value_month" :min="1" :max="31" />
          <span style="margin-left: 8px">号</span>
        </el-form-item>
        
        <el-form-item label="巡检项" prop="items">
          <el-checkbox-group v-model="form.items">
            <el-checkbox v-for="item in allInspectionItems" :key="item" :label="item" />
          </el-checkbox-group>
        </el-form-item>
        
        <el-form-item label="状态" prop="status">
           <el-radio-group v-model="form.status">
            <el-radio-button label="启用" />
            <el-radio-button label="停用" />
          </el-radio-group>
        </el-form-item>

      </el-form>

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

/* 这个样式可以保留，它防止了表格内容换行
  (如果你希望内容换行，可以删除它)
*/
.el-table .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
</style>