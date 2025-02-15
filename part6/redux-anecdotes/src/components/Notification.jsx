import { useEffect } from 'react'
import { useDispatchNotification, useNotification } from '../AnecdoteContext'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatchNotification()
  const notification = useNotification()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  useEffect(() => {
    if (notification) {
      const timer = 5
      dispatch(setNotificationWithTimeout(notification, timer))
    }
  }, [notification, dispatch])

  if (!notification) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
