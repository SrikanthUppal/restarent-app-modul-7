import {useState, useEffect} from 'react'
import Header from '../Header'
import Dishes from '../Dishes'

import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [cartItems, setCartItems] = useState([])

  const getUpdatedData = menuList =>
    menuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachOne => ({
        addOnCat: eachOne.addonCat,
        dishAvailability: eachOne.dish_Availability,
        dishType: eachOne.dish_Type,
        dishCalories: eachOne.dish_calories,
        dishCurrency: eachOne.dish_currency,
        dishDescription: eachOne.dish_description,
        dishId: eachOne.dish_id,
        dishImage: eachOne.dish_image,
        dishName: eachOne.dish_name,
        dishPrice: eachOne.dish_price,
      })),
    }))

  const fetchRestraintApi = async () => {
    const api = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()
    // console.log(data)
    const updatedData = getUpdatedData(data[0].table_menu_list)
    // console.log(updatedData)
    setResponse(updatedData)
    setActiveCategoryId(updatedData[0].menuCategoryId)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRestraintApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const incrementQuantity = dish => {
    const isAlreadyIn = cartItems.find(item => item.dishId === dish.dishId)
    if (!isAlreadyIn) {
      const newDish = {...dish, quantity: 1}
      setCartItems(prev => [...prev, newDish])
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    }
  }

  const decrementQuantity = dish => {
    const isAlreadyIn = cartItems.find(item => item.dishId === dish.dishId)
    if (isAlreadyIn) {
      setCartItems(prev =>
        prev
          .map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      )
    }
  }

  const renderDishItems = () => {
    const {categoryDishes} = response.find(
      each => each.menuCategoryId === activeCategoryId,
    )
    return (
      <ul className="dish-list">
        {categoryDishes.map(each => (
          <Dishes
            key={each.dishId}
            details={each}
            cartItems={cartItems}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        ))}
      </ul>
    )
  }

  const onUpdateActiveCategoryId = menuCategoryId =>
    setActiveCategoryId(menuCategoryId)

  const renderTabMenuList = () =>
    response.map(eachCategory => {
      const onClickTab = () =>
        onUpdateActiveCategoryId(eachCategory.menuCategoryId)
      return (
        <li
          className={`each-tab ${
            eachCategory.menuCategoryId === activeCategoryId ? 'active-tab' : ''
          }`}
          key={eachCategory.menuCategoryId}
          onClick={onClickTab}
        >
          <button type="button" className="button">
            {eachCategory.menuCategory}
          </button>
        </li>
      )
    })

  const renderSpinner = () => (
    <div className="spinner-container">
      <div className="spinner-border" role="status" />
    </div>
  )

  return isLoading ? (
    renderSpinner()
  ) : (
    <div>
      <Header cartItems={cartItems} />
      <ul className="menu-category-list">{renderTabMenuList()}</ul>
      {renderDishItems()}
    </div>
  )
}

export default Home
