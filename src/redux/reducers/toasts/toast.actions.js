import actionType from './toast.type'

const hideToast = (id) => {
    return {
        type: actionType.HIDE_TOAST,
        payload: id
    }
}

const addToast = (data) => {
    console.log('data: ', data)
    return {
        type: actionType.ADD_TOAST,
        payload: data
    }
}

export {
    hideToast,
    addToast
}