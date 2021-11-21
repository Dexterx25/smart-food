import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer, getStoredState } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from '../reducers'
import { createOffline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import { composeWithDevTools } from 'redux-devtools-extension'

console.disableYellowBox = true

const logger = createLogger({
  duration: true,
  collapsed: true
})

const persistConfig = {
  key: 'root',
  storage,
  timeout: null,
  whitelist: ['auth', 'notifications', 'language']
}

const {
  middleware: offlineMiddleware,
  enhanceReducer: offlineEnhanceReducer,
  enhanceStore: offlineEnhanceStore
} = createOffline({
  ...offlineConfig,
  persist: false
})

const persistedReducer = persistReducer(
  persistConfig,
  offlineEnhanceReducer(reducers)
)
let middlewares = []

if (process.env.NODE_ENV === 'development') {
  middlewares = [thunk, promiseMiddleware(), logger]
} else {
  middlewares = [thunk, promiseMiddleware()]
}

export default function configureStore () {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(
      offlineEnhanceStore,
      applyMiddleware(...middlewares, offlineMiddleware)
    )
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
