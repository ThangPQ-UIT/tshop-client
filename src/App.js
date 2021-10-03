import React, { useEffect } from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Routes from 'routes/routes'

import Toast from 'components/toast/toast'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'

import cartAction from 'redux/reducers/cart/cart.actions'
// import cartNotificationAction from 'redux/reducers/cartNotification/cartNotification.actions'

function App() {

  const toasts = useSelector(state => state.toasts)
  const cartNotification = useSelector(state => state.cartNotification)
  const { isShow } = cartNotification

  const dispatch = useDispatch()

  const closeCartNotification = () => {
    // dispatch(cartNotificationAction.close)
  }

  return (
    <Router>
      {/* <Toast component */}
      <div className="App" style={{
        overflow: 'hidden',
        backgroundColor: 'var(--main-bg)'
      }}>
        <div className='position-fixed' style={{
          right: '10px',
          zIndex: '5'
        }}>
          {
            toasts.length > 0 && toasts.map((toast, index) =>
              <React.Fragment key={toast.id}>
                <Toast type={toast.type} message={toast.message} id={toast.id} order={index} />
              </React.Fragment>)
          }
        </div>
        {/* /> */}
        {/* <Cart notification */}
        {
          isShow && (
            <div className='position-absolute d-flex flex-column justify-content-between' style={{
              top: '0px',
              right: '0px',
              height: '100vh',
              backgroundColor: 'red',
              width: '25%',
              zIndex: '4',
              padding: '50px 20px 30px 20px'
            }}>
              <div className='d-flex justify-content-between' style={{
                backgroundColor: 'green'
              }}>
                <span>Your cart</span>
                <button onClick={closeCartNotification}>X</button>
              </div>
              <div className='my-3' style={{
                backgroundColor: 'yellow',
                flexGrow: '1'
              }}>Total</div>
              <div className='d-flex justify-content-between'>
                <button>View cart</button>
                <button>Check out</button>
              </div>
            </div>
          )
        }
        {/* /> */}
        <Header />
        <Routes />
        <Footer />
      </div>
    </Router>
  )
}

export default App
