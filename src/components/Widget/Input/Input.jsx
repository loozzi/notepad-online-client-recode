import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input(props) {
  return <input {...props} className={cx('input')} />;
}

export default Input;
