export interface Profile {
  id: number
  name: string
  email: string
  phone?: string
  jobTitle?: string
  avatar_path?: string | null
  avatar_url?: string | null
}

export type ProfilePayload = Omit<Profile, 'id'>

export interface ChangePasswordPayload {
  current_password: string
  password: string
  password_confirmation: string
}
