import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Searchbar.module.scss';

const cx = classNames.bind(styles);

function Searchbar(props) {
  const [searchInput, setSearchInput] = useState('');

  const onChangeSearchInput = (value) => {
    setSearchInput(value.trim());
  };

  return (
    <div className={cx('searchbar')}>
      <div className={cx('searchbar-top')}>
        <FontAwesomeIcon
          className={cx('searchbar-icon')}
          icon={faMagnifyingGlass}
        />
        <input
          type="text"
          placeholder="Search..."
          className={cx('searchbar-input')}
          onChange={(e) => onChangeSearchInput(e.target.value)}
        />
      </div>
      {searchInput.length > 0 && (
        <div className={cx('searchbar-content')}></div>
      )}
    </div>
  );
}

export default Searchbar;
