import actionType from './cart.type'
import initialState from './cart.initialState'

const cartReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case actionType.ADD:
            {
                const { id, quantity, color, size } = payload
                const sameItemsArray = state.filter(item => item.id === id)

                // check to avoid duplicate item in the cart
                let newList

                const checkColorAndSizeExist = sameItemsArray.find(item => item.color === color && item.size === size)
                if (checkColorAndSizeExist) {
                    if (quantity !== checkColorAndSizeExist.quantity) {
                        newList = state.map(item => {
                            const newItem = item.quantity === quantity
                            return newItem
                        })
                    }
                    return state
                } else {
                    newList = [
                        ...state,
                        {
                            id,
                            color,
                            size,
                            quantity
                        }
                    ]
                }

                return newList
            }
        case actionType.REMOVE:
            {
                const { id, color, size } = payload

                const newList = state.filter(item => {
                    return !(item.id === id && item.size === size && item.color === color)
                })

                return newList
            }
        default:
            return state
    }
}

export default cartReducer