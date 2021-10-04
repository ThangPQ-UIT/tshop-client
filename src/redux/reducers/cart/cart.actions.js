import cartType from './cart.type'

const cartAction = {
    addToCart: (data) => {
        return (
            {
                type: cartType.ADD,
                payload: data
            }

        )
    },
    removeToCart: (id, size, color) => {
        return (
            {
                type: cartType.REMOVE,
                payload: {
                    id,
                    size,
                    color
                }
            }
        )
    },
}

export default cartAction