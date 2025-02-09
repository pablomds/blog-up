import React, { ReactNode } from 'react'
import { Outlet } from 'react-router'

interface IPrivateLayout {
    children?: ReactNode,
    currentUser?: any | undefined
}

const PrivateLayout: React.FC<IPrivateLayout> = (props) => {
  return (
    <div>{props.children ? props.children : <Outlet />}</div>
  )
};

export default PrivateLayout