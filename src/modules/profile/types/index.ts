export interface Profile {
  id: number
  name: string
  email: string
  phone?: string
  jobTitle?: string
}

export type ProfilePayload = Omit<Profile, 'id'>

export interface ChangePasswordPayload {
  current_password: string
  password: string
  password_confirmation: string
}
