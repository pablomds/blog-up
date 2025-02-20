import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";

import PrivateNavBar from "@/Components/Global/NavBar/PrivateNavBar";

interface IPrivateLayout {
  children?: ReactNode;
  currentUser?: any | null;
}

const PrivateLayout: React.FC<IPrivateLayout> = (props) => {
  if (!props.currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="relative min-h-screen w-full flex">
      <div className="md:w-1/12">
        <PrivateNavBar />
      </div>
      <div className="w-full md:w-11/12 ">
        {props.children ? props.children : <Outlet />}
      </div>
    </div>
  );
};

export default PrivateLayout;
