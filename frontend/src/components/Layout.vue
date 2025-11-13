<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Topbar from './Topbar.vue'
import Sidebar from './Sidebar.vue'
import TagsView from './TagsView.vue'
import { useTagsStore } from '@/stores/tags'

const collapsed = ref(false)
const route = useRoute()
const tags = useTagsStore()

function toggleCollapsed() {
  collapsed.value = !collapsed.value
}

  // Add the initial route as a tab and watch for route changes to add tabs
  watch(
    () => route.path,
    (p) => {
      // ignore root path '/' because router redirects to '/dashboard' and
      // we already have a default Dashboard tab; avoid creating a '新页面' for '/'
      if (!p || p === '/') return
      if (p) {
        const titleMap = {
          '/dashboard': '数据看板',
          '/users': '用户管理',
          '/settings': '系统设置',
        }
        // prefer route.meta.title if provided, fallback to titleMap or '新页面'
        const title = route.meta?.title || titleMap[p] || '新页面'
        tags.addTab({ path: p, title })
      }
    },
    { immediate: true }
  )
</script>

<template>
  <el-container class="layout-root">
    <el-header class="layout-header">
      <Topbar :collapsed="collapsed" @toggle="toggleCollapsed" />
    </el-header>

    <el-container class="layout-body">
      <transition name="aside-width">
        <el-aside :width="collapsed ? '64px' : '220px'" class="layout-aside">
          <Sidebar :collapsed="collapsed" />
        </el-aside>
      </transition>

      <el-main class="layout-main">
        <TagsView />
        <div class="view-container">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-root {
  height: 100vh;
  background: #f3f6f9;
}

.layout-header {
  height: 64px;
  padding: 0;
  background: white;
  border-bottom: 1px solid var(--el-border-color, #ebeef5);
}

.layout-body {
  height: calc(100vh - 64px);
}

.layout-aside {
  padding: 12px 8px;
  background: white;
  border-right: 1px solid var(--el-border-color, #ebeef5);
  transition: width 0.25s cubic-bezier(.2, .9, .3, 1);
  overflow: hidden;
}

.layout-main {
  padding: 12px;
  overflow: auto;
}

.view-container {
  margin-top: 8px;
}

/* transition helper (aside width) */
.aside-width-enter-active,
.aside-width-leave-active {
  transition: width 0.25s cubic-bezier(.2, .9, .3, 1);
}

.aside-width-enter-from,
.aside-width-leave-to {
  width: 64px !important;
}
</style>
