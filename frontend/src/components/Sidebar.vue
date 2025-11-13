<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Document, User } from '@element-plus/icons-vue'

const props = defineProps({ collapsed: { type: Boolean, default: false } })
const router = useRouter()
const route = useRoute()

const active = ref(route.path || '/dashboard')

watch(() => route.path, (p) => (active.value = p))

function onSelect(index) {
  // index is the route path we've used above
  if (index) {
    router.push(index).catch(() => { })
  }
}
</script>

<template>
  <nav class="sidebar-nav">
    <el-menu :default-active="active" :collapse="collapsed" background-color="transparent" class="el-menu-vertical-demo"
      @select="onSelect">
      <el-menu-item index="/dashboard">
        <el-icon>
          <Document />
        </el-icon>
        <template #title>数据看板</template>
      </el-menu-item>

      <el-sub-menu index="/management">
        <template #title>
          <el-icon>
            <User />
          </el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/users">用户管理</el-menu-item>
        <el-menu-item index="/roles">角色管理</el-menu-item>
        <el-menu-item index="/departments">部门管理</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/assets">
        <template #title>
          <el-icon>
            <Document />
          </el-icon>
          <span>设备资产管理</span>
        </template>
        <el-menu-item index="/devices">设备列表</el-menu-item>
        <el-menu-item index="/devices/1">设备详情</el-menu-item>
        <el-menu-item index="/devices/1/history">设备履历</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/workorders">
        <template #title>
          <el-icon>
            <Document />
          </el-icon>
          <span>维修工单管理</span>
        </template>
        <el-menu-item index="/work-orders">工单列表</el-menu-item>
        <el-menu-item index="/work-orders/create">工单创建</el-menu-item>
        <el-menu-item index="/work-orders/approve">工单审批</el-menu-item>
        <el-menu-item index="/repair-records">维修记录</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/inspections">
        <template #title>
          <el-icon>
            <Document />
          </el-icon>
          <span>巡检任务管理</span>
        </template>
        <el-menu-item index="/inspections/plan">巡检计划</el-menu-item>
        <el-menu-item index="/inspections/tasks">巡检任务</el-menu-item>
        <el-menu-item index="/inspections/execute">巡检执行</el-menu-item>
        <el-menu-item index="/inspections/records">巡检记录</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/spares">
        <template #title>
          <el-icon>
            <Document />
          </el-icon>
          <span>备品备件管理</span>
        </template>
        <el-menu-item index="/spares">备件列表</el-menu-item>
        <el-menu-item index="/spares/requests">配件申请</el-menu-item>
        <el-menu-item index="/spares/transfers">配件调拨</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </nav>
</template>

<style scoped>
.sidebar-nav {
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  border-right: none;
}
</style>
