import { PERMISSIONS } from '@/constants/permissions';
export const profileRoutes = [
    { path: 'profile', name: 'profile.detail', component: () => import('@/modules/profile/pages/ProfilePage.vue'), meta: { title: 'Profile', permission: PERMISSIONS.PROFILE_VIEW } },
    { path: 'profile/security', name: 'profile.security', component: () => import('@/modules/profile/pages/ProfileSecurityPage.vue'), meta: { title: 'Profile Security', permission: PERMISSIONS.PROFILE_VIEW } },
];
