import { ResourceService } from '@/libs/resourceService'
export interface Taxonomy { id: number; name: string; slug?: string; parent_id?: number | null; children?: Taxonomy[]; posts_count?: number }
export const categoriesService = new ResourceService<Taxonomy, object>('/categories')
export const tagsService = new ResourceService<Taxonomy, object>('/tags')
