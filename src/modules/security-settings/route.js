import { PERMISSIONS } from '@/constants/permissions';
export const securitySettingsRoutes = [
    {
        path: 'security-settings',
        name: 'security-settings',
        component: () => import('@/modules/security-settings/pages/SecuritySettingsView.vue'),
        meta: { title: 'Security Settings', permission: PERMISSIONS.SECURITY_SETTING_VIEW },
    },
];
