import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    createNotification(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type
      }
    },
    clearNotification(state, action) {
      return {
        message: null,
        type: ''
      }
    }
  }
})

export const { createNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
