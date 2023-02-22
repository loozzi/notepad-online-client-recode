import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import noteApi from '../../../api/noteApi';
import { useAppSelector } from '../../../app/hook';
import { selectCurrentUser } from '../../Layout/Login/authSlice';
import NoteView from '../NoteView/NoteView';
import ItemController from './ItemController';
import styles from './Panel.module.scss';

const cx = classNames.bind(styles);

function Panel(props) {
  const { data } = props;
  const [currentNote, setCurrentNote] = useState('');
  const [currentNoteData, setCurrentNoteData] = useState({});
  const currentUser = useAppSelector(selectCurrentUser);

  const handleChangeCurrentNote = (idx) => {
    setCurrentNote(data[idx].permalink);
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await noteApi.get({ permalink: currentNote, password: '' });
      if (data.code === 200) {
        setCurrentNoteData(data.elements.note);
        toast.success('Successfully');
      } else if (data.code === 401) {
        setCurrentNoteData({
          username: currentUser.username,
          title: data.elements.note.title,
          body: 'Content is locked',
          permalink: currentNote,
          tags: 'Category is locked',
          created_at: data.elements.note.created_at,
          view: data.elements.note.view,
        });
        toast.warning('Note is protected');
      } else {
        setCurrentNoteData({
          username: '',
          title: '',
          body: '',
          permalink: currentNote,
          tags: '',
          created_at: Date.now(),
          view: 0,
        });
        toast.error(data.message);
      }
    };
    if (!!currentUser && currentNote !== '') fetch();
  }, [currentNote]);

  useEffect(() => {
    if (data.length > 0) setCurrentNote(data[0].permalink);
  }, [data]);

  return (
    <div className={cx('panel')}>
      <div className={cx('panel-controller')}>
        <span className={cx('panel-controller-title')}>Latest</span>
        {data.map((item, idx) => (
          <ItemController
            handleChangeCurrentNote={handleChangeCurrentNote}
            item={item}
            idx={idx}
            key={idx}
          />
        ))}
      </div>
      <div className={cx('panel-content')}>
        <NoteView data={currentNoteData} onlyView={true} />
      </div>
    </div>
  );
}

export default Panel;
