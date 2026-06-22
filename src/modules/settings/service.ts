import api from '@/libs/http'

export interface SettingsPayload {
  site_name: string
  site_url: string
  site_email: string
  site_description: string
  facebook_url: string
  instagram_url: string
  linkedin_url: string
  x_url: string
  logo_url: string
  favicon_url: string
}

export const settingsService = {
  async get(): Promise<SettingsPayload> {
    const { data } = await api.get('/settings')
    return data.data ?? data
  },
  update(payload: SettingsPayload, logo?: File, favicon?: File) {
    const data = new FormData()
    Object.entries(payload).forEach(([key, value]) => data.append(key, String(value ?? '')))
    if (logo) data.append('logo', logo)
    if (favicon) data.append('favicon', favicon)
    data.append('_method', 'PUT')
    return api.post('/settings', data)
  },
}
