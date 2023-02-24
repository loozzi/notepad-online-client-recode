import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hook';
import { authActions } from '../Layout/Login/authSlice';
import { history } from '../../utils/history';
import routes from '../../utils/routes';
import { toast } from 'react-toastify';

function Logout(props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.removeItem('refreshToken');
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    dispatch(authActions.logout());
    setTimeout(() => {
      history.push(`/${routes.LOGIN}`);
    }, 3000);
  }, []);
  return <div>Redirect to login page...</div>;
}

export default Logout;
