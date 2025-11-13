import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTagsStore = defineStore('tags', () => {
  const tabs = ref([
    { title: '数据看板', path: '/dashboard' },
  ])
  const active = ref('/dashboard')

  function addTab(tab) {
    if (!tabs.value.find((t) => t.path === tab.path)) {
      tabs.value.push({ title: tab.title || '新页面', path: tab.path })
    }
    setActive(tab.path)
  }

  function removeTab(path) {
    const idx = tabs.value.findIndex((t) => t.path === path)
    if (idx > -1) tabs.value.splice(idx, 1)
    if (active.value === path) {
      const newTab = tabs.value[idx] || tabs.value[idx - 1] || { path: '/dashboard' }
      setActive(newTab.path)
      // navigation should be handled by the caller (component) to avoid calling router from store
    }
  }

  function setActive(path) {
    active.value = path
  }

  return { tabs, active, addTab, removeTab, setActive }
})
