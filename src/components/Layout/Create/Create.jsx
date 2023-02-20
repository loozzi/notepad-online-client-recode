import classNames from 'classnames/bind';
import styles from './Create.module.scss';
import NoteView from '../../Widget/NoteView';
import { useAppSelector } from '../../../app/hook';
import { selectCurrentUser } from '../Login/authSlice';

const cx = classNames.bind(styles);

function Create(props) {
  const currentUser = useAppSelector(selectCurrentUser);
  document.title = 'Create your note';
  return (
    <div className={cx('create')}>
      <NoteView
        onlyView={false}
        data={{
          username: !!currentUser ? currentUser.username : '',
          title: '',
          body: '',
          permalink: '',
          tags: '',
          created_at: Date.now(),
          view: 0,
        }}
        isCreatePage={true}
      />
    </div>
  );
}

export default Create;
