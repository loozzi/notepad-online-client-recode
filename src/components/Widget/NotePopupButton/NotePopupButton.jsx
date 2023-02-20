import {
  faEllipsis,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './NotePopupButton.module.scss';
import { history } from '../../../utils/history';
import noteApi from '../../../api/noteApi';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function NotePopupButton(props) {
  const { permalink } = props;

  const handleEditClick = () => {
    history.push(`/edit/${permalink}`);
  };

  const handleDeleteClick = () => {
    const password = prompt('Note password?');

    const fetchDelete = async () => {
      const resData = await noteApi.delete({
        permalink: permalink,
        password: password.trim(),
      });

      if (resData.code === 200) {
        toast.success(resData.message);
      } else {
        toast.error(resData.message);
      }
    };

    fetchDelete();
  };

  return (
    <div className={cx('popup')}>
      <FontAwesomeIcon icon={faEllipsis} className={cx('popup-icon')} />
      <div className={cx('popup-menu')}>
        <button className={cx('popup-btn')} onClick={handleEditClick}>
          <FontAwesomeIcon icon={faPenToSquare} className={cx('popup-icon')} />
          Edit
        </button>
        <button className={cx('popup-btn')} onClick={handleDeleteClick}>
          <FontAwesomeIcon icon={faTrash} className={cx('popup-icon')} />
          Delete
        </button>
      </div>
    </div>
  );
}

export default NotePopupButton;
