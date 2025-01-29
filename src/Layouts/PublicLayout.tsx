import React, { ReactNode } from 'react'
import { Outlet } from 'react-router'

interface IPublicLayout {
    children?: ReactNode
}

const PublicLayout = (props: IPublicLayout) => {
  return <>{props.children ? props.children : <Outlet />}</>;
};

export default PublicLayout