import actionType from './toast.type'
import initialState from './toast.initialState'

const nextToastId = (toasts) => {
    const maxId = toasts.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

const toastReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case actionType.HIDE_TOAST:
            return state.filter((toast) => toast.id !== payload)
        case actionType.ADD_TOAST:
            // eslint-disable-next-line no-case-declarations
            const isExist = state.find(toast => {
                return toast.message === payload.message
            })
            console.log('addtoast')
            if (isExist) {
                console.log('here')
                return state
            }
            return [
                ...state,
                {
                    id: nextToastId(state),
                    type: payload.type,
                    message: payload.message
                }
            ]
        default:
            return state
    }
}

export default toastReducer