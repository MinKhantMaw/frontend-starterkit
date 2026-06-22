import { ResourceService } from '@/libs/resourceService'

export interface Media {
  id: number
  name?: string
  file_name?: string
  url?: string
  path?: string
  mime_type?: string
  size?: number
}

const resource = new ResourceService<Media, FormData>('/media')

export const mediaService = {
  list: () => resource.list({ per_page: 100 }),
  upload: (data: FormData) => resource.create(data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id: number) => resource.remove(id),
}
