import { Route } from 'react-router'

import PublicLayout from '../Layouts/PublicLayout'
import PrivateLayout from '../Layouts/PrivateLayout'
import PrivatePage from '../Pages/PrivatePage'

export const PublicRoutes = () => {
  return (
    <Route path="/*" element={<PublicLayout />}></Route>
  )
}

export const PrivateRoutes = () => {
    return (
        <Route path="/private-routes/*" element={<PrivateLayout />}>
          <Route  element={<PrivatePage  />} />
        </Route>
    );
}