import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { homeActions, selectLoading, selectNotes } from './HomeSlice';
import { useEffect } from 'react';
import Panel from '../../Widget/Panel/Panel';

const cx = classNames.bind(styles);

function Home(props) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoading);
  const notes = useAppSelector(selectNotes);

  useEffect(() => {
    document.title = 'Home - Welcome to notepad online';
    dispatch(homeActions.fetchData());
  }, [dispatch]);

  return (
    <div className={cx('home')}>
      {isLoading ? 'Loading...' : <Panel data={notes} />}
    </div>
  );
}

export default Home;
