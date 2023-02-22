import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import NotePopupButton from '../NotePopupButton';
import styles from './Panel.module.scss';

const cx = classNames.bind(styles);

const reFormatTime = (time) => {
  const date = new Date(time);
  let diff = (Date.now() - date) / 1000 / 3600;
  if (diff < 1) {
    diff = diff * 60;
    diff = Math.floor(diff);
    return `${diff} minutes ago`;
  } else if (diff < 24) {
    diff = Math.floor(diff);
    return `${diff} hours ago`;
  } else if (diff <= 24 * 7) {
    diff = Math.floor(diff / 7);
    return `${diff} days ago`;
  } else {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    return `${d}-${m}-${y}`;
  }
};

function ItemController(props) {
  const { item, idx, handleChangeCurrentNote } = props;
  return (
    <div className={cx('item')} key={idx}>
      <div className={cx('item-left')}>
        <NotePopupButton permalink={item.permalink} />
      </div>
      <div
        className={cx('item-right')}
        onClick={() => handleChangeCurrentNote(idx)}
      >
        <div className={cx('item-header')}>
          <span className={cx('item-text')}>{item.username}</span>
          <span className={cx('item-text')}>
            {reFormatTime(item.created_at)}
          </span>
        </div>
        <div className={cx('item-body')}>
          <span className={cx('item-title')}>{item.title}</span>
          <span className={cx('item-tags')}>{item.tags}</span>
        </div>
      </div>
    </div>
  );
}

export default ItemController;
