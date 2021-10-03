import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'remote-redux-devtools'
import { persistStore, persistReducer } from 'redux-persist'

import rootReducer from '../reducers/rootReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'cart'],
    blaclist: ['user.message']
}

const persistedReducer = persistReducer(persistConfig, rootReducer())

const configureStore = () => {
    // const middleware = [thunk, logger]
    const middleware = [thunk]
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools
    const enhancers = composeEnhancers(applyMiddleware(...middleware))
    const store = createStore(persistedReducer, enhancers)
    let persistor = persistStore(store)

    return { store, persistor }
}

export default configureStore