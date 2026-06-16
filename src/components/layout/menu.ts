import {
  Document,
  Grid,
  Key,
  Lock,
  Monitor,
  Setting,
  User,
  UserFilled,
} from '@element-plus/icons-vue'

export interface MenuItem {
  title: string
  to: string
  icon: object
  permission?: string
}

export const menuItems: MenuItem[] = [
  { title: 'Dashboard', to: '/dashboard', icon: Monitor },
  { title: 'User Management', to: '/users', icon: User, permission: 'user.view' },
  { title: 'Role Management', to: '/roles', icon: Lock, permission: 'role.view' },
  { title: 'Permission List', to: '/permissions', icon: Key },
  { title: 'Content Management', to: '/contents', icon: Document, permission: 'content.view' },
  { title: 'Profile', to: '/profile', icon: UserFilled },
  { title: 'Settings', to: '/settings', icon: Setting },
]
