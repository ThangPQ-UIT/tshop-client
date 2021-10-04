import React from 'react'

import {
    Route,
    Redirect
} from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoute({ component: Component, ...rest }) {

    const { isAuthenticated } = useSelector(state => state.user)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}
export default ProtectedRoute