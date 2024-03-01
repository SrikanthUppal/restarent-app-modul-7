import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <p className="m-0 cart-count">{cartList.length}</p>
            ) : (
              0
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  const renderCartIcon = () => (
    <div className="cart-icon-link">
      <Link to="/cart">
        <button type="button" className="cart-icon-button">
          <AiOutlineShoppingCart data-testid="cart" className="cart-icon" />
        </button>
      </Link>
      <div className="cart-count-badge d-flex justify-content-center align-items-center">
        {renderCartItemsCount()}
      </div>
    </div>
  )

  return (
    <nav className="p-4 d-flex flex-row align-items-center nav-header">
      <Link to="/">
        <h1 className="m-0 logo-heading">UNI Resto Cafe</h1>
      </Link>
      <div className="d-flex flex-row align-items-center ms-auto">
        <p className="mt-0 mb-0 me-2 d-none d-sm-block my-orders-text">
          My Orders
        </p>
        <button
          type="button"
          className="btn btn-outline-danger ms-2 me-2 btn-sm"
          onClick={onLogout}
        >
          Logout
        </button>
        {renderCartIcon()}
      </div>
    </nav>
  )
}

export default withRouter(Header)
