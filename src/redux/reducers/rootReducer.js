import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'
import cartReducder from './cart/cart.reducer'
import toastReducer from './toasts/toast.reducer'
import cartNotificationReducer from './cartNotification/cartNotification.reducer'

const rootReducer = () =>
    combineReducers({
        user: userReducer,
        cart: cartReducder,
        toasts: toastReducer,
        cartNotification: cartNotificationReducer
    })

export default rootReducer