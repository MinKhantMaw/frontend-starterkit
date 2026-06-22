import { ResourceService } from '@/libs/resourceService'
import type { CmsContent } from './types'
export const pagesService = new ResourceService<CmsContent, object>('/pages')
export const postsService = new ResourceService<CmsContent, object>('/posts')
