interface State {
  data: Object | null
}

export const state = (): State => ({
  data: null
})

export const mutations = {
  setData (state: State, data) {
    state.data = data
  },
  deleteData (state: State) {
    state.data = null
  }
}
