<script setup>
import { Fold, Expand } from '@element-plus/icons-vue'

const props = defineProps({
  collapsed: Boolean,
})
</script>

<template>
  <div class="topbar-inner">
    <div class="left">
      <el-button type="text" class="collapse-btn" @click="$emit('toggle')">
        <el-icon>
          <component :is="props.collapsed ? Expand : Fold" />
        </el-icon>
      </el-button>
      <div class="brand">CRRC Admin</div>
    </div>

    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="32" src="/avatar.png" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 12px;
}

.topbar-inner .left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand {
  font-weight: 600;
  color: #2d3a4b;
}

.collapse-btn {
  --el-button-padding: 6px 8px;
}

.right {
  display: flex;
  align-items: center;
  gap: 12px
}
</style>
