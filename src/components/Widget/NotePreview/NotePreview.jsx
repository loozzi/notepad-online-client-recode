import classNames from 'classnames/bind';
import styles from './NotePreview.module.scss';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import noteApi from '../../../api/noteApi';
import { useState } from 'react';

const cx = classNames.bind(styles);

function NotePreview(props) {
  const { data } = props;
  const [isDeleted, setIsDeleted] = useState(false);

  const reFormatTime = (time) => {
    let date = new Date(time);

    let h = date.getHours();
    let m = date.getMinutes();
    let d = date.getDay();
    let _m = date.getMonth();
    let y = date.getFullYear();

    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (d < 10) d = '0' + d;
    if (_m < 10) _m = '0' + _m;

    return `${h}:${m} ${d}/${_m}/${y}`;
  };

  const reFomatDataBody = (str) => {
    return str.split(' ').slice(0, 100).join(' ') + '...';
  };

  const handleDeleteClick = () => {
    let password = '';
    if (data.isProtected) {
      password = prompt('Note password?');
    }

    const fetchDelete = async () => {
      const resData = await noteApi.delete({
        permalink: data.permalink,
        password: password.trim(),
      });

      if (resData.code === 200) {
        toast.success(resData.message);
        setIsDeleted(true);
      } else {
        toast.error(resData.message);
      }
    };

    fetchDelete();
  };

  if (!isDeleted) {
    return (
      <div className={cx('note-preview')}>
        <div className={cx('note-preview-header')}>
          <NavLink to={`/view/${data.permalink}`}>{data.title}</NavLink>
        </div>
        <div className={cx('note-preview-body')}>
          <span>{reFomatDataBody(data.body)}</span>
        </div>
        <div className={cx('note-preview-footer')}>
          <div className={cx('note-preview-footer-wrapper')}>
            {reFormatTime(data.created_at)} - {data.view} views
          </div>
          <div className={cx('note-preview-footer-wrapper')}>
            <div
              className={cx('note-preview-footer--link')}
              onClick={handleDeleteClick}
            >
              Delete
            </div>
            <NavLink
              to={`/edit/${data.permalink}`}
              className={cx('note-preview-footer--link')}
            >
              Edit
            </NavLink>
            <NavLink
              to={`/view/${data.permalink}`}
              className={cx('note-preview-footer--link')}
            >
              See more
            </NavLink>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default NotePreview;
