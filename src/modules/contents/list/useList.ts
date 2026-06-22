import { computed, onMounted, reactive } from "vue";
import { useContentStore } from "@/modules/contents/store";

export function useList() {
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

  return { contents, filters, contentItems, load, deleteContent, togglePublish }
}
