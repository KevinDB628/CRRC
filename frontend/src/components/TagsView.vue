<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTagsStore } from '@/stores/tags'

const store = useTagsStore()
const router = useRouter()

const tabs = computed(() => store.tabs)
const active = computed({
  get: () => store.active,
  set: (v) => {
    store.setActive(v)
    router.push(v).catch(() => { })
  },
})

function removeTab(target) {
  store.removeTab(target)
  // navigate to the new active tab if needed
  if (store.active) {
    router.push(store.active).catch(() => { })
  }
}
</script>

<template>
  <div class="tagsview-wrapper">
    <el-tabs v-model="active" type="card" @tab-remove="removeTab" closable>
      <el-tab-pane v-for="tab in tabs" :key="tab.path" :label="tab.title" :name="tab.path" closable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.tagsview-wrapper {
  background: white;
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
}
</style>
