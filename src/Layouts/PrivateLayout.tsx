import React, { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router';
import PrivateNavBar from '../Components/Global/NavBar/PrivateNavBar';

interface IPrivateLayout {
    children?: ReactNode,
    currentUser?: any | null
}

const PrivateLayout: React.FC<IPrivateLayout> = (props) => {

  if (!props.currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="relative h-screen w-screen mx-auto px-6 pt-20 md:pl-40 md:pr-40 lg:pr-64 xl:pr-[30rem] 2xl:pr-[50rem] md:pt-12">
      <PrivateNavBar />
      {props.children ? props.children : <Outlet />}
    </div>
  )
};

export default PrivateLayout