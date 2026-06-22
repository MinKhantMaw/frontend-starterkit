import { ResourceService } from '@/libs/resourceService'

export interface MenuItem {
  id?: number
  client_id: string
  label: string
  url: string
  target?: string
  children: MenuItem[]
}

export interface Menu {
  id: number
  name: string
  location?: string
  items?: MenuItem[]
}

const resource = new ResourceService<Menu, { items: MenuItem[] }>('/menus')

export const menuService = {
  list: () => resource.list({ per_page: 100 }),
  updateItems: (id: number, items: MenuItem[]) => resource.update(id, { items }),
}
