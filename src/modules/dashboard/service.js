export const dashboardService = {
  async overview() {
    return {
      metrics: [
        { label: 'Total Users', value: 128, icon: 'pi pi-users' },
        { label: 'Total Roles', value: 6, icon: 'pi pi-shield' },
        { label: 'Total Permissions', value: 24, icon: 'pi pi-key' },
      ],
    }
  },
}
