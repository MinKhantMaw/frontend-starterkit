<script setup>
import Paginator from 'primevue/paginator'

const props = defineProps({
  page: { type: Number, default: 1 },
  perPage: { type: Number, default: 15 },
  total: { type: Number, default: 0 },
})

const emit = defineEmits(['change'])

function onPage(event) {
  emit('change', { page: event.page + 1, perPage: event.rows })
}
</script>

<template>
  <div class="mt-4 flex justify-end">
    <Paginator
      :first="(props.page - 1) * props.perPage"
      :rows="props.perPage"
      :total-records="props.total"
      :rows-per-page-options="[15, 25, 50]"
      @page="onPage"
    />
  </div>
</template>
