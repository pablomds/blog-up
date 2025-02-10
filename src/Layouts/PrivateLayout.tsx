import React, { ReactNode, useEffect } from 'react'
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import PrivateNavBar from '../Components/Global/NavBar/PrivateNavBar';

interface IPrivateLayout {
    children?: ReactNode,
    currentUser?: any | null
}

const PrivateLayout: React.FC<IPrivateLayout> = (props) => {
  // const navigate = useNavigate();
  // navigate("/login");

  // useEffect(() => {
  //   // Redirect if no currentUser
  //   if (!props.currentUser) {
  //     navigate("/login");
  //   }
  // }, [props.currentUser, navigate]); // Run effect when currentUser changes

  return (
    <div className="relative h-screen w-screen mx-auto px-6 pt-20 md:pl-40 md:pr-40 lg:pr-64 xl:pr-96 md:pt-12">
      <PrivateNavBar />
      {props.children ? props.children : <Outlet />}
    </div>
  )
};

export default PrivateLayout