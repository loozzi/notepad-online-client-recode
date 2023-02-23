import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { authActions } from '../Login/authSlice';
import { selectCurrentUser } from '../Login/authSlice';
import Input from '../../Widget/Input';
import Button from '../../Widget/Button';
import { useEffect, useState } from 'react';
import userApi from '../../../api/userApi';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Account(props) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser) || {
    username: '',
    email: '',
    avatar:
      'https://64.media.tumblr.com/b21486111f59fc337d5aacffb69fd3ad/3e4b9bffcc0b93d5-2b/s640x960/287eadc3a74b892b1d438253fa2a8188e6d6ee49.jpg',
    total: 0,
    roles: [],
  };
  const [email, setEmail] = useState(currentUser.email);
  const [newPassword, setNewPassword] = useState('');
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const handleCallApi = (type, payload) => {
    const ahihi = new Promise(async (resolve, reject) => {
      if (type === 'email') {
        const data = await userApi.changeEmail(payload);
        if (data.code === 200) {
          resolve(data);
        } else {
          reject(data);
        }
      } else if (type === 'avatar') {
        const data = await userApi.changeAvatar(payload);
        if (data.code === 200) {
          resolve(data);
        } else {
          reject(data);
        }
      } else if (type === 'password') {
        const data = await userApi.changePassword(payload);
        if (data.code === 200) {
          resolve(data);
        } else {
          reject(data);
        }
      }
    });

    toast.promise(ahihi, {
      pending: {
        render() {
          return 'Please wait...';
        },
      },
      success: {
        render({ data }) {
          return data.message;
        },
      },
      error: {
        render({ data }) {
          return data.message;
        },
      },
    });
  };

  const handleChangeEmail = () => {
    // getPassword();
    handleCallApi('email', {
      newEmail: email,
    });
  };

  const handleChangeAvatar = () => {
    // getPassword();
    handleCallApi('avatar', { newAvatar: avatar });
  };

  const handleChangePassword = () => {
    const pwd = prompt('Enter your password: ');

    handleCallApi('password', {
      newPassword: newPassword,
      oldPassword: pwd,
    });
  };

  useEffect(() => {
    setEmail(currentUser.email);
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  return (
    <div className={cx('profile')}>
      <div className={cx('profile-wrapper')}>
        <img src={avatar} alt="Avatar" className={cx('profile-img')} />
      </div>
      <div className={cx('profile-wrapper')}>
        <div className={cx('profile-info')}>
          <label>User Information</label>
          <hr />
          <div className={cx('profile-field')}>
            <label>Username</label>
            <Input value={currentUser.username} disabled />
          </div>
          <div className={cx('profile-field')}>
            <label>Total Notes</label>
            <Input value={currentUser.total} disabled />
          </div>
        </div>
        <div className={cx('profile-input')}>
          <label>User Edit</label>
          <hr />
          <div className={cx('profile-field')}>
            <label>Email</label>
            <Input
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Button label="Change Email" primary onClick={handleChangeEmail} />
          </div>
          <div className={cx('profile-field')}>
            <label>Avatar URL</label>
            <Input
              placeholder="Avatar URL..."
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            <Button
              label="Change Avatar"
              primary
              onClick={handleChangeAvatar}
            />
          </div>
          <div className={cx('profile-field')}>
            <label>New Password</label>
            <Input
              placeholder="Enter new password..."
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              label="Change Password"
              primary
              onClick={handleChangePassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
