import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Header from '../../Widget/Header/Header';
import NoteView from '../../Widget/NoteView';
import styles from './View.module.scss';

import { useState } from 'react';
import { toast } from 'react-toastify';
import noteApi from '../../../api/noteApi';
import { useAppSelector } from '../../../app/hook';
import { history } from '../../../utils/history';
import routes from '../../../utils/routes';
import { selectCurrentUser } from '../Login/authSlice';

const cx = classNames.bind(styles);

function View(props) {
  const params = useParams();
  const permalink = params.permalink;
  const [currentNote, setCurrentNote] = useState({});
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState(false);

  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const fetch = async () => {
      const data = await noteApi.get({
        permalink: permalink,
        password: password,
      });
      if (data.code === 200) {
        setPasswordConfirm(true);
        setCurrentNote(data.elements.note);
        toast.success(data.message);
      } else if (data.code === 401) {
        setCurrentNote({
          username: data.elements.note.username,
          title: data.elements.note.title,
          body: 'Content is locked',
          permalink: currentNote,
          tags: 'Category is locked',
          created_at: data.elements.note.created_at,
          view: data.elements.note.view,
        });
        toast.warning(data.message);
        setPasswordConfirm(false);
        const pwd = prompt('Enter your note password');
        setPassword(pwd);
      } else {
        setCurrentNote({
          username: '',
          title: '',
          body: '',
          permalink: currentNote,
          tags: '',
          created_at: Date.now(),
          view: 0,
        });
        history.push(`/${routes.HOME}`);
        toast.error(data.message);
      }
    };
    fetch();
  }, [password]);
  return (
    <>
      <Header />
      <div className={cx('view')}>
        <NoteView data={currentNote} />
      </div>
    </>
  );
}

export default View;
