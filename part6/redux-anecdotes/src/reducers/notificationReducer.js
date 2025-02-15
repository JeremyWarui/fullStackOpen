import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => ''

  }
})

export const setNotificationWithTimeout = (message, timer) => {
  return (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timer * 1000)
    return () => clearTimeout()
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
