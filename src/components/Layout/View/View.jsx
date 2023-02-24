import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Header from '../../Widget/Header/Header';
import NoteView from '../../Widget/NoteView';
import styles from './View.module.scss';
import Input from '../../Widget/Input';
import Button from '../../Widget/Button';
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

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnSubmitPassword = () => {
    fetch();
  };

  const fetch = async () => {
    const data = await noteApi.get({
      permalink: permalink,
      password: password,
    });
    document.title = data.elements.note.title || "Can't load note";
    if (data.code === 200) {
      setCurrentNote(data.elements.note);
    } else if (data.code === 401) {
      setCurrentNote({
        username: data.elements.note.username,
        title: data.elements.note.title,
        body: 'Content is locked',
        permalink: currentNote,
        tags: 'Category is locked',
        created_at: data.elements.note.created_at,
        view: data.elements.note.view,
        isProtected: true,
      });
      document.title = data.elements.note.title;
      toast.warning(data.message);
    } else {
      setCurrentNote({
        username: '',
        title: '',
        body: '',
        permalink: currentNote,
        tags: '',
        created_at: Date.now(),
        view: 0,
        isProtected: true,
      });
      toast.error(data.message);
      history.push(`/${routes.HOME}`);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <Header />
      <div className={cx('view')}>
        {!!currentNote.isProtected && (
          <div className={cx('view-controller')}>
            <Input
              type="password"
              placeholder="Enter password note..."
              value={password}
              onChange={handleOnChangePassword}
            />
            <Button primary label="Submit" onClick={handleOnSubmitPassword} />
          </div>
        )}
        <NoteView data={currentNote} onlyView />
      </div>
    </>
  );
}

export default View;
