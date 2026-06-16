<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ status?: string | null }>();

const map: Record<string, "success" | "warning" | "info" | "danger"> = {
  active: "success",
  inactive: "info",
  published: "success",
  draft: "warning",
  archived: "info",
};

const statusType = computed(() => map[props.status ?? ""] || "info");
const statusLabel = computed(() => props.status ?? "Unknown");
</script>

<template>
  <el-tag :type="statusType" effect="light" round>
    {{ statusLabel }}
  </el-tag>
</template>
