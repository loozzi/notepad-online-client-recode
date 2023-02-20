import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../Widget/Button/Button';
import Input from '../../Widget/Input';
import styles from './Login.module.scss';
import routes from '../../../utils/routes';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { authActions, selectIsLogging } from './authSlice';
import { toast } from 'react-toastify';
import userApi from '../../../api/userApi';

const cx = classNames.bind(styles);

function Login(props) {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const isLogingIn = useAppSelector(selectIsLogging);

  const dispatch = useAppDispatch();

  const toggleLoginForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const onchangeUsername = (event) => {
    setUsername(event.target.value.trim());
  };

  const onchangePassword = (event) => {
    setPassword(event.target.value.trim());
  };

  const onchangeEmail = (event) => {
    setEmail(event.target.value.trim());
  };

  const handleSignInClick = () => {
    const payload = {
      username: username.trim(),
      password: password.trim(),
    };
    const action = authActions.login(payload);
    dispatch(action);
  };

  const handleSignUpClick = () => {
    let check = true;
    if (password.length < 6) {
      toast.warning(`Passwords must be at least 6 characters`);
      check = false;
    }

    if (
      email.trim().length === 0 ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      toast.warning(`Invalid email`);
      check = false;
    }

    if (username.length === 0) {
      toast.warning(`Username is empty`);
      check = false;
    }

    if (check) {
      const ahihi = new Promise(async (resolve, reject) => {
        const resData = await userApi.register({
          username: username.trim(),
          password: password.trim(),
          email: email.trim(),
        });
        if (resData.code === 200) resolve(resData);
        else reject(resData);
      });

      toast.promise(ahihi, {
        pending: {
          render() {
            return 'Please wait...';
          },
        },
        success: {
          render({ data }) {
            const payload = {
              username: username.trim(),
              password: password.trim(),
            };
            const action = authActions.login(payload);
            dispatch(action);
            return data.message;
          },
        },
        error: {
          render({ data }) {
            return data.message;
          },
        },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginForm) handleSignInClick();
    else handleSignUpClick();
  };

  useEffect(() => {
    if (isLoginForm) document.title = 'Sign In';
    else document.title = 'Sign Up';
  }, [isLoginForm]);

  return (
    <div className={cx('login')}>
      <div className={cx('login-header')}>
        <span>{isLoginForm ? 'Sign In' : 'Sign Up'}</span>
      </div>
      <form onSubmit={handleSubmit} className={cx('login-body')}>
        {!isLoginForm && (
          <Input
            type="email"
            value={email}
            required
            placeholder="Enter your email..."
            onChange={(e) => onchangeEmail(e)}
          />
        )}
        <Input
          type="text"
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => onchangeUsername(e)}
        />
        <Input
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => onchangePassword(e)}
        />
        <Button
          label={isLoginForm ? 'Sign In' : 'Sign Up'}
          type="submit"
          primary
          w100
        />
        {isLoginForm && (
          <NavLink to={routes.FORGOT_PASSWORD} className={cx('login-link')}>
            Forgot your password?
          </NavLink>
        )}
      </form>
      <div className={cx('login-footer')}>
        <span>
          {isLoginForm ? "Don't have an account?" : 'Have an account?'}
        </span>
        <Button
          label={isLoginForm ? 'Create new account' : 'Login here'}
          w100
          onClick={toggleLoginForm}
        />
      </div>
    </div>
  );
}

export default Login;
