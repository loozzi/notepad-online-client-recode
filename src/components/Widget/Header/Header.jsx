import {
  faCaretDown,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hook';
import {
  selectCurrentUser,
  selectIsLoggedIn,
} from '../../../components/Layout/Login/authSlice';
import { history } from '../../../utils/history';
import routes from '../../../utils/routes';
import Searchbar from '../Searchbar/Searchbar';
import styles from './Header.module.scss';
import logo from './logo.svg';

const cx = classNames.bind(styles);

function Header(props) {
  const [isShowPopup, setIsShopPopup] = useState(false);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <div className={cx('header')}>
      <NavLink to={`/${routes.HOME}`} className={cx('header-left')}>
        <img src={logo} alt="Logo" className={cx('header-left--icon')} />
        <span className={cx('header-left--text')}>Notepad</span>
      </NavLink>
      <div className={cx('header-main')}>
        <Searchbar />
      </div>
      <div
        onClick={() => {
          isLoggedIn
            ? setIsShopPopup(!isShowPopup)
            : history.push(`/${routes.LOGIN}`);
        }}
        className={cx('header-right')}
      >
        <img
          src={
            !!isLoggedIn
              ? currentUser.avatar
              : 'https://scontent-sin6-2.xx.fbcdn.net/v/t1.6435-9/69592723_103169384397374_3247202782825938944_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=102&ccb=1-7&_nc_sid=110474&efg=eyJpIjoidCJ9&_nc_ohc=ew-BGBkXUFsAX9z0WTP&tn=0CUtA8vGl4__bBek&_nc_ht=scontent-sin6-2.xx&oh=00_AfA3ctGav9c_jWXmxQDu0nZmjZcyHHyrAsM4Zv3piNGkwQ&oe=6418647D'
          }
          alt=""
          className={cx('header-right--img')}
        />
        <span className={cx('header-right--text')}>
          {isLoggedIn ? currentUser.username : 'Login'}
        </span>
        <FontAwesomeIcon
          className={cx('header-right--icon')}
          icon={faCaretDown}
        />

        {isLoggedIn && (
          <div
            className={cx('header-right-dropdown', {
              // 'header-right-dropdown--active': isShowPopup,
            })}
          >
            <NavLink
              to={`/${routes.PROFILE}`}
              className={cx('header-right-dropdown--link')}
            >
              <FontAwesomeIcon
                icon={faUser}
                className={cx('header-right-dropdown--icon')}
              />
              Account
            </NavLink>
            <NavLink
              to={`/${routes.LOGOUT}`}
              className={cx('header-right-dropdown--link')}
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className={cx('header-right-dropdown--icon')}
              />
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
