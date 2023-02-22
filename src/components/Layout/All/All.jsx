import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './All.module.scss';
import noteApi from '../../../api/noteApi';
import NotePreview from '../../Widget/NotePreview/NotePreview';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../app/hook';
import { homeActions } from '../../Layout/Home/HomeSlice';

const cx = classNames.bind(styles);

function All(props) {
  const [data, setData] = useState([]);
  const [totalNotes, setTotalNotes] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();

  document.title = 'See all notes';

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const fetch = async () => {
    const idToast = toast.loading('Please wait...');
    const resData = await noteApi.getAll({
      page: 1,
      limit: 10 * currentPage,
    });
    if (resData.code === 200) {
      toast.update(idToast, {
        type: 'success',
        render: 'Success',
        isLoading: false,
        closeButton: true,
        closeOnClick: true,
        autoClose: 3000,
      });
      setData(resData.elements.notes);
      setTotalNotes(resData.elements.totalNotes);
    } else {
      toast.update(idToast, {
        type: 'error',
        render: 'Failed to fetch notes',
        isLoading: false,
        closeButton: true,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetch();
    dispatch(homeActions.setTotalNotes(totalNotes));
  }, [currentPage]);

  if (!!data) {
    return (
      <div className={cx('all')}>
        {data.map((item, idx) => (
          <NotePreview data={item} key={idx} />
        ))}
        {!(data.length === totalNotes) && (
          <button onClick={handleLoadMore}>
            <span>Load More</span>
          </button>
        )}
      </div>
    );
  } else {
    return <div className={cx('all')}>Loading...</div>;
  }
}

export default All;
