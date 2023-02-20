import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button(props) {
  const { label, primary, w100, ..._props } = props;
  return (
    <button
      className={cx('button', {
        button__primary: primary,
        button__w100: w100,
      })}
      {..._props}
    >
      {label}
    </button>
  );
}

Button.propTypes = {};

export default Button;
