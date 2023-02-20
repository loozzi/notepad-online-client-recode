import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { history } from '../../utils/history';
import routes from '../../utils/routes';
import Header from '../Widget/Header/Header';
import Sidebar from '../Widget/Sidebar/Sidebar';

function Private(props) {
  const isLoggedIn = localStorage.getItem('refreshToken');

  useEffect(() => {
    if (!isLoggedIn) {
      history.push(`/${routes.LOGIN}`);
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', paddingTop: 'var(--header-height)' }}>
        <Sidebar />
        <div
          style={{
            marginLeft: 'var(--sidebar-width)',
            width: 'calc(100vw - var(--sidebar-width))',
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

Private.propTypes = {};

export default Private;
