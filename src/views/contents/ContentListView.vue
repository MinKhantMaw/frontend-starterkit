<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { Delete, Edit, Plus, View } from "@element-plus/icons-vue";
import PageHeader from "@/components/common/PageHeader.vue";
import BaseTable from "@/components/common/BaseTable.vue";
import BasePagination from "@/components/common/BasePagination.vue";
import StatusBadge from "@/components/common/StatusBadge.vue";
import PermissionGuard from "@/components/common/PermissionGuard.vue";
import { useContentStore } from "@/stores/contents";

const contents = useContentStore();
const filters = reactive({
  page: 1,
  search: "",
  status: "",
  date_from: "",
  date_to: "",
});
const contentItems = computed(() => contents.contents ?? []);

async function load(page = 1) {
  filters.page = page;
  await contents.fetchContents(filters);
}

async function deleteContent(id: number) {
  await contents.deleteContent(id);
  await load(filters.page);
}

async function togglePublish(id: number, status: string) {
  if (status === "published") {
    await contents.unpublishContent(id);
  } else {
    await contents.publishContent(id);
  }
  await load(filters.page);
}

onMounted(() => load());
</script>

<template>
  <PageHeader
    title="Content Management"
    description="Create, filter, publish, archive, and maintain CMS content."
  >
    <template #actions>
      <PermissionGuard permission="content.create">
        <RouterLink to="/contents/create"
          ><el-button type="primary" :icon="Plus"
            >Create content</el-button
          ></RouterLink
        >
      </PermissionGuard>
    </template>
  </PageHeader>

  <BaseTable
    :data="contentItems"
    :loading="contents.loading"
    empty-text="No contents match your filters"
  >
    <template #filters>
      <div class="grid gap-3 md:grid-cols-5">
        <el-input
          v-model="filters.search"
          clearable
          placeholder="Search content"
          @keyup.enter="load()"
        />
        <el-select v-model="filters.status" clearable placeholder="Status">
          <el-option label="Draft" value="draft" />
          <el-option label="Published" value="published" />
          <el-option label="Archived" value="archived" />
        </el-select>
        <el-date-picker
          v-model="filters.date_from"
          value-format="YYYY-MM-DD"
          placeholder="From date"
        />
        <el-date-picker
          v-model="filters.date_to"
          value-format="YYYY-MM-DD"
          placeholder="To date"
        />
        <el-button type="primary" @click="load()">Filter</el-button>
      </div>
    </template>
    <el-table-column prop="title" label="Title" min-width="220" />
    <el-table-column prop="slug" label="Slug" min-width="180" />
    <el-table-column label="Status" width="130">
      <template #default="{ row }"
        ><StatusBadge :status="row.status"
      /></template>
    </el-table-column>
    <el-table-column prop="published_at" label="Published" width="180" />
    <el-table-column label="Actions" width="270" fixed="right">
      <template #default="{ row }">
        <div class="flex flex-wrap gap-1">
          <RouterLink :to="`/contents/${row.id}`"
            ><el-button :icon="View" text
          /></RouterLink>
          <PermissionGuard permission="content.update">
            <RouterLink :to="`/contents/${row.id}/edit`"
              ><el-button :icon="Edit" text
            /></RouterLink>
          </PermissionGuard>
          <PermissionGuard permission="content.publish">
            <el-button text @click="togglePublish(row.id, row.status)">{{
              row.status === "published" ? "Unpublish" : "Publish"
            }}</el-button>
          </PermissionGuard>
          <PermissionGuard permission="content.delete">
            <el-popconfirm
              title="Delete this content?"
              confirm-button-text="Delete"
              @confirm="deleteContent(row.id)"
            >
              <template #reference
                ><el-button :icon="Delete" text type="danger"
              /></template>
            </el-popconfirm>
          </PermissionGuard>
        </div>
      </template>
    </el-table-column>
  </BaseTable>
  <BasePagination :meta="contents.meta" @change="load" />
</template>
