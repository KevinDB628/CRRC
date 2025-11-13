<template>
  <div class="parts-request-page">
    <div class="toolbar">
      <el-button type="primary" @click="openApplyDialog">
        <el-icon><plus /></el-icon>
        新增配件申请
      </el-button>
    </div>

    <el-card class="card">
      <el-table :data="applyRecords" stripe style="width:100%">
        <el-table-column prop="id" label="申请单号" min-width="100" />
        <el-table-column prop="sparePartName" label="配件名称" min-width="140" />
        <el-table-column prop="quantity" label="申请数量" min-width="80" />
        <el-table-column prop="reasonDetail" label="申请原因" min-width="200" />
        <el-table-column prop="applicant" label="申请人" min-width="100" />
        <el-table-column prop="applyTime" label="申请时间" min-width="180" />
        <el-table-column prop="status" label="状态" min-width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'info' : row.status === 2 ? 'success' : 'danger'">
              {{ row.status === 1 ? '待审批' : row.status === 2 ? '已批准' : row.status === 3 ? '已拒绝' : '已调拨' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 申请对话框 -->
    <el-dialog title="配件申请" v-model="dialogVisible" width="600px">
      <el-form ref="formRef" :model="form" label-width="120px">
        <!-- 申请信息区 -->
        <el-form-item label="配件选择" prop="sparePartId" >
          <el-select v-model="form.sparePartId" placeholder="请选择配件">
            <el-option 
              v-for="part in spareParts" 
              :key="part.id" 
              :label="part.name" 
              :value="part.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="申请数量" prop="quantity" required>
          <el-input-number 
            v-model="form.quantity" 
            :min="1" 
            :step="1" 
            placeholder="请输入数量"
          />
        </el-form-item>
        
        <el-form-item label="申请原因" required>
          <el-select 
            v-model="form.reasonType" 
            placeholder="请选择原因类型"
            style="margin-bottom: 10px;"
          >
            <el-option 
              v-for="type in reasonTypes" 
              :key="type.value" 
              :label="type.label" 
              :value="type.value"
            />
          </el-select>
          
          <el-input 
            v-model="form.reasonDetail" 
            placeholder="请输入详细原因"
            :placeholder="form.reasonType === 'repair' ? '请输入维修工单编号' : '请输入详细原因'"
          />
          
          <template v-if="form.reasonType === 'repair'">
            <div style="margin-top: 8px; font-size: 12px; color: #606266;">
              可选工单: 
              <el-tag 
                v-for="order in repairOrders" 
                :key="order.id"
                style="margin-left: 5px; cursor: pointer;"
                @click="form.reasonDetail = order.id"
              >
                {{ order.id }}
              </el-tag>
            </div>
          </template>
        </el-form-item>
        
        <!-- 审批流程区 -->
        <el-form-item label="审批流程">
          <el-steps :active="form.status || 1" simple>
            <el-step title="申请人" />
            <el-step title="仓库管理员审批" />
            <el-step title="调拨" />
          </el-steps>
          <div style="margin-top: 10px; font-size: 12px; color: #606266;">
            提交后状态将变为"待审批"，等待仓库管理员处理
          </div>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitApply">提交申请</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import dayjs from 'dayjs'

// 模拟配件数据（实际应从spare_part表获取，仅启用状态）
const spareParts = ref([
  { id: 1, name: '电容 C100V', status: '启用' },
  { id: 2, name: '电阻 10KΩ', status: '启用' },
  { id: 3, name: '三极管 2N3055', status: '启用' },
  { id: 4, name: '二极管 IN4007', status: '启用' },
  { id: 5, name: '保险丝 5A', status: '启用' },
  { id: 6, name: '继电器 12V', status: '启用' },
  { id: 7, name: '连接器 XH2.54', status: '启用' },
  { id: 8, name: 'PCB板 通用型', status: '启用' },
  { id: 9, name: '散热片 10x20', status: '启用' },
  { id: 10, name: '导线 0.5mm²', status: '启用' },
  { id: 11, name: '端子 冷压', status: '启用' },
  { id: 12, name: '开关 船型', status: '启用' },
  { id: 13, name: '指示灯 LED', status: '启用' },
  { id: 14, name: '插座 USB', status: '启用' },
  { id: 15, name: '插头 DC 5.5x2.1', status: '启用' }
])

// 申请原因类型
const reasonTypes = ref([
  { label: '维修工单', value: 'repair' },
  { label: '备用库存', value: 'stock' },
  { label: '项目需求', value: 'project' },
  { label: '其他原因', value: 'other' }
])

// 模拟维修工单数据
const repairOrders = ref([
  { id: 'WX20251001001', name: '生产线A设备维修' },
  { id: 'WX20251001002', name: '包装机故障维修' },
  { id: 'WX20251001003', name: '输送带更换配件' }
])

// 申请表单数据
const form = reactive({
  sparePartId: null,        // 配件ID
  quantity: 1,              // 申请数量
  reasonType: '',           // 原因类型
  reasonDetail: '',         // 原因详情
  applicant: '当前登录用户',  // 申请人，实际应从登录信息获取
  applyTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
})

// 申请记录（对应spare_part_apply表）
const applyRecords = ref([
  // 测试数据
  {
    id: 1,
    sparePartId: 1,
    sparePartName: '电容 C100V',
    quantity: 2,
    reasonType: 'repair',
    reasonDetail: '维修工单 WX20251001001',
    applicant: '赵十一',
    applyTime: '2025-10-28 09:12:34',
    status: 1, // 1: 待审批, 2: 已批准, 3: 已拒绝, 4: 已调拨
    approver: null,
    approveTime: null,
    transferTime: null
  }
])

// 审批流程步骤
const approvalSteps = ref([
  { step: 1, name: '申请人', status: '完成' },
  { step: 2, name: '仓库管理员审批', status: '待处理' },
  { step: 3, name: '调拨', status: '未开始' }
])

// 表单弹窗控制
const dialogVisible = ref(false)
const formRef = ref(null)

// 打开申请对话框
function openApplyDialog() {
  form.sparePartId = null
  form.quantity = 1
  form.reasonType = ''
  form.reasonDetail = ''
  dialogVisible.value = true
}

// 提交申请
function submitApply() {
  // 模拟表单验证
  if (!form.sparePartId) {
    ElMessage.warning('请选择配件')
    return
  }
  
  if (form.quantity < 1) {
    ElMessage.warning('申请数量必须大于0')
    return
  }
  
  if (!form.reasonType || !form.reasonDetail) {
    ElMessage.warning('请填写申请原因')
    return
  }
  
  // 生成新申请记录
  const selectedPart = spareParts.value.find(p => p.id === form.sparePartId)
  const newRecord = {
    id: applyRecords.value.length + 1,
    sparePartId: form.sparePartId,
    sparePartName: selectedPart.name,
    quantity: form.quantity,
    reasonType: form.reasonType,
    reasonDetail: form.reasonType === 'repair' 
      ? `维修工单 ${form.reasonDetail}` 
      : form.reasonDetail,
    applicant: form.applicant,
    applyTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    status: 1 // 待审批
  }
  
  // 添加到申请记录（实际应调用API保存到spare_part_apply表）
  applyRecords.value.push(newRecord)
  
  // 显示成功消息并关闭对话框
  ElMessage.success('申请提交成功')
  dialogVisible.value = false
}
</script>
<style scoped>
.parts-request-page {
  padding: 12px;
}

.toolbar {
  margin-bottom: 12px;
}

.card {
  padding: 12px;
}
</style>
