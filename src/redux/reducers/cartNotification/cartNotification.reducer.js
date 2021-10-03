import actionType from './cartNotification.type'
import initialState from './cartNotification.initialState'

const cartNotificationReducer = (state = initialState, type) => {
    switch (type) {
        case actionType.OPEN:
            {
                return {
                    isShow: true
                }
            }
        case actionType.CLOSE:
            {
                return {
                    isShow: false
                }
            }
        default:
            return state
    }
}

export default cartNotificationReducer