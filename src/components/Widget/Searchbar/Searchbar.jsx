import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Searchbar.module.scss';
import noteApi from '../../../api/noteApi';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function Searchbar(props) {
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState(undefined);

  const onChangeSearchInput = (value) => {
    setSearchInput(value.trim());
  };

  useEffect(() => {
    let timeId;
    const timeOut = !!searchInput.trim() ? 500 : 0;
    const fetch = async () => {
      const data = await noteApi.search({
        q: searchInput,
      });

      setData(data.elements);
      console.log(data);
    };

    timeId = setTimeout(() => {
      fetch();
    }, timeOut);
    return () => clearTimeout(timeId);
  }, [searchInput]);

  return (
    <>
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
      </div>
      {!!data && (
        <div className={cx('searchbar-content')}>
          {data?.byTitles.length === 0 && data?.byTags.length === 0 ? (
            'Not found'
          ) : (
            <>
              <label className={cx('wrapper-label')}>Titles</label>
              <hr />
              <div className={cx('wrapper')}>
                {data?.byTitles.length === 0 ? (
                  'Empty'
                ) : (
                  <>
                    {data?.byTitles.map((item, idx) => (
                      <NavLink
                        to={`/view/${item?.permalink}`}
                        className={cx('item')}
                        key={idx}
                      >
                        <p>Title: {item.title}</p>
                        <p>Username: {item.username}</p>
                        <p>Views: {item.view}</p>
                      </NavLink>
                    ))}
                  </>
                )}
              </div>
              <label className={cx('wrapper-label')}>Category</label>
              <hr />
              <div className={cx('wrapper')}>
                {data?.byTags.length === 0 ? (
                  'Empty'
                ) : (
                  <>
                    {data?.byTags.map((item, idx) => (
                      <NavLink
                        to={`/view/${item?.permalink}`}
                        className={cx('item')}
                        key={idx}
                      >
                        <p>Title: {item.title}</p>
                        <p>Username: {item.username}</p>
                        <p>Views: {item.view}</p>
                      </NavLink>
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Searchbar;
