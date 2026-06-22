export interface MenuItem { title: string; to: string; icon: string; permission?: string }

export const menuItems: MenuItem[] = [
  { title: 'Dashboard', to: '/dashboard', icon: 'pi pi-home' },
  { title: 'Users', to: '/users', icon: 'pi pi-users', permission: 'user.view' },
  { title: 'Roles', to: '/roles', icon: 'pi pi-shield', permission: 'role.view' },
  { title: 'Permissions', to: '/permissions', icon: 'pi pi-key' },
  { title: 'Pages', to: '/pages', icon: 'pi pi-file', permission: 'page.view' },
  { title: 'Posts', to: '/posts', icon: 'pi pi-pencil', permission: 'post.view' },
  { title: 'Categories', to: '/categories', icon: 'pi pi-sitemap', permission: 'category.view' },
  { title: 'Tags', to: '/tags', icon: 'pi pi-tags', permission: 'tag.view' },
  { title: 'Media Library', to: '/media', icon: 'pi pi-images', permission: 'media.view' },
  { title: 'Menu Builder', to: '/menus', icon: 'pi pi-bars', permission: 'menu.view' },
  { title: 'Messages', to: '/contact-messages', icon: 'pi pi-envelope', permission: 'contact-message.view' },
  { title: 'Notifications', to: '/notifications', icon: 'pi pi-bell' },
  { title: 'Activity Logs', to: '/activity-logs', icon: 'pi pi-history', permission: 'activity-log.view' },
  { title: 'Settings', to: '/settings', icon: 'pi pi-cog', permission: 'setting.view' },
]
