import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import sidebarMenu from '../../../utils/sidebarMenu';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../../app/hook';
import { selectTotalNotes } from '../../Layout/Home/HomeSlice';
import routes from '../../../utils/routes';

const cx = classNames.bind(styles);

function Sidebar(props) {
  const totalNotes = useAppSelector(selectTotalNotes);

  return (
    <div className={cx('sidebar')}>
      {sidebarMenu.map((item) => (
        <NavLink
          key={item.label}
          to={`/${item.to}`}
          className={cx('sidebar-item')}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className={cx('sidebar-item--icon')}
          />
          <span className={cx('sidebar-item--label')}>
            {item.label} &nbsp;{item.to === routes.ALL ? `(${totalNotes})` : ''}
          </span>
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
