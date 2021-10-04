import cartNotificationType from './cartNotification.type'

const cartNotificationAction = {
    open: () => {
        return (
            {
                type: cartNotificationType.OPEN,
            }

        )
    },
    close: () => {
        return (
            {
                type: cartNotificationType.CLOSE
            }
        )
    },
}

export default cartNotificationAction