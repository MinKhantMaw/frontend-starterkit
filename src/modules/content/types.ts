export interface CmsContent {
  id: number
  title: string
  slug: string
  excerpt?: string
  body?: string
  status: 'draft' | 'published' | 'archived'
  category_id?: number | null
  category?: { id: number; name: string }
  tags?: Array<{ id: number; name: string }>
  featured_image?: string | null
  meta_title?: string
  meta_description?: string
  created_at?: string
  updated_at?: string
}
