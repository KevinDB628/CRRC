import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'
import User from '@/pages/User.vue'
import Role from '@/pages/Role.vue'
import Department from '@/pages/Department.vue'

import DeviceList from '@/pages/DeviceList.vue'
import DeviceDetail from '@/pages/DeviceDetail.vue'
import DeviceHistory from '@/pages/DeviceHistory.vue'

import WorkOrderList from '@/pages/WorkOrderList.vue'
import WorkOrderCreate from '@/pages/WorkOrderCreate.vue'
import WorkOrderApprove from '@/pages/WorkOrderApprove.vue'
import RepairRecord from '@/pages/RepairRecord.vue'

import InspectionPlan from '@/pages/InspectionPlan.vue'
import InspectionTask from '@/pages/InspectionTask.vue'
import InspectionExecute from '@/pages/InspectionExecute.vue'
import InspectionRecord from '@/pages/InspectionRecord.vue'

import SparePartsList from '@/pages/SparePartsList.vue'
import PartsRequest from '@/pages/PartsRequest.vue'
import PartsTransfer from '@/pages/PartsTransfer.vue'

import Settings from '@/pages/Settings.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { title: '数据看板' } },

  // 系统管理模块
  { path: '/users', name: 'User', component: User, meta: { title: '用户管理' } },
  { path: '/roles', name: 'Role', component: Role, meta: { title: '角色管理' } },
  { path: '/departments', name: 'Department', component: Department, meta: { title: '部门管理' } },

  // 设备资产管理模块
  { path: '/devices', name: 'DeviceList', component: DeviceList, meta: { title: '设备列表' } },
  { path: '/devices/:id', name: 'DeviceDetail', component: DeviceDetail, meta: { title: '设备详情' } },
  { path: '/devices/:id/history', name: 'DeviceHistory', component: DeviceHistory, meta: { title: '设备履历' } },

  // 维修工单管理模块
  { path: '/work-orders', name: 'WorkOrderList', component: WorkOrderList, meta: { title: '工单列表' } },
  { path: '/work-orders/create', name: 'WorkOrderCreate', component: WorkOrderCreate, meta: { title: '工单创建' } },
  { path: '/work-orders/approve', name: 'WorkOrderApprove', component: WorkOrderApprove, meta: { title: '工单审批' } },
  { path: '/repair-records', name: 'RepairRecord', component: RepairRecord, meta: { title: '维修记录' } },

  // 巡检任务管理模块
  { path: '/inspections/plan', name: 'InspectionPlan', component: InspectionPlan, meta: { title: '巡检计划' } },
  { path: '/inspections/tasks', name: 'InspectionTask', component: InspectionTask, meta: { title: '巡检任务' } },
  { path: '/inspections/execute', name: 'InspectionExecute', component: InspectionExecute, meta: { title: '巡检执行' } },
  { path: '/inspections/records', name: 'InspectionRecord', component: InspectionRecord, meta: { title: '巡检记录' } },

  // 备品备件管理模块
  { path: '/spares', name: 'SparePartsList', component: SparePartsList, meta: { title: '备件列表' } },
  { path: '/spares/requests', name: 'PartsRequest', component: PartsRequest, meta: { title: '配件申请' } },
  { path: '/spares/transfers', name: 'PartsTransfer', component: PartsTransfer, meta: { title: '配件调拨' } },

  { path: '/settings', name: 'Settings', component: Settings, meta: { title: '系统设置' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
