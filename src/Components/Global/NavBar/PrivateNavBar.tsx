import React from 'react';

import MobilePrivateNavBar from './MobilePrivateNavBar';
import DesktopPrivateSideBar from './DesktopPrivateSideBar';

const PrivateNavBar = () => {
  return (
    <>
      <DesktopPrivateSideBar />
      <MobilePrivateNavBar />
    </>
  );
}

export default PrivateNavBar