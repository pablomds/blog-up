import { Route } from 'react-router'

import PublicLayout from '../Layouts/PublicLayout'
import PrivateLayout from '../Layouts/PrivateLayout'
import LoginPage from '../Pages/Public/LoginPage'
import SignUpPage from '../Pages/Public/SignUpPage'
import PrivatePage from '../Pages/PrivatePage'

export const PublicRoutes = () => {
  return (
    <Route>
      <Route path="/" element={<PublicLayout />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Route>
  )
}

export const PrivateRoutes = () => {
    return (
        <Route path="/private-routes/*" element={<PrivateLayout />}>
          <Route  element={<PrivatePage  />} />
        </Route>
    );
}