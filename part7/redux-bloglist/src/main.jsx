import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App'
import './index.css'
import blogReducer from './reducers/blogReducer.js'
import notificationReducer from './reducers/notificationReducer.js'
import userReducer from './reducers/userReducer.js'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notifications: notificationReducer,
    users: userReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
