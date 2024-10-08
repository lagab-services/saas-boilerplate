import { DateTime } from 'luxon'
export interface RegisterRequest {
  email: string
  password: string
  fullName?: string
}

export interface RegisterResponseBody {
  fullName: string
  email: string
  createdAt: DateTime | null
  updatedAt: DateTime | null
  id: number
}
