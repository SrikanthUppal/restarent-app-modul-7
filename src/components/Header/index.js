import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {cartItems} = props
  return (
    <nav className="nav-bar">
      <h1 className="restaurant-name">UNI Resto Cafe</h1>
      <div className="button-container">
        <p className="my-order">My Orders</p>
        <div type="button" className="cart-button">
          <AiOutlineShoppingCart />
          <p className="count">{cartItems.length}</p>
        </div>
      </div>
    </nav>
  )
}

export default Header
