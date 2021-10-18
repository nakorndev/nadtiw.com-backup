export interface AuthData {
  _id: string
  username?: string
  oauth: {
    facebook?: string
    line?: string
    discord?: string
  }
  social?: {
    facebook?: string
  }
  avatarUrl?: string
  fullName?: string
  birthDate?: Date
  gender: 'male' | 'female' | 'none'
  location?: string
  createdAt: Date
  updatedAt: Date
}

interface State {
  data: AuthData | null
  modal: boolean
}

export const state = (): State => ({
  data: null,
  modal: false
})

export const mutations = {
  openModal (state: State) {
    state.modal = true
  },
  closeModal (state: State) {
    state.modal = false
  },
  setData (state: State, data: AuthData) {
    state.data = data
  },
  deleteData (state: State) {
    state.data = null
  }
}
