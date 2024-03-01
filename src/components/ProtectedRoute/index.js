import {Redirect, Route} from 'react-router-dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookie from 'js-cookie'

const ProtectedRoute = props => {
  const token = Cookie.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
