import actionTypes from './user.types'
import initialState from './user.initialState'

const userReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case actionTypes.LOG_IN_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.LOG_IN_SUCCESS:
            return {
                ...state,
                name: payload,
                loggingIn: true,
                isLoading: false,
                isAuthenticated: true
            }
        case actionTypes.LOG_IN_FAILURE:
            return {
                ...state,
                name: null,
                loggingIn: true,
                isLoading: false,
                isAuthenticated: false
            }
        case actionTypes.LOG_OUT:
            return {
                ...state,
                name: null,
                isAuthenticated: false
            }
        case actionTypes.UPDATE:
            return {
                ...state,
                name: payload
            }
        default:
            return state
    }
}

export default userReducer