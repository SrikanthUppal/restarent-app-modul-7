import {GrSquare} from 'react-icons/gr'
import './index.css'

const Dishes = props => {
  const {details, cartItems, decrementQuantity, incrementQuantity} = props
  const {
    dishType,
    dishImage,
    dishName,
    dishCurrency,
    dishPrice,
    dishDescription,
    dishAvailability,
    addOnCat,
    dishCalories,
    dishId,
  } = details

  const onDecrementQuantity = () => decrementQuantity(details)

  const onIncrementQuantity = () => incrementQuantity(details)

  const getQuantity = () => {
    const cartItem = cartItems.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  return (
    <li className="dish-list-item">
      <div className="dish-type-container">
        {dishType % 2 === 0 ? (
          <GrSquare size={35} color="green" />
        ) : (
          <GrSquare size={35} color="red" />
        )}
      </div>
      <div className="dish-info-container">
        <h1 className="dishName">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability === true ? (
          <div className="availability">
            <button
              type="button"
              className="buttons"
              onClick={onDecrementQuantity}
            >
              -
            </button>
            <p className="quantity">{getQuantity()}</p>
            <button
              type="button"
              className="buttons"
              onClick={onIncrementQuantity}
            >
              +
            </button>
          </div>
        ) : (
          <p className="not-available">Not available</p>
        )}
        {addOnCat.length !== 0 && (
          <p className="customization">Customizations available</p>
        )}
      </div>
      <div className="calories-container">
        <p className="calories">{dishCalories} Calories</p>
      </div>
      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}

export default Dishes
