import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import App from './App'
import store from './store/store'








/* anecdoteService.getAll().then(anecdotes => {
  store.dispatch(setAnecdotes(anecdotes))
}) */

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)